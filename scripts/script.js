const form = document.querySelector("form")
const color = document.getElementById("color");
const mode = document.getElementById("mode");
const colors = document.getElementById("colors");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    renderColors();
})

function renderColors () {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color.value.slice(1)}&mode=${mode.value}`)
        .then(response => response.json())
        .then(data => {
            colors.innerHTML = "";
            data.colors.forEach(function (color) {
                const hex = color.hex.clean;
                colors.innerHTML += `
                    <div id="${hex}"><p id="${hex}">#${hex}</p></div>
                `;
                document.getElementById(hex).style.backgroundColor = `#${hex}`;
            });
        });
}

document.addEventListener("click", function (e) {
    if (e.target.tagName === "DIV" || e.target.tagName === "P") {
        const hex = e.target.id;
        navigator.clipboard.writeText(`#${hex}`).then(() => {
            alert(`Copied #${hex} to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
});

renderColors()