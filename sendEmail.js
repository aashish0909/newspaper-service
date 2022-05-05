var SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SMTP_API_KEY;

function sendEmail(title, content, users) {
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | The transactional email to send.

  sendSmtpEmail = {
    subject: `${title}`,
    sender: { email: "anytimenews101@gmail.com", name: "AnyTime News" },
    replyTo: { email: "anytimenews101@gmail.com", name: "AnyTime News" },
    to: users,
    htmlContent: `<html><body><h1>${title}</h1><p>${content}</p></body></html>`,
    params: { bodyMessage: "Made just for you!" },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
}

module.exports = sendEmail;
