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
function isOperator(n) {
    return n == "x" || n == "+" || n == "÷" || n == "-"
}
function getPrev() {
    return screen.textContent.split(" ").slice(-1).toString()
}
function getPrevTwo() {
    return screen.textContent.split("").slice(-2)
}

let numStack = [];
let opStack = [];
let newOp = false;

const screen = document.querySelector(".calc-screen");
const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        switch (e.target.textContent) {
            case "AC":
                screen.classList.remove("error-screen");
                screen.textContent = 0;
                newOp = false;
                break;
            case "Backspace":
                screen.classList.remove("error-screen");
                newOp = false;
                if (screen.textContent.length == 1 || screen.textContent == "pls watch/read One Piece 🏴‍☠️")
                    screen.textContent = 0;
                else if (getPrevTwo().includes(" "))
                    screen.textContent = screen.textContent.split("").slice(0, screen.textContent.length-2).join("")
                else
                    screen.textContent = screen.textContent.split("").slice(0, screen.textContent.length-1).join("");
                break;
            case "x":
            case "÷":
            case "-":   // could change to allow user to input negative numbers
            case "+":
                if (!isOperator(getPrev()) && screen.textContent != "pls watch/read One Piece 🏴‍☠️") {
                    screen.textContent += ` ${e.target.textContent}`;
                    newOp = false;
                    screen.classList.remove("error-screen");
                }
                break;
            case ".":
                if (screen.textContent != "pls watch/read One Piece 🏴‍☠️") {
                    if (isOperator(getPrev())) {
                        if (screen.textContent == "-")
                            screen.textContent += "0.";
                        else
                            screen.textContent += " 0.";
                    }
                    else if (!(getPrev().split("").includes(".")))
                        screen.textContent += ".";
                    newOp = false;
                    screen.classList.remove("error-screen");
                }
                break;
            case "=":
                let userInput = screen.textContent.split(" ");
                if (!(isOperator(userInput[userInput.length-1])) && screen.textContent != "pls watch/read One Piece 🏴‍☠️") {
                    for (let i = 0; i < userInput.length; i++) {
                        if (isOperator(userInput[i]))
                            opStack.push(userInput[i]);
                        else 
                            numStack.push(userInput[i]);
                    }
                    
                    screen.textContent = numStack.reduce((answer, n) => operate(answer, n, opStack.shift()));
                    if (screen.textContent == "Infinity" || screen.textContent == "-Infinity" || screen.textContent == "NaN") {
                        screen.textContent = "pls watch/read One Piece 🏴‍☠️";
                        screen.classList.add("error-screen");
                        const img = document.createElement("img");
                        img.src = "chopper-cropped.webp";   // https://www.pngall.com/tony-tony-chopper-png/download/142360/
                        img.setAttribute("id", "op-img");
                        screen.append(img);
                        console.log(screen.textContent);
                    }
                    numStack = [];
                    opStack = [];
                    userInput = [];
                    newOp = true;
                }
                break;
            default:
                screen.classList.remove("error-screen");
                if (screen.textContent == "0." || screen.textContent == "-0.")
                    screen.textContent += e.target.textContent;
                else if (screen.textContent == 0 || newOp)
                    screen.textContent = e.target.textContent;
                else if (isOperator(getPrev()) && !isNaN(screen.textContent.split(" ").slice(-2)[0]))
                    screen.textContent += ` ${e.target.textContent}`;
                else
                    screen.textContent += e.target.textContent;
                newOp = false;
        }
    })
})