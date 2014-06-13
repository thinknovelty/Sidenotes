//module is native node
module.exports = {
    enableServer: true,
    serverRoot: null,
    restPort: 80,
    host: '127.0.0.1',
    side_notes: {
        email: {
            from: 'no-reply@gmail.com',
            host: 'smtp.gmail.com', // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
            auth: {
                user: 'SideNotesApp@gmail.com',
                pass: 'netpass1'
            }
        },
        datebase: {
            host: '127.0.0.1',
            user: 'root',
            password: 'admin',
            database: 'sidenotedb_01'
        }

    },
    picr: {
        email: {
            from: 'no-reply@gmail.com',
            host: 'smtp.gmail.com', // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
            auth: {
                user: 'SideNotesApp@gmail.com',
                pass: 'netpass1'
            }
        },
        datebase: {
            host: '127.0.0.1',
            user: 'root',
            password: 'admin',
            database: 'sidenotedb_01'
        }

    }
};
