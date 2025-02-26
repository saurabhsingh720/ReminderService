const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');

// const cron = require('node-cron');

const jobs = require('./utils/job');

const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');
const {subscribeMessage, createChannel} = require("./utils/messageQueue");
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');


const setupAndStartServer = async() => {
     const app = express();
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));

     // const channel = await createChannel();

     app.post('/api/v1/tickets', TicketController.create);

     const channel = await createChannel();
     subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

     app.listen(PORT, () => {
          console.log(`Server started at port ${PORT}`);
          
          // sendBasicEmail(
          //      'support@admin.com',
          //      'a@gmail.com',
          //      'This is a testing email',
          //      'ME ME ME'
          // )

          // cron.schedule('*/1 * * * *', () => {
          //      console.log('running a task every one minutes');
          // });

          // jobs();
     });

}
setupAndStartServer();
