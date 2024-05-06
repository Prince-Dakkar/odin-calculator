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

function operate(str) {
    if (!is_well_formed(str)){
        alert("Your expression is not well formed! Please check it carefully.");
    } else {
        let ar = str.split(" ");
        let ans = parseInt(ar[0]);

        for(let i = 1; i < ar.length; i += 2) {
            let op = ar[i];
            let num = parseInt(ar[i+1]);

            if (op === "+") {
                ans += num;
            } else if (op === "-"){
                ans -= num;
            } else if (op === "*"){
                ans *= num;
            } else if (op === "/") {
                if (num == 0) {
                    alert("Attempt to divide by zero...");
                    display.value = "0";
                    return;
                } else {
                    ans /= num;
                }
            } else {
                alert("Your expression is not well formed! Please check it carefully.");
            }
        }
        display.value = ans;
    }
}

function is_well_formed(str) {
    let ar = str.split(" ");
    if (ar.length % 2 === 0) return false;

    for(let i = 0; i < ar.length; i++) {
        if (i % 2 == 0) {
            if(!is_number(ar[i])) return false;
        } else {
            if(!is_op(ar[i])) return false;
        }
    }
    return true;
}

function is_number(n) {
    if (isNaN(parseInt(n))) return false;
    return true;
}
function is_op(o) {
    if (o === "+" || o === "-" || o === "/" ||o === "*") return true;
    return false;
}

for (let i = 0; i < input_btns.length; i++){
    input_btns[i].addEventListener("click", () => append_input(input_btns[i].textContent));
}
btn_delete.addEventListener("click", () => delete_input());
btn_clear.addEventListener("click", () => clear());
btn_equal.addEventListener("click", () => operate(display.value));