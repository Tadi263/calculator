let number1 = 0;
let number2 = 0;
let operatorSymbol = '';

function operator(){

     let a = number1;
     let b = number2;

    function add(a,b){
        inputField.value = (parseInt(a) + parseInt(b));
        console.log(parseInt(a) + parseInt(b));
      };

    function subtract(a,b){
        inputField.value = (parseInt(a) - parseInt(b));
        console.log(parseInt(a) - parseInt(b));
    };

    function multiply(a,b) {
        inputField.value = (parseInt(a) * parseInt(b));
        console.log(parseInt(a) * parseInt(b));
      };

    function divide(a,b){
        inputField.value = (parseInt(a) / parseInt(b));
        console.log(parseInt(a) / parseInt(b));
    };

    if (operatorSymbol == '+'){
        add(a,b);
    }
    else if (operatorSymbol == '-'){
        subtract(a,b);
    }
    else if (operatorSymbol == '×'){
        multiply(a,b);
    }
    else if (operatorSymbol == '÷'){
        divide(a,b);
    }
}


const btns = document.querySelectorAll('button[class~="numbers"]');

const inputField = document.querySelector('#input-display');

const outputField = document.querySelector('#output-display');

const operaters =  document.querySelectorAll('button[class~="operators"]');

const equalsBtn = document.getElementById("=");

const backspace = document.getElementById("backspace");

function updateInputBox(event) {
    operaters.forEach(operater => {
        if (operater.classList.contains("activated") && number1 != '' && inputField.value == number1) {
            inputField.value = '';
        }
        if (!operater.classList.contains("activated") && number1 != '' && number2 != '') {
            outputField.innerHTML = '';
            inputField.value = '';
            number2 = '';
        }
    });
    if (equalsBtn.classList == "operators activated" && number1 != '' && number2 == ''){
        number2 = '';
        inputField.value = '';
    }
    if (equalsBtn.classList == "operators activated" && number2 == ''){
        number2 = '';
        inputField.value = '';
    }
    equalsBtn.classList.remove("activated");
    inputField.value += event.target.id;  // Get the id of the clicked button
}

// Loop through each button and add event listener
btns.forEach(btn => {
    btn.addEventListener("click", updateInputBox);
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

operaters.forEach(operater => {
    operater.addEventListener("click", () => {
        operater.classList.add("activated");
                if (operater.id == '=' && !equalsBtn.classList.contains("activated") && number2 != ''){
                    equalsBtn.classList.add("activated");
                    operaters.forEach(button => {
                        if (button.id !== '=') {
                            button.classList.remove('activated');
                        }
                    });
                    number2 = inputField.value;
                    outputField.innerHTML += ' ' + number2 + ' ' + '=';
                    operator()
                    return false;
                }
                if (operater.id == '=' && equalsBtn.classList.contains("activated") && inputField.value != '') {
                    equalsBtn.classList.add("activated");
                    operaters.forEach(button => {
                        if (button.id !== '=') {
                            button.classList.remove('activated');
                        }
                    });
                    
                    // If number2 is already set (after a calculation), use number1 for the next calculation
                    if (number2 != '') {
                        number1 = inputField.value;  // Update number1 with the new input value
                        outputField.innerHTML = number1 + ' ' + operatorSymbol+ ' ' + number2 + ' ' + '=';  // Update output display
                    } else {
                        // If number2 is not set, it means it's the first calculation, so we use the current value of number1
                        number2 = inputField.value;  // Set number2 as input value
                        outputField.innerHTML = number1 + ' ' + operatorSymbol+ ' ' + number2 + ' ' + '=';   // Continue output display
                    }
                    
                    operator();  // Perform the operation with the updated numbers
                    return false;
                }
                if (operater.id == '=' && equalsBtn.classList.contains("activated")){
                    operaters.forEach(button => {
                        if (button.id !== '=') {
                            button.classList.remove('activated');
                        }
                    });
                    number1 = inputField.value;
                    outputField.innerHTML = number1 + ' ' + operatorSymbol + ' ' + number2 + ' ' + '=';
                    console.log(operatorSymbol);
                    operator()
                    return false;
                }
                if (equalsBtn.classList.contains("activated")){
                    operaters.forEach(button => {
                        if (button.id !== '=') {
                            button.classList.remove('activated');
                        }
                    });
                    operatorSymbol = operater.id;
                    number1 = inputField.value;
                    number2 = '';
                    outputField.innerHTML = number1 + ' ' + operater.textContent;
                    console.log(number2);
                    return false;
                }
                if(operater.id == '=' && operatorSymbol != '' && number2 == 0){
                    operaters.forEach(button => {
                        if (button.id !== '=') {
                            button.classList.remove('activated');
                        }
                    });
                    equalsBtn.classList.add("activated");
                    number2 = inputField.value || number1;
                    outputField.innerHTML += ' ' + number2 + ' ' + '=';
                    operator();
                    return false;
                }
                if (outputField.innerHTML = ''){
                    return false;
                }
            number1 = inputField.value;
            operatorSymbol = operater.id;
            outputField.innerHTML = number1 + ' ' + operater.textContent;
            console.log("number1 =" + number1);
            console.log("operatorsymbol=" + operatorSymbol);
            console.log("number2 =" + number2);
            console.log(inputField.value);}
        );
});