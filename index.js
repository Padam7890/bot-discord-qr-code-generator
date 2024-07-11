import { Client, GatewayIntentBits } from "discord.js";
import QRCode from 'qrcode';
import dotenv from "dotenv"

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("error", (err) => {
  console.log(err.message);
});


client.on("messageCreate", async (message) => {
  console.log(message);

  if (message.content === "hey") {
    message.reply("Hello! Type `!qrcode qrcode` to generate . example ,  ` !qrcode padam`");
  } else if (message.content.startsWith("!qrcode ")) {
    const text = message.content.slice(8); // Remove the "!qrcode " part

    try {
      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(text);

      // Convert data URL to Buffer
      const data = qrCodeDataURL.replace(/^data:image\/\w+;base64,/, "");
      const buf = Buffer.from(data, "base64");

      // Send QR code image
      message.reply({
        files: [{ attachment: buf, name: "qrcode.png" }]
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate QR code.");
    }
  }
});


client.login(process.env.DISCORD_TOKEN);
