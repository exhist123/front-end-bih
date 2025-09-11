const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value') || button.textContent;

        if (value === 'AC') {
            expression = '';
            display.value = '';
        } else if (value === 'DEL') {
            expression = expression.slice(0, -1);
            display.value = expression;
        } else if (value === '=') {
            try {
                let exp = expression
                    .replace(/π/g, 'Math.PI')
                    .replace(/e/g, 'Math.E')
                    // Replace all trig functions with degree conversion
                    .replace(/sin\(([^()]*)\)/g, (match, p1) => `Math.sin((${p1})*Math.PI/180)`)
                    .replace(/cos\(([^()]*)\)/g, (match, p1) => `Math.cos((${p1})*Math.PI/180)`)
                    .replace(/tan\(([^()]*)\)/g, (match, p1) => `Math.tan((${p1})*Math.PI/180)`)
                    .replace(/log\(/g, 'Math.log10(')
                    .replace(/ln\(/g, 'Math.log(')
                    .replace(/sqrt\(/g, 'Math.sqrt(')
                    .replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)')
                    .replace(/(\d+)\^2/g, 'Math.pow($1,2)');

                // For xʸ button (^) - replace a^b with Math.pow(a,b)
                exp = exp.replace(/([0-9.]+)\^([0-9.]+)/g, 'Math.pow($1,$2)');

                let result = eval(exp);
                // Optional: round to 6 decimal places for display
                if (typeof result === "number") {
                    result = Math.round(result * 1e6) / 1e6;
                }
                display.value = result;
                expression = result.toString();
            } catch (err) {
                display.value = 'Error';
                expression = '';
            }
        } else if (value === 'x²') {
            expression += '^2';
            display.value = expression;
        } else if (value === 'xʸ' || value === '^') {
            expression += '^';
            display.value = expression;
        } else if (value === '√') {
            expression += 'sqrt(';
            display.value = expression;
        } else {
            expression += value;
            display.value = expression;
        }
    });
});