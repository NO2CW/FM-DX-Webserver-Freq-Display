$(document).ready(function() {
    // Configuration
    const config = {
        // Path to nixie tube images
        imagePath: '/images3/',
        // Container styling
        containerStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
            width: '100%'
        }
    };

    // Check if we're on mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    // Get appropriate image dimensions based on device
    function getImageDimensions() {
        if (isMobileDevice()) {
            return {
                width: 30,  // Smaller for mobile
                height: 48
            };
        } else {
            return {
                width: 50,  // Larger for desktop
                height: 80
            };
        }
    }

    // Modify the frequency heading to make it smaller
    function adjustFrequencyHeading() {
        // Find the FREQUENCY heading
        const heading = $('#freq-container h2, .panel-33:contains("FREQUENCY") h2');
        
        if (heading.length > 0) {
            console.log("Found frequency heading, making it smaller");
            
            // Store original styles for potential reset
            heading.attr('data-original-style', heading.attr('style') || '');
            
            // Make the heading smaller and adjust its position
            if (isMobileDevice()) {
                heading.css({
                    'font-size': '12px',
                    'margin-bottom': '2px',
                    'margin-top': '2px',
                    'opacity': '0.7'
                });
            } else {
                heading.css({
                    'font-size': '14px',
                    'margin-bottom': '5px',
                    'margin-top': '5px',
                    'opacity': '0.7'
                });
            }
        }
    }

    // Find the correct frequency display element
    function findFrequencyDisplay() {
        // Try different selectors that might contain the frequency
        const selectors = [
            '#data-frequency',
            '.text-big#data-frequency',
            '.frequency .text-big',
            '#freq-container .text-big',
            '.panel-33:contains("FREQUENCY") .text-big'
        ];
        
        for (const selector of selectors) {
            const element = $(selector);
            if (element.length > 0) {
                console.log("Found frequency element:", selector);
                return element;
            }
        }
        
        // Fallback: look for any element containing a frequency-like pattern
        const elements = $('.text-big');
        for (const element of elements) {
            const text = $(element).text().trim();
            if (/^\d{2,3}\.\d{3}$/.test(text)) {
                console.log("Found frequency by pattern:", text);
                return $(element);
            }
        }
        
        console.error("Could not find frequency display element");
        return null;
    }

    // Create a container for our nixie tubes that won't disrupt layout
    function createNixieContainer() {
        const frequencyDisplay = findFrequencyDisplay();
        if (!frequencyDisplay) return null;
        
        console.log("Frequency display found:", frequencyDisplay.text());
        
        // Get the parent container to work with
        const parentContainer = frequencyDisplay.parent();
        
        // Store original styles for the frequency display
        frequencyDisplay.attr('data-original-style', frequencyDisplay.attr('style') || '');
        
        // Create container with proper styling
        const nixieContainer = $('<div id="nixie-container"></div>').css(config.containerStyle);
        
        // Add margin-top based on device
        if (isMobileDevice()) {
            nixieContainer.css('margin-top', '5px');
        } else {
            nixieContainer.css('margin-top', '10px');
        }
        
        // Replace the frequency display with our container
        frequencyDisplay.css('display', 'none');
        parentContainer.append(nixieContainer);
        
        return {
            container: nixieContainer,
            original: frequencyDisplay,
            parent: parentContainer
        };
    }

    // Create a nixie tube image element
    function createNixieTube(digit) {
        const dimensions = getImageDimensions();
        return $('<img>')
            .attr('src', `${config.imagePath}${digit}.png`)
            .css({
                width: dimensions.width + 'px',
                height: dimensions.height + 'px',
                margin: '0 1px'
            });
    }

    // Update nixie tubes to display current frequency
    function updateNixieDisplay(elements) {
        if (!elements || !elements.original || !elements.container) return;
        
        // Get current frequency
        const frequency = elements.original.text().trim();
        
        // Clear existing nixie tubes
        elements.container.empty();
        
        // Create nixie tubes for each digit
        for (let i = 0; i < frequency.length; i++) {
            const char = frequency.charAt(i);
            
            if (char === '.') {
                const fontSize = isMobileDevice() ? '30px' : '50px';
                elements.container.append(
                    $('<div>').text('.').css({
                        fontSize: fontSize,
                        fontWeight: 'bold',
                        margin: '0 -5px',
                        color: '#ff9c00'
                    })
                );
            } else if (!isNaN(parseInt(char))) {
                elements.container.append(createNixieTube(char));
            }
        }
    }

    // Handle window resize events
    function handleResize(elements) {
        if (!elements) return;
        
        // Adjust the nixie container and images based on new screen size
        const dimensions = getImageDimensions();
        
        elements.container.find('img').css({
            width: dimensions.width + 'px',
            height: dimensions.height + 'px'
        });
        
        // Adjust the decimal point size
        const fontSize = isMobileDevice() ? '30px' : '50px';
        elements.container.find('div').css('font-size', fontSize);
        
        // Re-adjust the heading
        adjustFrequencyHeading();
    }

    // Initialize nixie display
    function initNixieDisplay() {
        console.log("Initializing nixie display");
        
        // First adjust the heading to make more room
        adjustFrequencyHeading();
        
        // Create container for nixie tubes
        const elements = createNixieContainer();
        if (!elements) {
            console.error("Failed to create nixie container");
            return;
        }
        
        // Update nixie display initially
        updateNixieDisplay(elements);
        
        // Update nixie display when frequency changes
        setInterval(() => updateNixieDisplay(elements), 500);
        
        // Handle window resize events
        $(window).on('resize', function() {
            handleResize(elements);
        });
    }

    // Add some delay to ensure the page is fully loaded
    setTimeout(initNixieDisplay, 1000);
});
