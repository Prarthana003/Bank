const express = require("express");
const cors = require("cors");
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const newOtp = require('./checkotp.js');

const dcOtpRouter = express.Router();
var tomail = ''

dcOtpRouter.use(express.json());
dcOtpRouter.use(cors());

const emailConfig = {
  service: 'gmail', // Use 'gmail' for Gmail service
  auth: {
    user: '', // Replace with your Gmail email address
    pass: '', // Replace with your application-specific password
  },
};

dcOtpRouter.post('/send-otp', async (req, res) => {
  const to = req.body.mailid;
  tomail = to;
  const amount = req.body.amount;

  // Generate a secret for the user
  const secret = speakeasy.generateSecret({ length: 20 });

  // Generate a time-based OTP
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  const transporter = nodemailer.createTransport(emailConfig);

  // Send the OTP via email using Nodemailer
  const mailOptions = {
    from: '', // Replace with your Gmail email address
    to:tomail,
    subject: 'OTP for Payment',
    text: `Your OTP for the payment of ${amount} is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending OTP via email:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    } else {
      // For demonstration purposes, log the secret and OTP (do not do this in a production environment)
      console.log('Generated Secret:', secret.base32);
      console.log('Generated OTP:', otp);
      newOtp.set(otp)
      console.log('otp',newOtp);
      console.log("done")
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    }
  });
});

module.exports = dcOtpRouter;
