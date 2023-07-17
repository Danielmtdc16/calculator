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

    addNumbers(number) {
        this.current_operation += number;
        this.refreshScreen();
    }

    refreshScreen() {
        this.current_operation_text.innerText = this.current_operation;
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
        
        if (+value >= 0 || value === ",") {
            calculator.addNumbers(value)
        } else {
            if (value === "C") calculator.clearScreen();
            
        }
    });

});

