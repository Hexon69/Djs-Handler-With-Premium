/*const { MessageEmbed } = require("discord.js")
module.exports = async (client, interaction) => {
	
 let prefix = client.prefix;
 let color = client.config.Bot.Color;
     
     if(interaction.isCommand()) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        try {
            SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
}
*/


























const ms = require("ms-prettify").default;
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = async (client, interaction) => {
	const premrow = new MessageActionRow()
     .addComponents(new MessageButton()
     .setLabel("Premium")
     .setStyle("LINK")
     .setURL("https://discord.gg/zjTGfvRT8R"));

  let uprem = await client.db.get(`uprem_${interaction.user.id}`);
  
  let upremend = await client.db.get(`upremend_${interaction.user.id}`);
//user premiums scopes ^^
  
  let sprem = await client.db.get(`sprem_${interaction.guild.id}`);

  let spremend = await client.db.get(`spremend_${interaction.guild.id}`);
//server premium scopes interaction ^^

  let scot = 0;
  let slink = "https://discord.gg/zjTGfvRT8R";
//Working & Checking Below 

  if(upremend && Date.now() >= upremend) 
  {
    let upremcount = await client.db.get(`upremcount_${interaction.user.id}`) ? await client.db.get(`upremcount_${interaction.user.id}`) : 0;

  let upremserver = await client.db.get(`upremserver_${interaction.user.id}`) ? await client.db.get(`upremserver_${interaction.user.id}`) : [];

  let spremown = await client.db.get(`spremown_${interaction.guild.id}`);
    
   await client.db.delete(`upremcount_${interaction.user.id}`)
    await client.db.delete(`uprem_${interaction.user.id}`)
    await client.db.delete(`upremend_${interaction.user.id}`)
    if(upremserver.length > 0){
      for(let i = 0; i < upremserver.length; i++){
        scot += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    }
   await client.db.delete(`upremserver_${interaction.user.id}`)
    interaction.user.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scot}\`** Servers [Premium](https://discord.gg/zjTGfvRT8R) was removed.\nClick [here](https://discord.gg/zjTGfvRT8R) To Buy [Premium](https://discord.gg/zjTGfvRT8R).`)], components: [premrow]}).catch((err) => { });
  }
//User Prem Check Above ^^^

  if(spremend && Date.now() >= spremend)
  { 
    let scount = 0;
    
    let us = await client.db.get(`spremown_${interaction.guild.id}`);
    
    let upremserver = await client.db.get(`upremserver_${us}`) ? await client.db.get(`upremserver_${us}`) : [];
    
    let upremcount = await client.db.get(`upremcount_${us}`) ? await client.db.get(`upremcount_${us}`) : 0;
    
    let spremown = await client.db.get(`spremown_${interaction.guild.id}`).then(r => client.db.get(`upremend_${r}`));
    
    await client.db.delete(`sprem_${interaction.guild.id}`)
    await client.db.delete(`spremend_${interaction.guild.id}`)
    
    if(spremown && Date.now() > spremown){
      await client.db.delete(`upremcount_${us}`)
      await client.db.delete(`uprem_${us}`)
      await client.db.delete(`upremend_${us}`)
      
      for(let i = 0; i < upremserver.length; i++){
        scount += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    try{
    await client.users.cache.get(`${us}`).send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scount}\`** Servers [Premium](https://discord.gg/zjTGfvRT8R) was removed.\nClick [here](https://discord.gg/zjTGfvRT8R) To Buy [Premium](https://discord.gg/zjTGfvRT8R).`)], components: [premrow]}).catch((er) => { })
    }catch(errors) {
      
    }
    }
    await client.db.delete(`upremserver_${us}`)
    await client.db.delete(`spremown_${interaction.guild.id}`)
    interaction.channel.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`The Premium Of This Server Has Got Expired.\nClick [here](https://discord.gg/zjTGfvRT8R) To Buy [Premium](https://discord.gg/zjTGfvRT8R).`)], components: [premrow]}).catch((err) => { });
  
      }
 let prefix = client.prefix;
 let color = client.config.Bot.Color;
     
     if(interaction.isCommand()) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);
       const t = client.timeouts.get(`${interaction.user.id}_${SlashCommands.name}`) || 0;

        if (Date.now() - t < 0) return interaction.reply({ embeds: [
          new MessageEmbed()
          .setAuthor(`You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}`)
          .setColor(client.color)
        ] });

        client.timeouts.set(`${interaction.user.id}_${SlashCommands.name}`, Date.now() + (SlashCommands.timeout || 0));
        if(!SlashCommands) return;
       if (!interaction.member.permissions.has(SlashCommands.userperms || [])) {
         return interaction.reply({ embeds: [
           new MessageEmbed()
           .setAuthor(`❌ | You do not have ${SlashCommands.userperms} permission(s) to run this command.`)
           .setColor(client.color)
         ],ephemeral: true })
       }
   if (!interaction.member.permissions.has(SlashCommands.botperms || [])) {
         return interaction.reply({ embeds: [
           new MessageEmbed()
           .setAuthor(`❌ | I need ${SlashCommands.userperms} permission(s) to run this command.`)
           .setColor(client.color)
         ], ephemeral: true })
   }    
       if(SlashCommands.premium){
         if(!'ko2oieieie'.includes(interaction.user.id) && !uprem && !sprem){
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel("Premium")
    .setStyle("LINK")
    .setURL("https://discord.gg/mxqnVVb8qu")
			);
           let lol = new MessageEmbed()
      .setDescription("You must have to buy [Premium](https://discord.gg/mxqnVVb8qu) Before using this command [Click Here](https://discord.gg/mxqnVVb8qu) To Buy Premium.")
      .setColor("#2f3136")
    return interaction.reply({embeds: [lol], components: [row]})
         }
       }
        try {
            SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
}
   