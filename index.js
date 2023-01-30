// Save input variable
const input = document.getElementById('input');

// Save buttons to an array
const buttons = Array.from(document.getElementsByClassName('btn'));

// Map event listeners to each button and respond to button value
buttons.map(button => {
  button.addEventListener('click', (e) => {
    switch (e.target.innerText) {
      case 'AC':
        input.innerText = '';
        break;
      case '=':
        try {
          // ! eval() is a security risk on user-facing applications
          input.innerText = eval(input.innerText);
        } catch {
          input.innerText = 'Error';
        }
        break;
      case 'C':
        if (input.innerText) {
          input.innerText = input.innerText.slice(0, -1);
        }
        break;
      default:
        input.innerText += e.target.innerText;
    }
  });
});