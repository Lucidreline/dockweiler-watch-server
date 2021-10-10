require("dotenv").config();

const devLog = (string) => {
  if (process.env.NODE_ENV = 'development') {
    let currentTime = Date.now()
    currentTime -= 60000 * 60 * 7
    const formattedTime = new Date(currentTime).toLocaleString('en-US', { timezone: 'UTC' })
    console.log(`📋 ${formattedTime} DEV LOG: ${string}`)
  }
}

module.exports = devLog