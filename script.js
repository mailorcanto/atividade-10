//Dados iniciais
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

//Evento Reset
document
  .querySelector(".scoreArea button")
  .addEventListener("click", resetEvent);

//Funções
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    // Criar variável para a barra de progresso baseado na divisão entre número questão atual e quantidade de questões vezes 100. Use a função Math.floor para arredondar.
    let larguraBarra = Math.floor((currentQuestion / questions.length) * 100);
    // Defina a largura da .progress--bar com o valor obtido
    document.querySelector(".progress--bar").style.width = `${larguraBarra}%`;
    // Esconda a .scoreArea
    document.querySelector(".scoreArea").style.display = "none";
    // Exiba a .questionArea
    document.querySelector(".questionArea").style.display = "block";
    // Insira em .question o valor da questão
    document.querySelector(".question").innerHTML = q.question;
    // Defina .options como ""
    document.querySelector(".options").innerHTML = "";
    // Crie uma let optionsHtml para o texto das opções
    let optionsHtml = "";
    // Faça um laço em q.options e defina o valor da optionHtml com `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`

    for (let i = 0; i < q.options.length; i++) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }
    console.log(optionsHtml);
    // Insira optionsHtml em .options
    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    // Chame a função finishQuiz
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  currentQuestion++;
  showQuestion();
}

 function finishQuiz() {
  // Criar variável de pontos baseado na divisão entre respostas corretas e quantidade de questões. Use a função Math.floor para arredondar.
  const pontos = Math.floor((correctAnswers / questions.length) * 100);

  // Implementar condicionais para inserir mensagem e cor do placar de acordo com a pontuação.
  let mensagem = ''
  let resultado = ''
  if (pontos < 50) {
    let elemento = document.querySelector(".scoreText2"); 
    mensagem = elemento.innerHTML = "Você respondeu " + questions.length + " questões e acertou " + correctAnswers + "."; 
    resultado = document.querySelector(".scoreText1");
    resultado = resultado.innerHTML = "Estude mais!";
    elemento.style.setProperty("color", "red");
    document.querySelector(".scoreText1").style.display = "block";
  } else if (pontos < 80) {
    let elemento = document.querySelector(".scoreText2");
    mensagem = elemento.innerHTML = "Você respondeu " + questions.length + " questões e acertou " + correctAnswers + "."; 
    resultado = document.querySelector(".scoreText1");
    resultado = resultado.innerHTML = "Ainda pode melhorar...";
    elemento.style.setProperty("color", "yellow");
    document.querySelector(".scoreText1").style.display = "block";
  } else {
    let elemento = document.querySelector(".scoreText2");
    mensagem = elemento.innerHTML = "Você respondeu " + questions.length + " questões e acertou " + correctAnswers + "."; 
    resultado = document.querySelector(".scoreText1");
    resultado = resultado.innerHTML = "Parabéns!";
    elemento.style.setProperty("color", "green");
    document.querySelector(".scoreText1").style.display = "block";
  }
  // Inserir a pontuação em .scorePct e o texto em .scoreText2
  document.querySelector(".scorePct").innerHTML = `${pontos}%`;
  document.querySelector(".scoreText2").innerHTML = mensagem;

  // Ocultar a .questionArea e exibir a .scoreArea
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".scoreArea").style.display = "block";

  // Deixar a .progress--bar em 100%
  document.querySelector(".progress--bar").style.width = "100%";
  console.log(pontos);
}



function resetEvent() {
  // Redefina os valores de correctAnswers e currentQuestion para 0
  correctAnswers = 0;
  currentQuestion = 0;

  // Chame a função showQuestion
  showQuestion();
}
