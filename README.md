# FM-DX-Webserver-Freq-Display
FM DX Webserver
This plugin replaces the frequency displayed with png files that represent the frequency. it wllows the use of creative frequency display without the use of special fonts. 
The files that are part of this plugin are as follows:
(1) plugins/frequency-display-plugin.js
(2) Plugins/frequency-display-plugin/frequency-display-plugin.js
(3) 11 png files representing the numbers from zero to 9 plus a decimal digit dot (or comma) 
Each of these digit files needs to have a png extension and for a better fit not have a background. the name of each file should ne the actual number: 0.png, 1.png, 2.png etc ending with dot.png
The current code assumes that the 11 png files will be placed in the following folder: /web/images3   The js file can easily be modified to look for these files elsewhere in a folder or to retrieve them from an online location. 11 sample files have been provided.
