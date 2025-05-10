# FM DX Webserver – Frequency Display Plugin

This plugin customizes how frequencies are displayed on the FM DX Webserver by replacing standard text with PNG image files representing digits. It allows for a more creative, font-independent frequency display.

## 🔧 Files Included:
1. `plugins/frequency-display-plugin.js`  
2. `plugins/frequency-display-plugin/frequency-display-plugin.js`  
3. **11 PNG image files** for digits 0–9 and a decimal point (or comma), named:  
   - `0.png`, `1.png`, ..., `9.png`, `dot.png` (or `comma.png`)  

## 📁 Expected Folder Structure:
- Place the digit PNG files in: `/web/images3`  
- Each PNG should have a transparent background for better visual fit.  
- Place the two `.js` files in the standard location for plugins (`/plugins` and `/plugins/frequency-display-plugin/`), as is commonly done for all FM DX Webserver plugins.

## ⚙️ Customization:
The plugin's JavaScript file can be easily edited to change the image path or load images from an online source.

A set of sample digit images is included.
