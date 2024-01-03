const display = document.getElementById("display");
const buttons = Array.from(document.getElementsByClassName("btn"));

let acc = "",
  currentValue = "",
  operator = "";
let isDisplayActive = false;

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    const keyValue = e.target.innerText;
    if (Number(keyValue) || keyValue === ".") {
      if (isDisplayActive) {
        display.innerText += keyValue;
      } else {
        isDisplayActive = true;
        display.innerText = keyValue;
      }
    } else if (keyValue.match(/[\+\-x\/]/)) {
      isDisplayActive = false;
      acc = display.innerText;
      operator = keyValue;
    } else if (keyValue === "=") {
      isDisplayActive = false;
      if (!currentValue) {
        currentValue = display.innerText;
      }
      switch (operator) {
        case "+":
          display.innerText = Number(acc) + Number(currentValue);
          break;
        case "-":
          display.innerText = Number(acc) - Number(currentValue);
          break;
        case "x":
          display.innerText = Number(acc) * Number(currentValue);
          break;
        case "/":
          display.innerText = Number(acc) / Number(currentValue);
          break;
      }
      acc = display.innerText;
      isDisplayActive = false;
    } else if (keyValue === "CE") {
      isDisplayActive = false;
      display.innerText = "0";
    } else if (keyValue === "C") {
      isDisplayActive = false;
      display.innerText = "0";
      acc = "";
      currentValue = "";
      operator = "";
    }
  });
});
