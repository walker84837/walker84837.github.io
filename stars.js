document.addEventListener('DOMContentLoaded', () => {
    const starElements = [
        { id: 'stars1', numStars: 700, size: 1, duration: '120s' },
        { id: 'stars2', numStars: 200, size: 2, duration: '180s' },
        { id: 'stars3', numStars: 100, size: 3, duration: '240s' }
    ];

    let styleSheet = null;

    function getStyleSheet() {
        if (!styleSheet) {
            // Find or create a stylesheet for dynamic rules
            const existingStyle = document.getElementById('dynamic-star-styles');
            if (existingStyle) {
                styleSheet = existingStyle.sheet;
            } else {
                const style = document.createElement('style');
                style.id = 'dynamic-star-styles';
                document.head.appendChild(style);
                styleSheet = style.sheet;
            }
        }
        return styleSheet;
    }

    function clearDynamicRules() {
        const sheet = getStyleSheet();
        if (sheet) {
            for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
                sheet.deleteRule(i);
            }
        }
    }

    function generateStars() {
        clearDynamicRules(); // Clear previous rules before generating new ones

        const docWidth = document.body.scrollWidth;
        const docHeight = document.body.scrollHeight;
        const sheet = getStyleSheet();

        starElements.forEach(starConfig => {
            const starElement = document.getElementById(starConfig.id);
            if (starElement) {
                let shadows = [];
                for (let i = 0; i < starConfig.numStars; i++) {
                    const x = Math.floor(Math.random() * docWidth);
                    const y = Math.floor(Math.random() * docHeight);
                    shadows.push(`${x}px ${y}px #FFF`);
                }
                starElement.style.boxShadow = shadows.join(',');
                starElement.style.animationDuration = starConfig.duration;

                // Inject CSS rule for ::after pseudo-element
                if (sheet) {
                    const rule = `#${starElement.id}::after { box-shadow: ${shadows.join(',')}; }`;
                    sheet.insertRule(rule, sheet.cssRules.length);
                }
            }
        });
    }

    generateStars();

    window.addEventListener('resize', generateStars);
});
