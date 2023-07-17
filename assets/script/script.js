const display_results = document.querySelector(".display-results");

const current_operation_text = document.querySelector("#current-operation");
const previous_operation_text = document.querySelector("#previous-operation");

const buttons = document.querySelectorAll(".button");

class Calculator {
    constructor(previous_operation_text, current_operation_text){
        this.previous_operation_text = previous_operation_text;
        this.current_operation_text = current_operation_text;
        this.current_operation = "";
    }

    addNumbers(digit) {
        if (digit === "." && this.current_operation_text.innerText.includes(".")){
            return;
        } 
        this.current_operation += digit;
        this.refreshScreen();
    }

    addition(num1, num2) {
        return num1 + num2;
    }
    
    processOperation(operation) {
        
        let resultOperation;
        const previous = +this.previous_operation_text.innerText.split(" ")[0];
        const current = +this.current_operation_text.innerText;

        switch(operation)
         {
            case "+":
                resultOperation = previous + current;
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
                
            default:
                return;
        }
    }

    refreshScreen(resultOperation = null, operation = null, current = null, previous = null) {
        console.log(resultOperation, operation, current, previous);

        if (resultOperation === null) {
            this.current_operation_text.innerText = this.current_operation;
        }
        else {
            if (previous === 0) {
                resultOperation = current;
            }
            this.previous_operation_text.innerText = `${resultOperation} ${operation}`;
            this.current_operation = "";
        }

    }

    clearScreen() {
        this.current_operation = "";
        this.current_operation_text.innerText = "";
        this.previous_operation_text.innerText = "";
    }
}

const calculator = new Calculator(previous_operation_text, current_operation_text);

buttons.forEach(btn => {

    btn.addEventListener("click", () => {
        const value = btn.textContent;
        
        if (+value >= 0 || value === ".") {
            calculator.addNumbers(value);
        } else {
            calculator.processOperation(value);
        }
    });

});

