document.addEventListener("DOMContentLoaded", () => {
  // Esperar o DOM carregar -->
  const inputEntrada = document.getElementById("entrada");
  const btnCalcula = document.getElementById("btnCalcula");
  const btnLimpar = document.getElementById("btnLimpar");
  const visualizaDados = document.querySelector(".visualiza-dados");
  const alerta = document.getElementById("alerta-personalizado");
  const mensagemAlerta = document.getElementById("alerta-mensagem");
  const botaoAlerta = document.getElementById("alerta-botao");

  botaoAlerta.addEventListener("keydown", ocultarAlerta);
  botaoAlerta.addEventListener("click", ocultarAlertaClick);
  btnCalcula.addEventListener("keydwn", calcularIdadeDetalhadaKeydown);

  btnCalcula.addEventListener("click", () => {
    const entrada = inputEntrada.value.trim();

    const padrao = /^\d{2}\/\d{2}\/\d{4}$/; // Regex para dd/mm/aaaa
    const dataValida = padrao.test(entrada); // true se bate com o padrão

    if (!dataValida) {
      mostrarAlerta("⚠️ Digite uma data válida, aaaa-mm-dd");
      botaoAlerta.focus();
      return;
    }

    const nascimento = entrada.replace(/\//g, "-");
    const resultado = calcularIdadeDetalhada(nascimento);
    visualizaDados.style.display = "block"; // continua escondido
    visualizaDados.innerHTML = `       
        <h3>📊 Resultado</h3>
        <p>🗓️ Você nasceu em: <strong>${formatarData(nascimento)}</strong></p>
        <p>👶 Idade: <strong>${resultado.anos}</strong> anos,
                     <strong>${resultado.meses}</strong> meses e
                     <strong>${resultado.dias}</strong> dias de vida.</p>
        <p>📅 Total de dias vividos: <strong>${
          resultado.diasTotais
        }</strong></p>
      `;
  });

  function mostrarAlerta(mensagem) {
    mensagemAlerta.textContent = mensagem;
    alerta.style.display = "flex"; // Mostra o alerta
  }

  function ocultarAlertaClick() {
    alerta.style.display = "none"; // ocutar o alerta
  }

  function ocultarAlerta(e) {
    console.log(e);
    if (e.key === "Enter") {
      alerta.style.display = "none"; // Oculta o alerta
    }
  }

  btnLimpar.addEventListener("click", () => {
    visualizaDados.innerHTML = "";
    inputEntrada.value = "";
    inputEntrada.focus;
    visualizaDados.style.display = "none"; // continua escondido
  });
});

function calcularIdadeDetalhada(nascimento) {
  const [dia, mes, ano] = nascimento.split("-"); // separa os valores
  const dataFormatada = new Date(`${ano}/${mes}/${dia}`);

  const dataNascimento = new Date(nascimento);
  const hoje = new Date();

  let anos = hoje.getFullYear() - dataFormatada.getFullYear();
  let meses = hoje.getMonth() - dataFormatada.getMonth();
  let dias = hoje.getDate() - dataFormatada.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      0
    ).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const diferencaMs = hoje - dataFormatada;
  const diasTotais = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)) / 1000;

  return { anos, meses, dias, diasTotais };
}

//Evento do botão calcular: keydown
function calcularIdadeDetalhadaKeydown(nascimento) {
  const dataNascimento = new Date(nascimento);
  const hoje = new Date();

  let anos = hoje.getFullYear() - dataFormatada.getFullYear();
  let meses = hoje.getMonth() - dataFormatada.getMonth();
  let dias = hoje.getDate() - dataFormatada.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      0
    ).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const diferencaMs = hoje - dataFormatada;
  const diasTotais = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)) / 1000;

  return { anos, meses, dias, diasTotais };
}

function formatarData(dataStr) {
  const entrada = dataStr; // exemplo
  const [dia, mes, ano] = entrada.split("-"); // separa os valores
  const dataFormatada = new Date(`${ano}-${mes}-${dia}`); // converte para yyyy-mm-dd

  return `${dia}/${mes}/${ano}`;
}

function mascaraData(campo, e) {
  var kC = document.querySelectorAlll ? e.keyCode : e.keyCode;
  var data = campo.value;

  if (kC != 8 && kC != 46) {
    if (data.length == 2) {
      campo.value = data += "/";
    } else if (data.length == 5) {
      campo.value = data += "/";
    } else campo.value = data;
  }
}

