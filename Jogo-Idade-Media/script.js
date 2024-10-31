alert = 'Olá, você é um grande médico da idade média e sua tarefa é diagnosticar corretamente a maior quantidade de pacientes. Está preparado para isso?'

const doencas = [
    { 
        nome: "Ergotismo", 
        sintomas: "Convulsões, alucinações, dor de cabeça intensa, delírios, psicoses.",
        tratamento: "Tratamento: Medicamentos.",
        imagem: "img/ergotismo.png"
    },
    { 
        nome: "Varíola", 
        sintomas: "Febre, erupção cutânea com bolhas, dor de cabeça, vômito.",
        tratamento: "Tratamento: Variolação.",
        imagem: "img/variola.png"
    },
    { 
        nome: "Peste Negra", 
        sintomas: "Manchas escuras, febre alta, calafrios, fadiga extrema, inchaço nas glândulas linfáticas.", 
        tratamento: "Tratamento: Sangria.",
        imagem: "img/peste.png"
    },
    { 
        nome: "Lepra", 
        sintomas: "Lesões cutâneas, fraqueza muscular, dormência nas extremidades.", 
        tratamento: "Tratamento: Isolamento.",
        imagem: "img/lepra.png"
    }
];

// Objeto para controlar a imagem usada para cada doença
const controleImagens = {
    "Ergotismo": null,
    "Varíola": null,
    "Peste Negra": null,
    "Lepra": null
};

const textosMedicos = [
    "Os dias de um médico na Idade Média eram longos e desafiadores. Diagnosticar corretamente era crucial para salvar vidas em um tempo de poucos recursos.",
    "No ambiente sombrio da Idade Média, doenças devastadoras assolavam a população, e os médicos se esforçavam para aliviar o sofrimento.",
    "Com pouca ciência e muitos mistérios, os médicos da Idade Média lutavam diariamente para entender as doenças que atormentavam as pessoas."
];

// Objeto para controlar quantas vezes cada doença apareceu
const controleDoencas = {
    "Ergotismo": 0,
    "Varíola": 0,
    "Peste Negra": 0,
    "Lepra": 0
};

let doencaAtual = {};
let doencaAnterior = null; // Para garantir que a doença anterior não se repita
let paginaAtual = 0;
let acertos = 0;
let erros = 0;
let totalPacientes = 0;
let pacienteAtual = 0;

function iniciarJogo() {
    acertos = 0;
    erros = 0;
    pacienteAtual = 0;
    totalPacientes = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
    document.getElementById("telaFinal").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";

    // Reseta o controle de frequência de doenças
    Object.keys(controleDoencas).forEach(doenca => controleDoencas[doenca] = 0);

    iniciarRodada();
}

function selecionarDoenca() {
    let doencaSelecionada;

    // Continua tentando até encontrar uma doença válida
    do {
        doencaSelecionada = doencas[Math.floor(Math.random() * doencas.length)];
    } while (
        doencaSelecionada.nome === doencaAnterior ||  // Verifica se não é a mesma da rodada anterior
        controleDoencas[doencaSelecionada.nome] >= 2  // Verifica se já apareceu 2 vezes
    );

    return doencaSelecionada;
}

function iniciarRodada() {
    if (pacienteAtual < totalPacientes) {
        doencaAtual = selecionarDoenca();
        controleDoencas[doencaAtual.nome]++;  // Aumenta o contador para a doença atual
        doencaAnterior = doencaAtual.nome;    // Armazena a doença atual para a próxima verificação

        // Seleciona aleatoriamente uma imagem que ainda não foi usada na rodada anterior
        let imagemAleatoria;

        do {
            imagemAleatoria = Math.random() < 0.5 
                ? doencaAtual.imagem 
                : doencaAtual.imagem.replace(".png", "2.png");
        } while (imagemAleatoria === controleImagens[doencaAtual.nome]); // Garante que a imagem não se repita

        // Armazena a imagem usada para a doença atual
        controleImagens[doencaAtual.nome] = imagemAleatoria;

        document.getElementById("imagem").src = imagemAleatoria;
        document.getElementById("sintomas").textContent = doencaAtual.sintomas;

        // Exibe a imagem correspondente à doença atual
        document.getElementById("imagem-paciente").src = imagemAleatoria;
    } else {
        finalizarRodada();
    }
}

function atualizarPaginaLivro() {
    const paginaDoenca = document.getElementById("paginaDoenca");
    paginaDoenca.innerHTML = `
        <h3>${doencas[paginaAtual].nome}</h3>
        <p>${doencas[paginaAtual].sintomas}</p>
        <h3>${doencas[paginaAtual].tratamento}</h3>
    `;
}

document.getElementById("livro").addEventListener("click", function() {
    const modal = document.getElementById("modalLivro");
    atualizarPaginaLivro();
    modal.style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modalLivro").style.display = "none";
});

document.getElementById("proximo").addEventListener("click", function() {
    paginaAtual = (paginaAtual + 1) % doencas.length;
    atualizarPaginaLivro();
});

document.getElementById("anterior").addEventListener("click", function() {
    paginaAtual = (paginaAtual - 1 + doencas.length) % doencas.length;
    atualizarPaginaLivro();
});

function verificarDiagnostico(escolha) {
    if (doencas[escolha].nome === doencaAtual.nome) {
        acertos++;
    } else {
        erros++;
    }
    pacienteAtual++;
    iniciarRodada();
}

document.getElementById("doenca1").addEventListener("click", function() { verificarDiagnostico(0); });
document.getElementById("doenca2").addEventListener("click", function() { verificarDiagnostico(1); });
document.getElementById("doenca3").addEventListener("click", function() { verificarDiagnostico(2); });
document.getElementById("doenca4").addEventListener("click", function() { verificarDiagnostico(3); });

function finalizarRodada() {
    const textoFinal = `
        Você diagnosticou ${totalPacientes} pacientes!
        Acertos: ${acertos} | 
        Erros: ${erros}
    `;

    const historiaFinal = `
    ${textosMedicos[Math.floor(Math.random() * textosMedicos.length)]}
    `
    document.getElementById("textoFinal").innerHTML = textoFinal;
    document.getElementById("historiaFinal").innerHTML = historiaFinal;
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("telaFinal").style.display = "flex";
}

document.getElementById("novoJogo").addEventListener("click", iniciarJogo);

window.onload = iniciarJogo;