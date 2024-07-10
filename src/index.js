const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');

// const cron = require('node-cron');

const jobs = require('./utils/job');

const TicketController = require('./controllers/ticket-controller');

const {createChannel} = require("./utils/messageQueue");

const setupAndStartServer = async() => {
     const app = express();
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));

     // const channel = await createChannel();

     app.post('/api/v1/tickets', TicketController.create);


     app.listen(PORT, () => {
          console.log(`Server started at port ${PORT}`);
          
          // sendBasicEmail(
          //      'support@admin.com',
          //      'sumanchaudhary720december@gmail.com',
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