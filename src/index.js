const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');

const cron = require('node-cron');

const setupAndStartServer = () => {
     const app = express();
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));

     app.listen(PORT, () => {
          console.log(`Server started at port ${PORT}`);
          
          // sendBasicEmail(
          //      'support@admin.com',
          //      'a@gmail.com',
          //      'This is a testing email',
          //      'ME ME ME'
          // )

          cron.schedule('*/1 * * * *', () => {
               console.log('running a task every one minutes');
          });
     });

}
setupAndStartServer();
