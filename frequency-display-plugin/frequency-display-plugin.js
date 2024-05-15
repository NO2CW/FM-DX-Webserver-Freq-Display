document.addEventListener('DOMContentLoaded', function() {
    // Hide the original frequency display but keep it in the DOM
    var originalFrequencyDisplay = document.getElementById('data-frequency');
    if (originalFrequencyDisplay) {
        originalFrequencyDisplay.style.display = 'none'; // Hide the original frequency element
    }

    // Ensure the container for the graphical frequency display exists
    var freqContainer = document.getElementById('freq-container');
    if (!freqContainer) {
        console.error('Frequency container not found');
        return;
    }

    // Create or find the container for the graphical representation
    var gifsContainer = document.getElementById('frequency-gifs');
    if (!gifsContainer) {
        gifsContainer = document.createElement('div');
        gifsContainer.id = 'frequency-gifs';
        gifsContainer.style.display = 'flex';
        gifsContainer.style.justifyContent = 'center';
        gifsContainer.style.alignItems = 'center';
        freqContainer.appendChild(gifsContainer);
    }

    // Function to update the display
    function updateFrequencyDisplay() {
        var frequency = originalFrequencyDisplay.textContent.trim();
        gifsContainer.innerHTML = ''; // Clear existing content

        // Iterate over each character in the frequency string
        for (var i = 0; i < frequency.length; i++) {
            var char = frequency[i];
            var img = document.createElement('img');

            // Check if the current character is a dot
            if (char === '.') {
                img.src = 'images3/dot.png'; // Set the source to your dot.png image
            } else {
                img.src = 'images3/' + char + '.png'; // Set the source based on the digit
            }

            img.style.width = '28px'; // Set a reduced width to fit the display
            img.style.height = '65px'; // Set a reduced height to maintain aspect ratio

            gifsContainer.appendChild(img);
        }
    }

    // Call the update function whenever the frequency might change
    setInterval(updateFrequencyDisplay, 600); // Update the display every second
});
