require("dotenv").config();

const devLog = (string) => {
  if (process.env.NODE_ENV = 'development') console.log('📋 DEV LOG: ' + string)
}

module.exports = devLog