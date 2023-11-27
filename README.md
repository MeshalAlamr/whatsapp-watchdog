# WhatsApp Watchdog

<p align="center">
  <img src="https://github.com/MeshalAlamr/whatsapp-watchdog/assets/68873733/87b00b77-9038-4edd-b8c8-b49fb2e5ad76" alt="WhatsApp Watchdog" style="width:200px; border-radius:10px;">
  <br>
  <i>Image by DALL-E-3</i>
</p>


WhatsApp Watchdog is a Node.js application to monitor Python scripts/services on Windows and send alerts via WhatsApp if the script/service is down. It regularly checks if a specified service (like a Python script) is running on the system and sends an alert through WhatsApp if the service is down. 


## Motivation
This project was born out of a personal need to monitor `update_sheets.py`, a Python script on my Windows machine that neede to be running 24/7. Therefore, I created this project to monitor the script and send me a WhatsApp alert (because it's more convenient for me) if the script is down. 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MeshalAlamr/whatsapp-watchdog.git
   cd whatsapp-watchdog
   ```
   
2. Install dependencies:
   ```bash
   npm ci
   ```

3. Set up alert recipient:
    - Copy `.env.example` and rename it to `.env`.
    - Update the `.env` file with the WhatsApp chat ID you want to send alerts to. (e.g.,  `966123456789@c.us`)

4. Configure monitoring settings:
    - Modify `config.js` to set the monitoring schedule and specific Python script/service to monitor. 
    - The default configuration is set to check `main.py` every hour.

## Usage
1. Start the application:
    ```bash
    npm start
    ```

2. Link WhatsApp:
    - Scan the QR code in the terminal using WhatsApp on your phone (WhatsApp -> Linked Devices).
    - Once you see "WhatsApp Watchdog is ready!", the monitoring starts.

## Contributing
Contributions to WhatsApp Watchdog are greatly appreciated. If you have suggestions for improvements or want to contribute to the project, please feel free to do so. Expanding the project to support other operating systems is a good place to start.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer
This application is not affiliated with or endorsed by WhatsApp. 
