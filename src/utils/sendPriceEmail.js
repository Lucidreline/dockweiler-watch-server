require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API);

exports.sendPriceIncreaseEmail = (name, pastPrice, currentPrice) => {
  sendPriceEmail({
    subject: "Doc Marten Price Increase :(",
    html: `<p>Hi ${process.env.SEND_GRID_RECIPIENT_NAME},The price for <strong>${name}</strong> have gone up!<br/><br/>The last known price: $${pastPrice}<br/>Current Price: $${currentPrice} </p>`,
  });
};

exports.sendPriceDecreaseEmail = (name, pastPrice, currentPrice) => {
  sendPriceEmail({
    subject: "Doc Marten Price Drop!",
    html: `<p>Hi ${process.env.SEND_GRID_RECIPIENT_NAME},<br/>The price for <strong>${name}</strong> have gone down!<br/><br/>The last known price: $${pastPrice}<br/>Current Price: $${currentPrice} </p>`,
  });
};

const sendPriceEmail = ({ subject, html }) => {
  const msg = {
    to: process.env.SEND_GRID_RECIPIENT,
    from: process.env.SEND_GRID_SENDER,
    subject,
    html,
  };

  sgMail
    .send(msg)
    .catch((err) => console.log(err));
};
