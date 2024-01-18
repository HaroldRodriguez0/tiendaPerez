
import nodemailer from 'nodemailer';
// REVISAR
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: { 
    user: 'tiendadenisperez@gmail.com'/*process.env.USER_MAILER  */,  
    pass: 'wmmvpnfbqskwoaqe'/*process.env.PASS_MAILER  */,
  },
}); 


transporter.verify()
.then( () => {
  console.log('ready for send email ')
})
.catch( (error) => {
  console.log(error);
}) 