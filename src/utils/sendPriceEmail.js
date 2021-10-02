require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API);

exports.sendPriceIncreaseEmail = (name, pastPrice, currentPrice) => {
  sendPriceEmail({
    subject: "Doc Marten Price Increase :(",
    html: `<p>The price for <strong>${name}</strong> have gone up!<br/><br/>The last known price: $${pastPrice}<br/>Current Price: $${currentPrice} </p>`,
  });
};

exports.sendPriceDecreaseEmail = (name, pastPrice, currentPrice) => {
  sendPriceEmail({
    subject: "Doc Marten Price Drop!",
    html: `<p>The price for <strong>${name}</strong> have gone down!<br/><br/>The last known price: $${pastPrice}<br/>Current Price: $${currentPrice} </p>`,
  });
};

const sendPriceEmail = ({ subject, html }) => {
  const msg = {
    to: "mcastaneda82@toromail.csudh.edu", // Change to your recipient
    from: "casta.ma502@gmail.com", // Change to your verified sender
    subject,
    html,
  };

  sgMail
    .send(msg)
    .then(() => console.log("Email Sent."))
    .catch((err) => console.log(err));
};
