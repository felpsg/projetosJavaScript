const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener("reset", (e) => {
  remove_active();
  form.querySelector('button[type="reset"]').innerText = 'AC';
});

let is_operator = false;
let equation = [];

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const handleOperator = (operator) => {
  switch (operator) {
    case "%":
      output.value = parseFloat(output.value) / 100;
      break;
    case "invert":
      output.value = parseFloat(output.value) * -1;
      break;
    case "=":
      equation.push(output.value);
      output.value = eval(equation.join(""));
      equation = [];
      break;
    default:
      let last_item = equation[equation.length - 1];
      if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
        equation.pop();
        equation.push(e.target.value);
      } else {
        equation.push(output.value);
        equation.push(operator);
      }
      is_operator = true;
      break;
  }
};

operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (output.value == "0") {
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else {
      output.value = output.value + "" + e.target.value;
    }
  });
});

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");
    form.querySelector('button[type="reset"]').innerText = 'C';
    handleOperator(e.target.value);
  });
});

