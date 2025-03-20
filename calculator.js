function operator(){
    let input = prompt('input please format: "(number) (operater) (number)"', )
    let inputArray = input.split("").join("").split(" ");
    let a = inputArray[0];
    let b = inputArray[2];
    let operatorSymbol = inputArray[1];

    function add(a,b){
        alert(parseInt(a) + parseInt(b));
      };

    function subtract(a,b){
        alert(parseInt(a) - parseInt(b));
    };

    function multiply(a,b) {
        alert(parseInt(a) * parseInt(b));
      };

    function divide(a,b){
        alert(parseInt(a) / parseInt(b));
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

operator();



