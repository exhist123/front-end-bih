const display = document.querySelector(".display");
//Selects the first DOM element that has the class "display"
const buttons = document.querySelectorAll("button");
//Selects all <button> elements on the page
const specialChars = ["+", "-", "*", "/", "%", "="];
//Array of operation characters used in calculations
let output = "";
//Variable to store the current input/output of the calculator

const calculate = (btnvalue) => {
    //declares an arrow function named calculate that takes btnvalue as a parameter
    display.focus();
    //Sets focus to the display element so the cursor is active there
    if (btnvalue === "=" && output !== "") {
        //If the "=" button is clicked and output is not empty, evaluate the expression
        output = eval(output.replace("%", "/100"));
        //Replaces "%" with "/100" for percentage calculations and evaluates the expression
    } else if (btnvalue === "AC") {
        //If the AC btn is clicked, clear the output
        output = "";
        //Reset output to an empty string
    } else if (btnvalue === "DEL") {
        //If the DEL btn is clicked, remove the last character from output
        output = output.toString().slice(0, -1);
        //Convert output to string and remove the last character
    } else {
        //if output is empty and btn is a special char then return
        if (output === "" && specialChars.includes(btnvalue)) return;
        //if the last character in output is a special char and btn is also a special char then return
        output += btnvalue;
        //Append the clicked button's value to output
    }
    display.value = output;
    //Update the display's value to reflect the current output
};
//Adding event listeners to buttons, call calculate() on click
buttons.forEach((button) => {
    //btn click listener calls calculate function with dataset value
    button.addEventListener("click", (e) => calculate(e.target.dataset.value))
});