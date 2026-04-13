function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if(b === 0) { document.querySelector("body").textContent = "NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE" }
    return a / b;
}

function operate(a, b, op) {
    a = Number(a);
    b = Number(b);

    switch(op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function addItem(event) {
    const target = event.target;
    const type = target.classList[0];
    const text = target.textContent;
    if(text.length > 3) {  return;  }

    if(op !== "") {
        if(type === "num") {
            right = right === null ? text : right + text;
        } else if(type === "op") {
            if(right !== null) {
                left = operate(left, right, op)
                right = null;
                if(text === "=") {
                    op = "";
                } else {
                    op = text;
                }
            }
        } else if(type === "toggle") {
            if(right !== null) {
                right = 0 - right;
            } else {
                left = 0 - left;
            }
        }
    } else {
        if(type === "num") {
            left = left === null ? text : left + text;
        } else if(type === "op") {
            if(text !== "=") {
                op = text;
                right = null;
            }
        } else if(type === "toggle") {
            if(right !== null) {
                right = 0 - right;
            } else {
                left = 0 - left;
            }
        }
    }

    if(type === "ctrl") {
        switch(text) {
            case "AC":
                left = null;
                right = null;
                op = "";
                break;
            case "⌫":
                if(right !== null) {
                    right = Math.floor(right / 10);
                    if(right === 0) { right = null }
                } else if(op !== "") {
                    op = "";
                } else {
                    left = Math.floor(left / 10);
                    if(left === 0) { left = null }
                }
        }
    } else if(type === "punctuation") {
        if(right !== null) {
            right = right.includes(".") ? right : right + ".";
        } else if(op === "") {
            left = left.includes(".") ? left : left + ".";
        }
    }

    updateDisplay();
}

function format(n) {
    if (n === null) return "";
    return Math.round(Number(n) * 1000) / 1000;
}

function updateDisplay() {
    display.textContent = `${format(left)} ${op} ${format(right)}`;
}

const buttons = document.querySelector("#buttons");
const display = document.querySelector("#text");

let left = null;
let right = null;
let op = "";

buttons.addEventListener("click", addItem)
