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

function updateInputBox(event) {
    inputField.value += event.target.id;  // Get the id of the clicked button
}

// Loop through each button and add event listener
btns.forEach(btn => {
    btn.addEventListener("click", updateInputBox);
});

operaters.forEach(operater => {
    operater.addEventListener("click", () => {
                if (operater.id == '='){
                    number2 = inputField.value;
                    outputField.innerHTML += ' ' + number2 + ' ' + '=';
                    operator()
                    return false;
                }
            number1 = inputField.value;
            operatorSymbol = operater.id;
            inputField.value = '';
            outputField.innerHTML = number1 + ' ' + operater.textContent;
            console.log(number1);
            console.log(operatorSymbol);
            console.log(inputField.value);}
        );
});
