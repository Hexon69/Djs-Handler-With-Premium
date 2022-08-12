const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
    name: "addpremium",
    aliases: ["premium+"],
    description: "Add premium.",
    category: "Informations",
    example: ["ping"],
    

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix, color) => {
      let arr = [];
  const embed = new MessageEmbed()
  .setColor("#2F3136")
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send("Invalid Id");
  }
  if(args[1])
  {
    time = Date.now() + 86400000 * args[1];
  }
  else if(!args[1])
  {
    time = Date.now() + 86400000 * 1;
  }
  if(args[2]){
    count = args[2];
  }
  if(!args[2]){
    count = 0;
  }
  client.db.set(`uprem_${args[0]}`, `true`)
  client.db.set(`upremend_${args[0]}`, time)
  client.db.set(`upremcount_${args[0]}`, count)
  client.db.set(`upremserver_${args[0]}`, arr)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Added As A Premium User\nPremium Count: \`${count}\`    Premium Expiring - <t:${Math.round(time / 1000)}>`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]})
    }
}