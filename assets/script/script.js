const display_results = document.querySelector(".display-results");

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