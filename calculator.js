let number1 = 0;
let number2 = 0;
let operatorSymbol = '';

function calculate(){

     let a = parseFloat(number1);
     let b = parseFloat(number2);
     let result;

     switch (operatorSymbol) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "×": result = a * b; break;
        case "÷": result = b !== 0 ? a / b : "Error"; break;
        default: return;
    }
    if (result == "Error"){
        inputField.value = "Error, Cant divide by 0.";
    }
    else{
        inputField.value = Math.round(result*100000)/100000;
    }
    
}


const inputField = document.querySelector("#input-display");
const outputField = document.querySelector("#output-display");
const btns = document.querySelectorAll("button.numbers");
const operators = document.querySelectorAll("button.operators");
const equalsBtn = document.getElementById("btn-equals");
const backspace = document.getElementById("backspace");
const allClear = document.getElementById("allClear");

let buttoncount = 0;
let buttonclicked = '';
function buttonCount(event) {
    if (buttonclicked != event.target.innerText){
        buttoncount = 0;
        buttonclicked = event.target.innerText;
    }
    buttonclicked = event.target.innerText;
    buttoncount += 1;
    console.log(buttoncount);
};

function updateInputBox(event) {
    operators.forEach(operator => {
        if (operator.classList.contains("activated") && number1 !== '' && inputField.value == number1 && buttoncount < 1) {
            inputField.value = '';
        }
        if (!operator.classList.contains("activated") && number1 !== '' && number2 !== '') {
            outputField.innerHTML = '';
            inputField.value = '';
            number2 = '';
        }
    });

    if (equalsBtn.classList.contains("activated") && number2 === '') {
        number2 = '';
        inputField.value = '';
    }

        // prevent "." from being entered twice
        if (event.target.textContent === '.') {
                if (event.target.textContent === '.' && inputField.value.includes('.')) return;
                inputField.value.substring(0, inputField.value.length - 1);
        }

    equalsBtn.classList.remove("activated");
    inputField.value += event.target.innerText;
}

// Loop through each button and add event listener
btns.forEach(btn => {
    btn.addEventListener("click", updateInputBox);
    btn.addEventListener("click", buttonCount);
});

function onPressBackspace() {
    if(number1 != '' && number2 != ''){
        outputField.innerHTML = '';
        return false;
    }
    if(number1 == '' || number1 != '' && inputField.value.length != 0){
        inputField.value = inputField.value.substring(0, inputField.value.length - 1); 
    }
}

backspace.addEventListener("click", onPressBackspace);

function onPressAllClear(){
    outputField.innerHTML = '';
    inputField.value = '';
    number1 = '';
    number2 = '';
}

allClear.addEventListener("click", onPressAllClear);


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        operator.classList.add("activated");
        buttoncount = 0;

        // If no input exists, do nothing
        if (inputField.value == "Error, Cant divide by 0." ||!inputField.value.trim() && !number1 && !number2) return;

        const opText = operator.textContent;

        // Handle equals button `=`
        if (opText === "=") {
            if (!equalsBtn.classList.contains("activated") && number2) {
                equalsBtn.classList.add("activated");
                removeOperatorActivation();
                number2 = inputField.value;
                outputField.innerHTML += ` ${number2} =`;
                calculate();
                return;
            }

            if (equalsBtn.classList.contains("activated") && inputField.value) {
                equalsBtn.classList.add("activated");
                removeOperatorActivation();

                // Update number1 if a calculation was already performed
                if (number2) {
                    number1 = inputField.value;
                } else {
                    number2 = inputField.value;
                }
                outputField.innerHTML = `${number1} ${operatorSymbol} ${number2} =`;
                calculate();
                return;
            }
        }

        // If an operator is pressed after `=`, reset calculation
        if (equalsBtn.classList.contains("activated")) {
            removeOperatorActivation();
            operatorSymbol = opText;
            number1 = inputField.value;
            number2 = "";
            outputField.innerHTML = `${number1} ${operatorSymbol}`;
            return;
        }

        // Prevent dividing by zero
        if (opText === "=" && operatorSymbol && number2 == 0) {
            removeOperatorActivation();
            equalsBtn.classList.add("activated");
            number2 = inputField.value || number1;
            outputField.innerHTML += ` ${number2} =`;
            calculate();
            return;
        }

        // Handle standard operator selection
        number1 = inputField.value;
        operatorSymbol = opText;
        outputField.innerHTML = `${number1} ${operatorSymbol}`;

        console.log(`number1 = ${number1}, operatorSymbol = ${operatorSymbol}, number2 = ${number2}`);
    });
});

// function to remove activation from non-equals operators
function removeOperatorActivation() {
    operators.forEach(button => {
        if (button.textContent !== "=") {
            button.classList.remove("activated");
        }
    });
}