//Function that shuts down bot on kill command by specific user!
const cron = require('cron');

function cronjobs(client)
{
  //Sends a professor quote in General at 9 AM
    var date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    
      let cronjob = new cron.CronJob('00 00 1 * * *', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 4 or 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        client.channels.cache.get(`946151295830614076`).send(`<@&930947146834935938> What have you as an individual accomplished today for the current Sprint?`); 
      });

    cronjob.start()
}

//The off switch for this entire ensemble
async function kill(message) 
{
    if (message.author.id !== `706998163936116839`) return;
    message.channel.send('Emergency bot force stop command recieved!').then(() => 
    {
        process.exit(1);
    })
}

module.exports = { kill, cronjobs };