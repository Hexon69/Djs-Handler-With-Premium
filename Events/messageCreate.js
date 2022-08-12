const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const ms = require("ms-prettify").default;

const pre= require("../Detabase/prefix.js");

module.exports = async (client, message) => {

  

    let prefix = client.prefix;

    const ress =  await pre.findOne({guildid: message.guild.id})

    if(ress && ress.prefix)prefix = ress.prefix;

   

    if(!message.guild || message.author.bot) return;

     const premrow = new MessageActionRow()

     .addComponents(new MessageButton()

     .setLabel("Premium")

     .setStyle("LINK")

     .setURL("https://discord.gg/mxqnVVb8qu"));

  

   let uprem = await client.db.get(`uprem_${message.author.id}`);

  

  let upremend = await client.db.get(`upremend_${message.author.id}`);

//user premiums scopes ^^

  let sprem = await client.db.get(`sprem_${message.guild.id}`);

  let spremend = await client.db.get(`spremend_${message.guild.id}`);

//server premium scopes ^^

  let scot = 0;

  let slink = "https://discord.gg/mxqnVVb8qu";

  if(upremend && Date.now() >= upremend) 

  {

    let upremcount = await client.db.get(`upremcount_${message.author.id}`) ? await client.db.get(`upremcount_${message.author.id}`) : 0;

  let upremserver = await client.db.get(`upremserver_${message.author.id}`) ? await client.db.get(`upremserver_${message.author.id}`) : [];

  let spremown = await client.db.get(`spremown_${message.guild.id}`);

    

   await client.db.delete(`upremcount_${message.author.id}`)

    await client.db.delete(`uprem_${message.author.id}`)

    await client.db.delete(`upremend_${message.author.id}`)

    if(upremserver.length > 0){

      for(let i = 0; i < upremserver.length; i++){

        scot += 1;

        await client.db.delete(`sprem_${upremserver[i]}`)

        await client.db.delete(`spremend_${upremserver[i]}`)

        await client.db.delete(`spremown_${upremserver[i]}`)

      }

    }

   await client.db.delete(`upremserver_${message.author.id}`)

    message.author.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scot}\`** Servers [Premium](https://discord.gg/mxqnVVb8qu) was removed.\nClick [here](https://discord.gg/mxqnVVb8qu) To Buy [Premium](https://discord.gg/mxqnVVb8qu).`)], components: [premrow]}).catch((err) => { });

  }

  if(spremend && Date.now() >= spremend)

  { 

    let scount = 0;

    

    let us = await client.db.get(`spremown_${message.guild.id}`);

    

    let upremserver = await client.db.get(`upremserver_${us}`) ? await client.db.get(`upremserver_${us}`) : [];

    

    let upremcount = await client.db.get(`upremcount_${us}`) ? await client.db.get(`upremcount_${us}`) : 0;

    

    let spremown = await client.db.get(`spremown_${message.guild.id}`).then(r => client.db.get(`upremend_${r}`));

    

    await client.db.delete(`sprem_${message.guild.id}`)

    await client.db.delete(`spremend_${message.guild.id}`)

    

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

    await client.users.cache.get(`${us}`).send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scount}\`** Servers [Premium](https://discord.gg/mxqnVVb8qu) was removed.\nClick [here](https://discord.gg/mxqnVVb8qu) To Buy [Premium](https://discord.gg/mxqnVVb8qu).`)], components: [premrow]}).catch((er) => { })

    }catch(errors) {

      

    }

    }

    await client.db.delete(`upremserver_${us}`)

    await client.db.delete(`spremown_${message.guild.id}`)

    message.channel.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`The Premium Of This Server Has Got Expired.\nClick [here](https://discord.gg/mxqnVVb8qu) To Buy [Premium](https://discord.gg/mxqnVVb8qu).`)], components: [premrow]}).catch((err) => { });

  

  }

    const Mention = new RegExp(`^<@!?${client.user.id}> `);

    prefix = message.content.match(Mention) ? message.content.match(Mention)[0] : prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    let color = client.config.Bot.Color;

    const cmd = client.commands.get(command) || client.commands.find((x) => x.aliases && x.aliases.includes(command));

const t = client.timeouts.get(`${message.author.id}_${cmd.name}`) || 0;

        if (Date.now() - t < 0) return message.reply({ embeds: [

          new MessageEmbed()

          .setAuthor(`You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}`)

          .setColor(client.color)

        ] });

        client.timeouts.set(`${message.author.id}_${cmd.name}`, Date.now() + (cmd.timeout || 0));

    if(!cmd) return;

  if (!message.member.permissions.has(cmd.userperms || [])) {

         return message.reply({ embeds: [

           new MessageEmbed()

           .setAuthor(`❌ | You do not have ${cmd.userperms} permission(s) to run this command.`)

           .setColor(client.color)

         ]})

       }

   if (!message.guild.me.permissions.has(cmd.botperms || [])) {

         return message.reply({ embeds: [

           new MessageEmbed()

           .setAuthor(`❌ | I need ${cmd.userperms} permission(s) to run this command.`)

           .setColor(client.color)

         ]})

   }    

  if(cmd.premium){

         if(!'ko2oieieie'.includes(message.author.id) && !uprem && !sprem){

    const row = new MessageActionRow()

    .addComponents(

    new MessageButton()

    .setLabel("Premium")

    .setStyle("LINK")

    .setURL("https://discord.gg/mxqnVVb8qu")

			);           let lol = new MessageEmbed()

      .setDescription("You must have to buy [Premium](https://discord.gg/mxqnVVb8qu) Before using this command [Click Here](https://discord.gg/mxqnVVb8qu) To Buy Premium.")

      .setColor("#2f3136")

    return message.reply({embeds: [lol], components: [row]})

         }

  }

    cmd.run(client, message, args, prefix, color);

}
