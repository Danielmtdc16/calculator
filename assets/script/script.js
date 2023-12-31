const display_results = document.querySelector(".display-results");

const current_operation_text = document.querySelector("#current-operation");
const previous_operation_text = document.querySelector("#previous-operation");

const buttons = document.querySelectorAll(".button");

class Calculator {
    saveOperation = "";
    isPercentageOperation = false;

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

    clearScreen() {
        this.current_operation = "";
        this.current_operation_text.innerText = "";
        this.previous_operation_text.innerText = "";
    }

    processOperation(operation) {
        const specialOperations = ["C", "DEL", "="];

        if (this.current_operation_text.innerText == "" && previous_operation_text.innerText == "") return;

        if (this.current_operation_text.innerText === "" && operation !== "C") {
            if (this.previous_operation_text !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        if (previous_operation_text.innerText !== "" && operation !== this.saveOperation && !specialOperations.includes(operation)) {
            if (operation === "%") {
                this.isPercentageOperation = true;
            }
            this.processOperation(this.saveOperation);
            this.isPercentageOperation = false;
            if (operation === "%") {
                return this.changeOperation(this.saveOperation);
            } else {
                this.changeOperation(operation);
                return this.saveOperation = operation;
            }
        }

        if (operation !== "=") this.saveOperation = operation;
        let resultOperation;
        const previous = +this.previous_operation_text.innerText.split(" ")[0];
        let current = +this.current_operation_text.innerText;
        
        if (this.isPercentageOperation === true) current = current / 100;

        switch(operation) {
            case "+":
                resultOperation = previous + current;
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
            case "-":
                resultOperation = previous - current;
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
            case "x":
                resultOperation = previous * current;
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
            case "/":
                resultOperation = previous / current;
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
            case "%":
                if (previous !== 0 && this.isPercentageOperation !== true) {
                    resultOperation = previous * (current / 100);
                }
                this.refreshScreen(resultOperation, operation, current, previous);
                break;
            case "C":
                this.clearScreen();
                break;
            case "DEL":
                this.current_operation = "";
                this.current_operation_text.innerText = this.current_operation_text.innerText.slice(0, -1);
                this.addNumbers(this.current_operation_text.innerText);
                break;
            case "=":
                this.processOperation(this.saveOperation);
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
            if (previous === 0) resultOperation = current;
            
            this.previous_operation_text.innerText = `${resultOperation} ${operation}`;
            this.current_operation_text.innerText = "";
            this.current_operation = "";
        }

    }

    changeOperation(operation) {
        this.saveOperation = operation;
        const operations = ["+", "-", "/", "x", "%"];

        if (!operations.includes(operation)) return;

        this.previous_operation_text.innerText = this.previous_operation_text.innerText.slice(0, -1) + operation;

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
