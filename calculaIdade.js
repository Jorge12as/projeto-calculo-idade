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
    const dataValida = validaData(entrada);

    if (!dataValida) {
      mostrarAlerta("⚠️ Digite uma data válida, dd/mm/aaaa");
      inputEntrada.focus();
      botaoAlerta.focus();
      return;
    }

    const dataNascimento = entrada.replace(/\//g, "-");
    const resultado = calcularIdadeDetalhada(dataNascimento);
    visualizaDados.style.display = "block"; // continua escondido

    visualizaDados.innerHTML = `       
        <h3>📊 Resultado</h3>
        <p>🗓️ Você nasceu em: <strong>${formatarData(
          dataNascimento
        )}</strong></p>
        <p>👶 Idade: <strong>${resultado.anos}</strong> anos,
                     <strong>${resultado.meses}</strong> meses e
                     <strong>${resultado.dias}</strong> dias de vida.</p>
        <p>📅 Total de dias vividos: <strong>${
          resultado.diasTotais
        }</strong></p>
      `;
  });

  function validaData(data) {
    if (typeof data !== "string") return false;

    const padrao =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(1\d{3}|2\d{3})$/; // Regex para dd/mm/aaaa
    const padraoValido = padrao.test(data); // true se bate com o padrão

    const partes = data.split("/");
    if (partes.length !== 3) return false;

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    const dataA = new Date(ano, mes - 1, dia);

    // Verifica se a data é válida (evita 31/04, 30/02, etc)
    return (
      dataA.getFullYear() == Number(ano) &&
      dataA.getMonth() + 1 == Number(mes) &&
      dataA.getDate() == Number(dia)
    );
  }

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
  try {
    const [dia, mes, ano] = nascimento.split("-"); // separa os valores
    const dataFormatada = new Date(`${ano}/${mes}/${dia}`);

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
  } catch (error) {
    error.mensagem;
  }
}

//Evento do botão calcular: keydown
function calcularIdadeDetalhadaKeydown(nascimento) {
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

