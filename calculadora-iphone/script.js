const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener("reset", (e) => {
  form.querySelector('button[type="reset"]').innerText = 'AC';
  output.value = "0";
  equation = [];
  isOperator = false;
  removeActiveClasses();
});

let isOperator = false;
let equation = [];

const removeActiveClasses = () => {
  operatorBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const handleOperator = (operator) => {
  switch (operator) {
    case "=":
      equation.push(output.value);
      // Verificar se a equação possui pelo menos dois itens
      if (equation.length < 2) {
        output.value = "Error";
      } else {
        // Verificar se a equação possui uma divisão por 0
        for (let i = 0; i < equation.length - 1; i++) {
          if (equation[i] === "/" && equation[i + 1] === "0") {
            output.value = "Error";
            equation = [];
            return;
          }
        }
        try {
          output.value = eval(equation.join(""));
        } catch (e) {
          output.value = "Error";
        }
      }
      // Adicionar código para limpar o output ou adicionar verificação para não concatenar
      if (equation.length === 0) { output.value = e.target.value; } else { output.value = output.value + e.target.value; }
      equation = [];
      return;
    default:
      let lastItem = equation[equation.length - 1];
      if (Number.isFinite(lastItem) && !Number.isInteger(lastItem)) {
        equation.pop();
        equation.push(lastItem + operator);
      }
      else if (["/", "*", "+", "-"].includes(lastItem) && isOperator) {
        equation.pop();
        equation.push(operator);
        return;
      }
      else if (output.value === "" || ["/", "*", "+", "-"].includes(lastItem)) {
        return;
      }
      else {
        equation.push(output.value);
        equation.push(operator);
      }
      isOperator = true;

      break;
  }
};

operandBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActiveClasses();
    if (output.value === "0" || isOperator) {
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      // Verificar se o último caractere da string é um ponto flutuante
      let lastChar = output.value.slice(-1);
      if (Number.isFinite(lastChar) && !Number.isInteger(lastChar)) {
        // Se for, adicionar o novo dígito depois do ponto
        output.value = output.value + e.target.value.replace(".", "");
      } else {
        // Se não for, adicionar o ponto e o novo dígito
        output.value = output.value + e.target.value;
      }
    } else {
      output.value = output.value + e.target.value;
    }
    isOperator = false;
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActiveClasses();
    e.currentTarget.classList.add("active");
    form.querySelector('button[type="reset"]').innerText = 'C';
    handleOperator(e.target.value);
  });
});
