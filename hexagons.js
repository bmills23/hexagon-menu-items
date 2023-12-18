const baseColor = 'green'; // Change this color to desired base
const hoverColor = 'orange'; // Change this color to desired hover

// Select elements outside the event handler
const hexagons = document.querySelectorAll('.hex');

const hexagonBeforeStyle = document.getElementById('hexagon-before');
const hexagonAfterStyle = document.getElementById('hexagon-after');

const hexagonBeforeHoverStyle = document.getElementById('hexagon-before-hover');
const hexagonAfterHoverStyle = document.getElementById('hexagon-after-hover');

function setHexagonStylings() {

    hexagons.forEach((hexagon) => {

        hexagon.addEventListener('mouseover', () => {
            hexagon.style.color = baseColor;
            hexagon.style.backgroundColor = hoverColor;
        });

        hexagon.addEventListener('mouseout', () => {
            hexagon.style.color = hoverColor;
            hexagon.style.backgroundColor = baseColor;
        })

        hexagon.style.backgroundColor = baseColor;
        hexagon.style.borderColor = baseColor;
        hexagon.style.color = hoverColor;
        hexagon.style.position = 'relative';
        hexagon.style.display = 'inline-block';
        hexagon.style.transition = '0s ease-in';
        hexagon.style.boxSizing = 'border-box';
    })
  
}

function resizeHexagons() {

    const width = window.innerWidth;

    // Define a shared parameter for hexagon styling calculations
    const baseParameter = width / 12;

    hexagons.forEach(hexagon => {

        let hexagonWidth, hexagonHeight, marginTop, textSize;

        if (width < 1280 && width > 750) {

            hexagonWidth = Math.floor(baseParameter);
            hexagonHeight = Math.floor(hexagonWidth * 0.7);
              
            // Linear interpolation between upper and lower limits needed for seemless resize
            // lerp(a,b,t) = a + t(b - a)
            // Calculate interpolation factor 't'
            const t = (width - 750) / (1280 - 750);

            // Use linear interpolation to calculate marginTop
            marginTop = 2.25 + t * (3.5 - 2.25);

            //Use same linear interpolation for text size            
            textSize = 1.25 + t * (2 - 1.25); 

        } else if (width <= 750) {
            hexagonWidth = 62;
            hexagonHeight = 42;
            marginTop = 2.25;
            textSize = 1.25;
        } else if (width >= 1280) {
            hexagonWidth = 104;
            hexagonHeight = 72;
            marginTop = 3.5;
            textSize = 2;
        }

        hexagon.style.width = `${hexagonWidth}px`;
        hexagon.style.height = `${hexagonHeight}px`;
        hexagon.style.marginTop = `${marginTop}rem`;
        hexagon.style.fontSize = `${textSize}rem`;

        const beforePseudoElementStyle = `
            content: "";
            width: 0;
            height: 0;
            border-bottom: ${Math.ceil(hexagonWidth * 0.3)}px solid;
            border-color: inherit;
            border-left: ${Math.ceil(hexagonWidth * 0.5)}px solid transparent;
            border-right: ${Math.ceil(hexagonWidth * 0.5)}px solid transparent;
            position: absolute;
            top: -${Math.ceil(hexagonWidth * 0.3) - 1}px;
            right: 0;
        `;

        const afterPseudoElementStyle = `
            content: "";
            width: 0;
            position: absolute;
            right: 0;
            bottom: -${Math.ceil(hexagonWidth * 0.3) - 1}px;
            border-top: ${Math.ceil(hexagonWidth * 0.3)}px solid;
            border-color: inherit;
            border-left: ${Math.ceil(hexagonWidth * 0.5)}px solid transparent;
            border-right: ${Math.ceil(hexagonWidth * 0.5)}px solid transparent;
        `;

        hexagonBeforeStyle.innerHTML = `.hex::before { ${beforePseudoElementStyle} }`;
        hexagonAfterStyle.innerHTML = `.hex::after { ${afterPseudoElementStyle} }`;

        const hoverBeforePseudoElementStyle = beforePseudoElementStyle.replace(
            'border-color: inherit',
            `border-color: ${hoverColor}` 
        );

        const hoverAfterPseudoElementStyle = afterPseudoElementStyle.replace(
            'border-color: inherit',
            `border-color: ${hoverColor}`
        );

        hexagonBeforeHoverStyle.innerHTML = `.hex:hover:before { ${hoverBeforePseudoElementStyle} }`;
        hexagonAfterHoverStyle.innerHTML = `.hex:hover:after { ${hoverAfterPseudoElementStyle} }`;
    
    });
}

setHexagonStylings();
resizeHexagons();

window.addEventListener('resize', resizeHexagons);