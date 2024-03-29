const form = document.getElementById("calc-form");
form.addEventListener("submit", (e) => e.preventDefault());

const output = document.getElementById("output");
const operands = document.querySelectorAll("button[data-type=operand]");
const operators = document.querySelectorAll("button[data-type=operator]");
const clearBtn = document.querySelector("button[data-type=clear]");

let isOperator = false;

const removeActive = () => {
  operators.forEach((btn) => btn.classList.remove("active"));
};

operands.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    if (output.value == "0" || isOperator) {
      isOperator = false;
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value += e.target.value.replace(".", "");
    } else {
      output.value += e.target.value;
    }
    clearBtn.textContent = "C";
  });
});

let equation = [];
operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value /= 100;
        break;
      case "invert":
        output.value *= -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        break;
      default:
        let lastItem = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(lastItem) && isOperator) {
          equation.pop();
        }
        equation.push(output.value, e.target.value);
        isOperator = true;
        break;
    }
  });
});

clearBtn.addEventListener("click", (e) => {
  output.value = "0";
  if (clearBtn.textContent === "C") {
    clearBtn.textContent = "AC";
  } else {
    removeActive();
    equation = [];
  }
});
