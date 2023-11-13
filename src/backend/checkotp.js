const express = require("express")

var otp = {
  value: '',
  set(value) {
    otp.value = value;
  }
};

module.exports = otp;
