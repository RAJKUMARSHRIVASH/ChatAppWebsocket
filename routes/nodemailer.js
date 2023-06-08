const nodemailer = require("nodemailer");

let testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'caden22@ethereal.email',
        pass: 'X9XDveVcRmHkfW6mvK'
    }
});

function sendMail(email, verificationToken) {
    const mailOpsn = {
        from: "caden22@ethereal.email",
        to: email,
        subject: "Email verification",
        text: `please click on the following link to verify your email: https://chatapp-websocket.onrender.com/api/user/verify/${verificationToken}`,
        html:`<a>https://chatapp-websocket.onrender.com/api/user/verify/${verificationToken}</a>`
    };
    transporter.sendMail(mailOpsn, (err, info) => {
        if (err) {
            console.log("something went wrong while sending mail " + err)
            return ("something went wrong while sending mail " + err);
        }
        else {
            console.log("Sent mail successfully", info.response)
            return ("Sent mail successfully", info.response);
        }
    })
}

module.exports = sendMail;