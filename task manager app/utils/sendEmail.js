import nodemailer from "nodemailer";

const sendEmail = ({
    to : '',
    subject : 'no-replay',
    message : '<h1>no-message</h1>'
})
const transporter = nodemailer.createTransport({
  host: 'localhost',
  service:'gmail',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'hassanebrahem20041@gmail.com',
    pass: 'itwcgicnezxmonbg'
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '" Foo Koch 👻" <hassanebrahem2004@gmail.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

export default sendEmail;