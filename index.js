//=======================================================================================================
//Imports the necessary user code files to the index in order for later use
//=======================================================================================================
const Discord = require('discord.js')// imports the discord js library
const client = new Discord.Client();
const { token } = require('./config.json');
//Put developerID in ids.json in devid when working on channelcreator to override locked commands
 
//Include Command and Server handler code
const command = require('./user_code/command')

//Include rest of exported commands
const Server = require("./user_code/Server");
const AutoCodeBlock = require("./user_code/AutoCodeBlock");

/* =======================================================================================================
The Client.once belowRuns one time when the bot first starts up... We use it to confirm that the bot 
                                     does not crash on startup.
=======================================================================================================*/
client.once('ready', () => 
{
    console.info(`Logged in as ${client.user.tag}!`);  
    console.info("Ready and stable!");   //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash
    client.user.setActivity("watching out for activity/accomplishments!"); //Sets the discord status activity of the bot to a specific string
});

/*=======================================================================================================
  The cronjob code below Completes a cronjob task at 9 AM everyday
//=======================================================================================================*/
  //Server.cronjobs(client)
  //This cronjob has been disabled as of 5.5.2022 as it is no longer needed to check up on people's daily progress for COSC 481W

/*=======================================================================================================
   The client.on section below activates when anybody on the server sends a message on any server the bot is apart of.  
//=======================================================================================================*/
client.on("message", message => 
{
  //Ignores bots from deleting their own messages
    if(message.author.bot) 
      return;

    //Code block to automatically format code blocks based on detected code-words
    AutoCodeBlock.autoCodeBlock(message);

    //Basic ping command to check the status and delay time of the bot
    command(message, /*Message going into command function */
            'ping', /*Command headed into command function */
            RETURN /*Return from command method, should NOT be used in most situations */=> {
      message.channel.send(`???? Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    })

    command(message, /*Message going into command function */
    'verify', /*Command headed into command function */
    RETURN /*Return from command method, should NOT be used in most situations */=> {
      client.channels.cache.get(`946151295830614076`).send(`<@&930947146834935938> What have you accomplished today for the current Sprint?`); 
    })

    //Halts bot with response (Activated by Brendan only!)
    command(message, 'kill', RETURN => {
      Server.kill(message);
    })

}); //End of message sent loop

//Logs the bot into the token value given on the config
client.login(token)