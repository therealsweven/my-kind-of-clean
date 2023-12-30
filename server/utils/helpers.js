const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

//set up OAUTH 2.0 Client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//set credentials for client
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = {
  sendConfirmation: async (info) => {
    try {
      console.log("INFO", info);
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "info@denverdjservices.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Denver DJ Services 🎵<info@denverdjservices.com>",
        to: info.email,
        subject: "Inquiry Confirmation",
        text: `Hello ${info.name},
        Thank you for inquiring about our DJ Services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at (303)-815-7012.  We look forward to working with you.  Have a magical day!        
        Best wishes,
        Denver DJ Services`,
        html: `<p>Hello <b>${info.name}</b>,</br>
        <p>Thank you for inquiring about our DJ Services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at <a type="tel" href="3038157012">(303)-815-7012</a>.  We look forward to working with you.  Have a magical day!</p>
        </br></br>
        <p>Best wishes,</p></br>
        <p>Denver DJ Services🎵</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
  sendInfoToMe: async (info) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "info@denverdjservices.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Denver DJ Services 🎵<info@denverdjservices.com>",
        to: "<bobby@denverdjservices.com>",
        subject: "New DJ Inquiry",
        text: `Name: ${info.name}
        Email: ${info.email}
        Phone: ${info.phone}
        Date: ${info.date}
        Comm: ${info.commMethod}
        Package: ${info.package}
        Info: ${info.message}
        `,
        html: `<h2>New Inquiry Info: </h2>
        <p>Name: ${info.name}</p>
        <p>Email: ${info.email}</p>
        <p>Phone: ${info.phone}</p>
        <p>Date: ${info.date}</p>
        <p>Comm: ${info.commMethod}</p>
        <p>Package: ${info.package}</p>
        <p>Message: ${info.message}</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
  sendClientPortalLogin: async (info) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "info@denverdjservices.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Denver DJ Services 🎵<info@denverdjservices.com>",
        to: info.email,
        subject: "Denver DJ Services Portal Access",
        text: `Hello ${info.firstName},
        You may access our online portal to make payments and update your contact information.  Please visit www.denverdjservices.com to login using the email address this message was sent to and the temporary password provided in this email.  You may change your password once you are logged in.  Your temporary password is '${info.password}'.  Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day! Best wishes, Denver DJ Services`,
        html: `<p>Hello ${info.firstName},</p>
        <p>You can access our online portal to make digital payments and update your contact information.  Please visit www.denverdjservices.com to login using the email address this message was sent to and the temporary password provided in this email.  You may change your password once you are logged in. </p> 
        <p>Your temporary password is <b>${info.password}</b>  </p>
        <p>Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day!</p>
        <p>Best wishes,</p></br>
        <p>Denver DJ Services🎵</p>
        <p>(303) 815-7012</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
  sendTempPW: async (info, tempPW) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "info@denverdjservices.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Denver DJ Services 🎵<info@denverdjservices.com>",
        to: info.email,
        subject: "Denver DJ Services - Recover Your Account",
        text: `Hello ${info.first},
        Your temporary password is '${tempPW}'.  Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day! Best wishes, Denver DJ Services`,
        html: `<p>Hello ${info.first},</p>
        <p>Your temporary password is '<b>${tempPW}</b>'. 
          Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day!</p>
        <p>Best wishes,</p></br>
        <p>Denver DJ Services🎵</p>
        <p>(303) 815-7012</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
};
