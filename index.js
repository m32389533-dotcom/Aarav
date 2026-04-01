const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// human-like delay
function replyWithDelay(message, text) {
  setTimeout(() => {
    message.reply(text);
  }, Math.floor(Math.random() * 2000) + 1000);
}

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase();

  // 👉 detect if it's DM or server
  const isDM = message.channel.type === 1;

  // 🔵 DM replies (more personal)
  if (isDM) {
    if (text.includes('hi') || text.includes('hello')) {
      return replyWithDelay(message, "Hey… didn’t expect you here 👀");
    }

    if (text.includes('how are you')) {
      return replyWithDelay(message, "I’m good… just keeping low. You?");
    }

    if (text.includes('money') || text.includes('earn')) {
      return replyWithDelay(message, "Depends… what exactly are you looking for?");
    }

    return replyWithDelay(message, "Hmm… tell me more.");
  }

  // 🟢 SERVER replies (less aggressive, more natural)
  else {
    if (text === '!ping') {
      return message.reply('Pong! 🏓');
    }

    if (text.includes('hello') || text.includes('hi')) {
      return replyWithDelay(message, "Hey.");
    }

    if (text.includes('money') || text.includes('earn')) {
      return replyWithDelay(message, "Not everything is as simple as it looks.");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
