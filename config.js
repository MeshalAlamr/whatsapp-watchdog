// Load environment variables from a .env file
require('dotenv').config();

module.exports = {
    // Python service/script name to monitor
    serviceName: `main.py`,

    // Schedule setting for cron job (every 1 hour in this example)
    schedule: '1 * * * *',

    // WhatsApp Chat ID for sending messages
    chatId: process.env.CHATID,

    // Path to store authentication data for WhatsApp
    dataPath: './data',

    // Puppeteer arguments for running headless Chrome
    puppeteerArgs: [
        "--no-sandbox", 
        "--disable-setuid-sandbox", 
        "--disable-dev-shm-usage", 
        "--shm-size=3gb"
    ]
};
