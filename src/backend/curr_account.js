const express = require("express")

var curr_account = {
  value: 0,
  set(value) {
    curr_account.value = value;
  }
};

module.exports = curr_account;
