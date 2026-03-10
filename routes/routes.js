import express from "express";
import nodemailer from "nodemailer";
import Email from '../models/Email.js'

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/contact", async (req, res) => {
  
  try{
  const { name, email, message } = req.body;

  //LIVE TRANSPORTER
  //  const transporter = nodemailer.createTransport({
  //    service: "gmail",
  //    auth: {
  //      user: process.env.EMAIL_USER,
  //      pass: process.env.EMAIL_PASS
  //    }
  //  });

  //TEST TRANSPORTER
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
   }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      `,
    html:`
    <p>This is a message from ${name} at ${email} saying ${message}</p>
    `
  });

  const newMessage = new Email({
    name,
    email,
    message
  });
  await newMessage.save()

  console.log(nodemailer.getTestMessageUrl(info));
  res.render("success");
}

catch(err){
  res.send("Sorry, your email was not sent!"
  )
}





});