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
    else if (operatorSymbol == '*'){
        multiply(a,b);
    }
    else if (operatorSymbol == '/'){
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
    if (equalsBtn.classList == "operators activated" && number2 == ''){
        outputField.innerHTML = '';
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
    if(number1 == '' || number1 != '' && inputField.value.length != 0){
        inputField.value = inputField.value.substring(0, inputField.value.length - 1); 
    }
    if(number1 != '' && number2 != ''){
        outputField.innerHTML = '';
    }
    
}

backspace.addEventListener("click", onPressBackspace);

operaters.forEach(operater => {
    operater.addEventListener("click", () => {
                if (operater.id == '=' && !equalsBtn.classList.contains("activated") && number2 != ''){
                    equalsBtn.classList.add("activated");
                    number2 = inputField.value;
                    outputField.innerHTML += ' ' + number2 + ' ' + '=';
                    operator()
                    return false;
                }
                if (operater.id == '=' && equalsBtn.classList.contains("activated")){
                    number1 = inputField.value;
                    outputField.innerHTML = number1 + ' ' + operatorSymbol + ' ' + number2 + ' ' + '=';
                    console.log(operatorSymbol);
                    operator()
                    return false;
                }
                if (equalsBtn.classList.contains("activated")){
                    operatorSymbol = operater.id;
                    number1 = inputField.value;
                    outputField.innerHTML = number1 + ' ' + operater.textContent;
                    console.log(number2);
                    return false;
                }
                if(operater.id == '=' && operatorSymbol != '' && number2 == 0){
                    equalsBtn.classList.add("activated");
                    number2 = number1;
                    outputField.innerHTML += ' ' + number2 + ' ' + '=';
                    operator();
                    return false;
                }
                if (number1 != '' && number2 == ''){
                    return false;
                }
            number1 = inputField.value;
            operatorSymbol = operater.id;
            inputField.value = '';
            outputField.innerHTML = number1 + ' ' + operater.textContent;
            console.log("number1 =" + number1);
            console.log("operatorsymbol=" + operatorSymbol);
            console.log("number2 =" + number2);
            console.log(inputField.value);}
        );
});
