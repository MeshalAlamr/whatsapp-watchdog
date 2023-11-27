const schedule = require('node-schedule');
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const config = require('./config'); 

class WhatsAppService {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: config.dataPath }),
      puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: true,
        args: config.puppeteerArgs,
      },
    });

    this.initializeClient();
  }

  initializeClient() {
    this.client.initialize();

    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

  }

  ready() {
    return new Promise((resolve) => {
      this.client.on('ready', () => {
        console.log("WhatsApp Watchdog is ready!");
        console.log("Starting to monitor " + config.serviceName + " and sending a message to " + config.chatId + " in case of failure...");
        resolve();
      });
    });
  }

  sendMessage(chatId, message) {
    this.client.sendMessage(chatId, message).catch(error => {
      console.error("Error sending message:", error);
    });
  }
}

class WindowsSystemMonitor {
  static checkPythonService(callback) {
    const psCommand = `get-wmiobject Win32_process -filter "Name='python.exe'" | foreach-object {$_.CommandLine}`;
    exec(`powershell.exe -command "${psCommand.replace(/"/g, '\\"')}"`, callback);
  }
}

async function main() {
  console.log('Starting WhatsApp service...')
  const whatsAppService = new WhatsAppService();
  await whatsAppService.ready();

  schedule.scheduleJob(config.schedule, () => {
    WindowsSystemMonitor.checkPythonService((err, stdout, stderr) => {
      if (err) {
        console.error("Error:", err);
        return;
      }

      if (stderr) {
        console.error("Stderr:", stderr);
        return;
      }

      if (!stdout.includes(config.serviceName)) {
        console.log('Service is not running');
        whatsAppService.sendMessage(config.chatId, config.serviceName + " is not running, please check!");
      } else {
        console.log('Service is running');
      }
    });
  });
}

main();
