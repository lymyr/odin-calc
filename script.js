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
function getPrevChar() {
    return screen.textContent.split(" ").slice(-1)
}
function isOperator(n) {
    return n == "x" || n == "+" || n == "÷" || n == "-"
}

let numStack = [];
let opStack = [];
let newOp = false;

const screen = document.querySelector(".calc-screen");
const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        screen.classList.remove("error-screen");
        if (e.target.textContent == "AC") {
            screen.textContent = 0;
        }
        else if (e.target.textContent == "Backspace") {
            if (screen.textContent.length == 1 || screen.textContent == "pls watch/read One Piece 🏴‍☠️") {
                screen.textContent = 0;
            }
            else {
                screen.textContent = screen.textContent.split("").slice(0, screen.textContent.length-1).join("");
                
            }
        }
        else if (newOp) {
            if (e.target.textContent == "." && !(getPrevChar().toString().split("").includes("."))) {
                screen.textContent += e.target.textContent;
            }
            else if (!(isOperator(e.target.textContent)) && e.target.textContent != ".") {
                screen.textContent = e.target.textContent;
            }
            else if (e.target.textContent != ".")
                screen.textContent += ` ${e.target.textContent}`;
            newOp = false;
        }
        else if (e.target.textContent != "AC" && e.target.textContent != "=") {
            if (screen.textContent == "pls watch/read One Piece 🏴‍☠️") {
                if (isOperator(e.target.textContent))
                    screen.textContent = 0
                else
                    screen.textContent = e.target.textContent;
            }
            else if (screen.textContent == "0") {
                if (e.target.textContent == ".") {
                    screen.textContent += e.target.textContent;
                }
                else if (!(isOperator(e.target.textContent))){
                        screen.textContent = e.target.textContent;
                    }
                else {
                    screen.textContent += ` ${e.target.textContent} `;
                }
            }
            else if (screen.textContent != "0"){
                if (e.target.textContent == "." && !(getPrevChar().toString().split("").includes("."))) {
                    if (isOperator(getPrevChar()))
                        screen.textContent += ` 0${e.target.textContent}`
                    else
                        screen.textContent += e.target.textContent;
                }
                else if (isOperator(e.target.textContent)) {
                    if (!isOperator(getPrevChar())) {
                        screen.textContent += ` ${e.target.textContent}`;
                    }
                }
                else if (e.target.textContent != "." && !(isOperator(e.target.textContent))) {
                    if (isOperator(getPrevChar()))
                        screen.textContent += " ";
                    screen.textContent += e.target.textContent;
                }
            }
        }
        else if (e.target.textContent == "=") {
            let userInput = screen.textContent.split(" ");
            newOp = true;
            if (!(isOperator(userInput[userInput.length-1]))) {
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
            }
        }
    })
})