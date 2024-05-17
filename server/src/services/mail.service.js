const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
  transport;
  constructor() {
    try {
      this.transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (except) {
      console.log("Mail Service connection: ", except);
      next(except);
    }
  }

  emailSend = async (
    to,
    subject,
    msg,
    attachments = { filename: null, path: null, cid: null }
  ) => {
    try {
      this.transport.sendMail({
        to: to,
        from: process.env.SMTP_FROM,
        subject: subject,
        html: msg,
        attachments: [
          {
            filename: attachments.filename,
            path: attachments.path,
            cid: attachments.cid,
          },
        ],
      });
    } catch (except) {
      console.log("emailSend: ", except);
      next(except);
    }
  };
}

const mailSvc = new MailService();

module.exports = mailSvc;
