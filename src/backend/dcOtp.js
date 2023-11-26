const express = require("express");
const cors = require("cors");
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const newOtp = require('./checkotp.js');

const dcOtpRouter = express.Router();

dcOtpRouter.use(express.json());
dcOtpRouter.use(cors());

const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'pes1202100596@pesu.pes.edu', // Replace with your Gmail email address
    pass: 'jjdr ufvc szko wtsq', // Replace with your application-specific password
  },
};

dcOtpRouter.post('/send-otp', async (req, res) => {
  const tomail = req.body.mailid;
console.log(tomail)
  // Validate the recipient email address
  if (!tomail || typeof tomail !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid recipient email address' });
  }

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
    from: 'pes1202100596@pesu.pes.edu',
    to: tomail,
    subject: 'OTP for Payment',
    text: `Your OTP for the payment is ${otp}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    // For demonstration purposes, log the secret and OTP
    console.log('Generated Secret:', secret.base32);
    console.log('Generated OTP:', otp);
    newOtp.set(otp);
    console.log('otp', newOtp);
    console.log('done');
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

module.exports = dcOtpRouter;
