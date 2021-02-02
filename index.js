const cors = require('cors');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 5000;
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

let transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.post('/sendPost', async (req, res) => {

    let {email, name, message} = req.body
    console.log(name)
    console.log(email)
    console.log(message)

    let mailOptions = {
        from: smtp_login,
        to: 'sergei.kuharyonok@yandex.by',
        subject: 'HR Message from portfolio',
        html: `<div>
                  <div>email:${email}</div>
                  <div>name: ${name}</div>
                  <div>message: ${message}</div>
             </div>`,
    }

    let info = await transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs', err)
        } else {
            console.log('Email sent!!!')
        }
    });

    res.send(req.body)
})
    .get('/', (req, res) => res.send(
        `<div>hello</div>`
    ))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));