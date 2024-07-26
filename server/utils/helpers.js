const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("config");

//set up OAUTH 2.0 Client
const oAuth2Client = new google.auth.OAuth2(
  config.get("CLIENT_ID"),
  config.get("CLIENT_SECRET"),
  config.get("REDIRECT_URI")
);

//set credentials for client
oAuth2Client.setCredentials({ refresh_token: config.get("REFRESH_TOKEN") });

module.exports = {
  sendConfirmation: async (info) => {
    try {
      console.log("INFO", info);
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "support@mykindofclean.net",
          clientId: config.get("CLIENT_ID"),
          clientSecret: config.get("CLIENT_SECRET"),
          refreshToken: config.get("REFRESH_TOKEN"),
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "My Kind of Clean <support@mykindofclean.net>",
        to: info.email,
        subject: "Inquiry Confirmation",
        text: `Hello ${info.name},
        Thank you for inquiring about our cleaning services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at (720)-846-3205.  We look forward to working with you.  Have a magical day!        
        Best wishes,
        My Kind of Clean`,
        html: `<p>Hello <b>${info.name}</b>,</br>
        <p>Thank you for inquiring about our cleaning services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at <a type="tel" href="7208463205">(720)-846-3205</a>.  We look forward to working with you.  Have a magical day!</p>
        </br></br>
        <p>Best wishes,</p></br>
        <p>My Kind of Clean</p>`,
      };
      const result = await transporter.sendMail(mailOptions);
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
          user: "support@mykindofclean.net",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "My Kind of Clean Support <support@mykindofclean.net>",
        to: "angelica@mykindofclean.net",
        subject: "New Cleaning Inquiry",
        text: `Name: ${info.name}
        Email: ${info.email}
        Phone: ${info.phone}
        Comm: ${info.commMethod}
        Zip: ${info.location}
        Message: ${info.message}
        `,
        html: `<h2>New Inquiry Info: </h2>
        <p>Name: ${info.name}</p>
        <p>Email: ${info.email}</p>
        <p>Phone: ${info.phone}</p>
        <p>Comm: ${info.commMethod}</p>
        <p>Zip: ${info.location}</p>
        <p>Message: ${info.message}</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
  verifyEmail: async (info, emailToken) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "support@mykindofclean.net",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "My Kind of Clean<support@mykindofclean.net>",
        to: info.email,
        subject: "Verify Your Email",
        text: `Hello ${info.firstName},
        Please verify your email by clicking the link below.
        http://localhost:3000/verifyEmail/${info._id}/${emailToken}
        This link will expire in 24 hours.
       Best wishes,
        My Kind of Clean`,
        html: `<p>Hello ${info.firstName},</p>
        <p>Please verify your email by clicking the link below. </p> 
        <a href="http://localhost:3000/verifyEmail/${info._id}/${emailToken}">VERIFY MY EMAIL ADDRESS</a>
        <p>This link will expire in 24 hours.</p>
        <p>Best wishes,</p></br>
        <p>My Kind of Clean</p>`,
      };
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
  sendDeleteConfirmation: async (info) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "support@mykindofclean.net",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "My Kind of Clean<support@mykindofclean.net>",
        to: info.email,
        subject: "Your Account Has Been Deleted",
        text: `Hello ${info.firstName},
        Your account has been successfully deleted. You will no longer be able to access the client portal unless you create a new account.
       Best wishes,
        My Kind of Clean`,
        html: `<p>Hello ${info.firstName},</p>
        <p>Your account has been successfully deleted. You will no longer be able to access the client portal unless you create a new account. </p> 
        <p>Best wishes,</p></br>
        <p>My Kind of Clean</p>`,
      };
      const result = await transporter.sendMail(mailOptions);
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
          user: "support@mykindofclean.net",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "My Kind of Clean <support@mykindofclean.net>",
        to: info.email,
        subject: "Reset Your Password",
        text: `Hello ${info.firstName},
        Your temporary password is '${tempPW}'.  You may change your password in your account settings once logged in. Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day! Best wishes, My Kind of Clean`,
        html: `<p>Hello ${info.firstName},</p>
        <p>Your temporary password is '<b>${tempPW}</b>'. 
        You may change your password in your account settings once logged in. Please feel free to reach out by phone or email if you have any issues accessing your account.  Thanks, and have a magical day!</p>
        <p>Best wishes,</p></br>
        <p>My Kind of Clean</p>
        <p>(720) 846-3205</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  },
};
