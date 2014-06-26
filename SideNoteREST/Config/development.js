//module is native node
module.exports = {
    enableServer: true,
    serverRoot: null,
    restPort: 80,
    host: '127.0.0.1',
    image_directory: '\\Pictures\\original',
    image_format: 'jpg',
    side_notes: {
        email: {
            service: "Gmail",
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
        database: {
            host: 'localhost:3306',
            user: 'hubbertj',
            password: 'admin',
            database: 'sidenotedb_01'
        }

    },
    picr: {
        email: {
            service: "Gmail",
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
            auth: {
                user: 'SideNotesApp@gmail.com',
                pass: 'netpass1'
            }
        },
        database: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'admin',
            database: 'picr_01'
        }
    }
};
