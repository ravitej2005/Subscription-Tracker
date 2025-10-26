window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


document.addEventListener("DOMContentLoaded", function() {
    const text = `Track every subscription.
Save every rupee.`; // mlti-lne text
    const speed = 50; // typing speed in m
    let i = 0;

    const typingEl = document.getElementById("typingtext");

    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "pre-wrap";
    tempSpan.textContent = text;
    document.body.appendChild(tempSpan);

    // S min-heght to prevent layout shift
    typingEl.style.minHeight = tempSpan.offsetHeight + "px";
    document.body.removeChild(tempSpan);

    // -------------------------------
    // 2️⃣ Crate blinking cursor
    // -------------------------------
    const cursor = document.createElement("span");
    cursor.textContent = "|";
    cursor.style.display = "inline-block";
    cursor.style.marginLeft = "2px";
    cursor.style.animation = "blink 0.7s step-start infinite";
    typingEl.appendChild(cursor);

    // -------------------------------
    //  Typing animation
    // -------------------------------
    function typeEffect() {
        if (i < text.length) {
            if (text.charAt(i) === "\n") {
                typingEl.insertAdjacentHTML("beforeend", "<br>");
            } else {
                cursor.insertAdjacentText("beforebegin", text.charAt(i));
            }
            i++;
            setTimeout(typeEffect, speed);
        } else {
            cursor.remove();
        }
    }

    typeEffect();
});