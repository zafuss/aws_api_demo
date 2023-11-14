const customer = require("../models/Customer");
const bcrypt = require("bcrypt");
var config = require('../dbconfig');
const jwt = require("jsonwebtoken");
const sql = require('mssql');
const dotenv = require("dotenv");
dotenv.config();
const customerController = require("../controllers/customerController")
let refreshTokens = [];

async function addCustomer(user) {
  try {
      console.log(user.PhoneNumber);
      let pool = await sql.connect(config);
      let customer = await pool.request()
          .input('PhoneNumber',sql.VarChar, user.PhoneNumber)
          .input('FullName', sql.NVarChar, user.FullName)
          .input('_Password', sql.VarChar, user._Password)
          .input('Username', sql.VarChar, user.Username)
          .input('Email', sql.NVarChar, user.Email)
          .input('_Status', sql.NVarChar, user._Status)
          .query('INSERT INTO CUSTOMER VALUES (@PhoneNumber, @FullName, @Email, @_Password, @Username, @_Status)');
      return customer.recordsets;

  } catch (error) {
      console.log(error);
  }
}

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body._Password, salt);

      //Create new user
      const newUser =  {
        PhoneNumber: req.body.PhoneNumber,
        FullName: req.body.FullName,
        Email: req.body.Email,
        _Password : hashed,
        Username : req.body.Username,
        _Status : req.body._Status
      };

      //Save user to DB
      const user =  addCustomer(newUser)
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.PhoneNumber,
      },
      process.env.JWT_ACCESS_KEY,
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.PhoneNumber,
      },
      "bbb",
      { expiresIn: "365d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await customerController.getCustomer(req.body.PhoneNumber)
      if (!user) {
        res.status(404).json("Incorrect PhoneNumber");
      }
      const convertedUser = user[0][0];
      console.log(convertedUser._Password);
      
      const validPassword = await bcrypt.compare(
        req.body._Password,
        convertedUser._Password
      );
      
      if (!validPassword) {
        res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        
        
        //Generate access token
        const accessToken = authController.generateAccessToken(convertedUser);
        //Generate refresh token
        const refreshToken = authController.generateRefreshToken(convertedUser);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        
        const { _Password, ...others } = convertedUser;
        console.log(accessToken);
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
