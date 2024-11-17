const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Настройки подключения к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Замените на своего пользователя
    password: '', // Замените на свой пароль
    database: 'audit', // Замените на название вашей базы данных
});

// Маршрут для получения отзывов
router.get('/', (req, res) => {
    const sql = 'SELECT username, rating, comment FROM reviews WHERE comment NOT LIKE "" ORDER BY created_at DESC';
    db.connect((err) => {
        if (err) {
            console.error('Ошибка подключения к базе данных:', err);
        } else {
            db.query(sql, (error, results) => {
                if (error) {
                    console.error('Ошибка выполнения запроса:', err);
                    res.status(500).json({ error: 'Ошибка сервера' });
                } else {
                    res.json(results);
                }
            });
        }
    });
});

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 587,
    secure: false,
    auth: {
        user: "discursiveee@mail.ru" ,
        pass: "UsUhK7VygPsfWYxe5Ny9",
    },
});

const sendMail = (username, email) => {
    const mailOptions = {
        from: 'discursiveee@mail.ru',
        to: email, // Recipient's email
        subject: 'Спасибо за ваш отзыв!',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding-bottom: 20px;
                        }
                        .header h1 {
                            color: #4CAF50;
                            font-size: 24px;
                        }
                        .content {
                            font-size: 16px;
                            line-height: 1.6;
                            color: #333333;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 14px;
                            color: #777777;
                        }
                        .footer a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Спасибо за ваш отзыв, ${username || 'Уважаемый клиент'}!</h1>
                        </div>
                        <div class="content">
                            <p>Мы очень ценим ваш вклад в развитие нашего сервиса. Ваш отзыв помогает нам становиться лучше!</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
            console.error('Ошибка при отправке письма:', mailErr);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/', bodyParser.json(), (req, res) => {
    const { username = null, email = null, rating, comment = null } = req.body;

    const sql = 'INSERT INTO reviews (username, email, rating, comment) VALUES (?, ?, ?, ?)';
    const values = [username.length > 0 ? (username) : "Anonymus", email, rating, comment];

    db.connect((error) => {
        if (error) {
            console.error('Ошибка подключения к базе данных:', err);
            return res.status(500).json({ error: 'Ошибка подключения к базе данных' });
        } else {
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Ошибка выполнения запроса:', err);
                    return res.status(500).json({ error: 'Ошибка сервера' });
                } else {
                    sendMail(username, email);
                    res.status(201).json({ message: 'Отзыв успешно добавлен!', reviewId: result.insertId });
                }
            });
        }
    });
});

module.exports = router;