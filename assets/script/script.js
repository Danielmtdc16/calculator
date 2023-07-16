const display_results = document.querySelector(".display-results");

const current_operation = document.querySelector(".current-operation");
const previous_operation = document.querySelector(".previous-operation");

const buttons = document.querySelectorAll(".button");

class Calculator {
    constructor(){

    }
}

buttons.forEach(btn => {

    btn.addEventListener("click", () => {
        const value = btn.textContent;
        
        if (+value >= 0 || value === ",") {

        } else {

        }
    });

});

function clearScreen() {
    current_operation.innerHTML = "";
    previous_operation.innerHTML = "";
}