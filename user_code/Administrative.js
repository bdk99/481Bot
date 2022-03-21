//Administrative.js
//Code for wiping a specified number of messages from a channel (MOD ONLY)
async function clean(message, num, client)
{
  if(message.member.roles.cache.find(r => r.name === `930947146834935938`)) 
  { 
    if(num>10 || num<2)
    {
      message.channel.send("Unable to delete!  Args must be between 2 and 100!");
      return;
    }
    message.channel.bulkDelete(`${num}`).then(() => {
      message.channel.send(`MASS DELETED ${num} MESSAGES!`).then(msg => {
        msg.delete({timeout: 3000});
      })
    });

    let server = message.guild.id;
    if(server === `707293853958275125`) 
    {   //CompSci Server ID
      client.channels.cache.get("784093143389700137").send(`${message.author.username} deleted ${num} messages in ${message.channel}`);
    }
    else if(server === `731575925262778450`) 
    {   //EMU Hangout Server ID
      client.channels.cache.get("769636044064030741").send(`${message.author.username} deleted ${num} messages in ${message.channel}`);
    }
  }
  else 
  {
    message.channel.send(`Access Denied!`).then(msg => {
      msg.delete({timeout: 3000});
    });
    message.delete({ timeout: 2000 });
    return;
  }
}

module.exports = { clean }