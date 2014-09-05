//module is native node
module.exports = {
    enableServer: true,
    serverRoot: null,
    restPort: 1000,
    host: '10.0.3.149',
    email: {
        from: 'no-reply@example.com',
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'gmail.user@gmail.com',
            pass: 'userpass'
        }
    }
};
