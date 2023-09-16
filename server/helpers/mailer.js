
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: { 
    user: "haroldrodriguez176@gmail.com",  
    pass: "phueohcqjterekul",
  },
});

transporter.verify().then( () => {
  console.log('ready for send email ')
})