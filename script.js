let nth = 1000;
function add(a, b) {
    return (Math.round((parseFloat(a)+parseFloat(b))*nth))/nth
}
function subtract(a, b) {
    return (Math.round((parseFloat(a)-parseFloat(b))*nth))/nth
}
function multiply(a, b) {
    return (Math.round((parseFloat(a)*parseFloat(b))*nth))/nth
}
function divide(a, b) {
    return (Math.round((parseFloat(a)/parseFloat(b))*nth))/nth
}
function operate(a, b, op) {
    if (op != null) {
        switch (op) {
            case "+":
                return add(a, b)
            case "-":
                return subtract(a, b)
            case "x":
                return multiply(a, b)
            case "÷":
                return divide(a, b)
        }
    }
}
function isOperator(n) {
    return n == "x" || n == "+" || n == "÷" || n == "-"
}
function getPrev() {
    return screen.textContent.split(" ").slice(-1).toString()
}
function getPrevTwo() {
    return screen.textContent.split("").slice(-2)
}
function getArr() {
    return screen.textContent.split(" ");
}
let arr = [];
const screen = document.querySelector(".calc-screen");
const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (screen.textContent == "pls watch/read One Piece 🏴‍☠️") {
            screen.textContent = 0;
            screen.classList.remove("error-screen");
        }
        arr = getArr();
        switch (e.target.textContent) {
            case "AC":
                screen.textContent = 0;
                break;
            case "Backspace":
                if (screen.textContent.length == 1)
                    screen.textContent = 0;
                else if (getPrevTwo().includes("-") && arr.length == 1) {
                    screen.textContent = 0;
                }
                else if (getPrevTwo().includes(" "))
                    screen.textContent = screen.textContent.split("").slice(0, screen.textContent.length-2).join("")
                else
                    screen.textContent = screen.textContent.split("").slice(0, screen.textContent.length-1).join("");
                break;
            case "x":
            case "÷":
            case "-":
            case "+":
                if (isOperator(arr[arr.length - 1])) {
                    arr[arr.length - 1] = e.target.textContent;
                    screen.textContent = arr.join(" ");
                }
                else if (arr.length == 3) {
                    screen.textContent = operate(arr[0], arr[2], arr[1]);
                    screen.textContent += ` ${e.target.textContent}`;
                }
                else 
                    screen.textContent += ` ${e.target.textContent}`;
                break;
            case ".":
                if (isOperator(getPrev()))
                    screen.textContent += " 0.";
                else if (!(screen.textContent.split("").includes(".")))
                    screen.textContent += ".";
                break;
            case "=":
                if (!(isOperator(screen.textContent)) && screen.textContent != "pls watch/read One Piece 🏴‍☠️") {
                    screen.textContent = operate(arr[0], arr[2], arr[1]);

                    if (screen.textContent == "Infinity" || screen.textContent == "-Infinity" || screen.textContent == "NaN") {
                        screen.textContent = "pls watch/read One Piece 🏴‍☠️";
                        screen.classList.add("error-screen");
                        const img = document.createElement("img");
                        img.src = "chopper-cropped.webp";   // https://www.pngall.com/tony-tony-chopper-png/download/142360/
                        img.setAttribute("id", "op-img");
                        screen.append(img);
                        console.log(screen.textContent);
                    }
                }
                break;
            default:
                if (screen.textContent == "0")
                    screen.textContent = e.target.textContent;
                else if (isOperator(arr[arr.length - 1])) {
                    screen.textContent += ` ${e.target.textContent}`;
                }
                else
                    screen.textContent += e.target.textContent;
        }
    })
})