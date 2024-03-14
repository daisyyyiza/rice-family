String.prototype.pxWidth = function(font) {
    // re-use canvas object for better performance
    var canvas = String.prototype.pxWidth.canvas || (String.prototype.pxWidth.canvas = document.createElement("canvas")),
        context = canvas.getContext("2d"); 
  
    font && (context.font = font);
    var metrics = context.measureText(this);
  
    return metrics.width;
  }

function fillLineWithDot() {
    const lines = document.getElementsByClassName("ingredient-line");
    for (const line of lines) {
        const parentElement = line.parentElement;
        const parentWidth = parentElement.offsetWidth;
        const rawExistingText = parentElement.innerText.replaceAll('.', '');
        const font = getComputedStyle(parentElement).getPropertyValue('font');
        const existingTextWidth = rawExistingText.pxWidth(font);
        const dotWidth = ".".pxWidth(font);
        const numChars = Math.floor((parentWidth - existingTextWidth)/dotWidth);
        const repeatCount = numChars - 1;
        if (repeatCount < 0) {
            line.innerText = '.'.repeat(10);
            continue;
        }
        line.innerText = '.'.repeat(repeatCount);
    }
}

// Adjust on window resize
window.onload = fillLineWithDot;
window.onresize = fillLineWithDot;