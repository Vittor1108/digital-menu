import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7f96a3b66cd754',
    pass: '6bc16618e6ffb5',
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.html',
      partialsDir: resolve('./src/resources/mail/'),
      defaultLayout: false,
    },
    viewPath: resolve('./src/resources/mail/'),
    extName: '.html',
  }),
);

export { transport };
