const display = document.querySelector("#input");
const btn1 = document.querySelector("#one");
const btn2 = document.querySelector("#two");
const btn3 = document.querySelector("#three");
const btn4 = document.querySelector("#four");
const btn5 = document.querySelector("#five");
const btn6 = document.querySelector("#six");
const btn7 = document.querySelector("#seven");
const btn8 = document.querySelector("#eight");
const btn9 = document.querySelector("#nine");
const btn0 = document.querySelector("#zero");
const btn_minus = document.querySelector("#minus");
const btn_plus = document.querySelector("#plus");
const btn_div = document.querySelector("#divide");
const btn_mult = document.querySelector("#mult");
const btn_equal = document.querySelector("#equals");
const btn_clear = document.querySelector("#clear");
const btn_delete = document.querySelector("#back"); 
const last_op = document.querySelector("#last-op-label");
const input_btns = [btn_minus, btn9, btn_div, btn_plus, btn7, btn_mult, btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn8];

function append_input(c) {
    let text = display.value;
    if (text != ""){
        let a = text.split(" ");
        if (!isNaN(a.pop()) && !isNaN(c)){
            text = text + c;
            display.value = text;
            if (is_op(c)){
                last_op.textContent = c;
            }
        } else {
            text = text + " " + c;
            display.value = text;
            if (is_op(c)){
                last_op.textContent = c;
            }
        }
    } else {
        display.value = c;
    }
}
function delete_input() {
    let text = display.value;
    if (text != ""){
        text = text.split(" ");
        text.pop()
        text = text.join(" ");
        display.value = text; 
    }
}
function clear() {
    display.value = "";
    last_op.textContent = "";
}

// function operate(str) {
//     if (!is_well_formed(str)) {
//         alert("Your expression is not well formed! Please check it carefully.");
//     } else {
//         let ar = str.split(" ");
//         let numStack = [];
//         let opStack = [];

//         for (let i = 0; i < ar.length; i++) {
//             let token = ar[i];

//             if (is_number(token)) {
//                 numStack.push(parseInt(token));
//             } else if (token === "(") {
//                 opStack.push(token);
//             } else if (token === ")") {
//                 while (opStack[opStack.length - 1] !== "(") {
//                     applyOperator(numStack, opStack);
//                 }
//                 opStack.pop();
//             } else {
//                 while (opStack.length > 0 && opStack[opStack.length - 1] !== "(" && precedence(opStack[opStack.length - 1]) >= precedence(token)) {
//                     applyOperator(numStack, opStack);
//                 }
//                 opStack.push(token);
//             }
//         }

//         while (opStack.length > 0) {
//             applyOperator(numStack, opStack);
//   }

//         display.value = numStack[0];
//     }
// }

// function applyOperator(numStack, opStack) {
//     let op = opStack.pop();
//     let b = numStack.pop();
//     let a = numStack.pop();

//     let ans;

//     if (op === "+") {
//         ans = a + b;
//     } else if (op === "-") {
//         ans = a - b;
//     } else if (op === "*") {
//         ans = a * b;
//     } else if (op === "/") {
//         if (b == 0) {
//             alert("Attempt to divide by zero...");
//             display.value = "0";
//             return;
//         } else {
//             ans = a / b;
//         }
//     }

//     numStack.push(ans);
// }


// function precedence(op) {
//     if (op === "+" || op === "-") return 1;
//     if (op === "*" || op === "/") return 2;
//     if (op === "(") return 0; // Give parenthesis the lowest precedence
// }


// function is_well_formed(str) {
//     let ar = str.split(" ");
//     let parenthesisCount = 0;

//     for (let i = 0; i < ar.length; i++) {
//         let token = ar[i];

//         if (token === "(") {
//             parenthesisCount++;
//         } else if (token === ")") {
//             parenthesisCount--;
//             if (parenthesisCount < 0) return false;
//         } else if (is_op(token)) {
//             if (i === 0 || is_op(ar[i - 1])) return false;
//         } else if (is_number(token)) {
//             if (i > 0 && is_number(ar[i - 1])) return false;
//         }
//     }

//     return parenthesisCount === 0;
// }


// function is_number(n) {
//     if (isNaN(parseInt(n))) return false;
//     return true;
// }
// function is_op(o) {
//     if (o === "+" || o === "-" || o === "/" ||o === "*") return true;
//     return false;
// }

// Function to check if a string is a number
function isNumber(str) {
    return !isNaN(parseInt(str));
}

// Function to check if a string is an operator
function is_op(str) {
    return ['+', '-', '*', '/'].includes(str);
}

// Function to get the precedence of an operator
function getPrecedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0; // For parentheses
}

// Function to apply an operator on two numbers
function applyOperator(numStack, opStack) {
    let op = opStack.pop();
    let b = numStack.pop();
    let a = numStack.pop();

    let result;

    switch (op) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                alert("Attempt to divide by zero...");
                display.value = "0";
                return;
            }
            result = a / b;
            break;
    }

    numStack.push(result);
}

// Function to evaluate a mathematical expression
function evaluateExpression(str) {
    let tokens = str.split(' ');
    let numStack = [];
    let opStack = [];

    for (let token of tokens) {
        if (isNumber(token)) {
            numStack.push(parseInt(token));
        } else if (token === '(') {
            opStack.push(token);
        } else if (token === ')') {
            while (opStack[opStack.length - 1] !== '(') {
                applyOperator(numStack, opStack);
            }
            opStack.pop(); // Remove the '('
        } else if (is_op(token)) {
            while (opStack.length > 0 && opStack[opStack.length - 1] !== '(' && getPrecedence(opStack[opStack.length - 1]) >= getPrecedence(token)) {
                applyOperator(numStack, opStack);
            }
            opStack.push(token);
        }
    }

    while (opStack.length > 0) {
        applyOperator(numStack, opStack);
    }

    return numStack[0];
}

// Function to check if a mathematical expression is well-formed
function isWellFormed(str) {
    let tokens = str.split(' ');
    let parenthesisCount = 0;

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        if (token === '(') {
            parenthesisCount++;
        } else if (token === ')') {
            parenthesisCount--;
            if (parenthesisCount < 0) return false;
        } else if (is_op(token)) {
            if (i === 0 || is_op(tokens[i - 1])) return false;
        } else if (isNumber(token)) {
            if (i > 0 && isNumber(tokens[i - 1])) return false;
        }
    }

    return parenthesisCount === 0;
}

// Main function to handle user input
function operate(str) {
    if (!isWellFormed(str)) {
        alert("Your expression is not well formed! Please check it carefully.");
    } else {
        let result = evaluateExpression(str);
        display.value = result;
    }
}





for (let i = 0; i < input_btns.length; i++){
    input_btns[i].addEventListener("click", () => append_input(input_btns[i].textContent));
}
btn_delete.addEventListener("click", () => delete_input());
btn_clear.addEventListener("click", () => clear());
btn_equal.addEventListener("click", () => operate(display.value));