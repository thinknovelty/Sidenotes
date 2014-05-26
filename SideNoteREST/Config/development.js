//module is native node
module.exports = {
    enableServer: true,
    serverRoot: null,
    restPort: 80,
    host: '127.0.0.1',
    email: {
        from: 'no-reply@example.com',
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'SideNotesApp@gmail.com',
            pass: 'netpass1'
        }
    }
};
