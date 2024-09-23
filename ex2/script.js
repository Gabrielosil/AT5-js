/*Avaliação 2 - Houve um vestibular para ingresso de alunos na instituição baseado em 5 matérias: Natureza, Humanas, Linguagens, Matemática e Redação com notas de 0 a 1000. Precisa-se de um sistema que cadastre o nome completo, número de inscrição, ano de nascimento e as matérias com as notas dos vestibulandos de 5 até 20 pessoas.

A mensagem “Aprovado”, nas matérias acima de 550; A mensagem “Reprovado”, nas matérias abaixo de 400; A mensagem “Recuperação”, nas matérias entre 401 e 549.

Exiba todos os dados cadastrados e os seus resultados na página HTML.

Regras

Todos os campos devem ser válidos e cumprir os requisitos mínimos de validação.
Os anos de nascimento ficam entre 1901 e 2007.
Número de Inscrição tem 10 dígitos sendo que deve começar com 2024XXXXXX.*/

let vestibulandos = [];

function cadastrarVestibulando() {
    if (vestibulandos.length >= 20) {
        alert("Limite de 20 vestibulandos alcançado.");
        return;
    }

    const nome = prompt("Informe o nome completo:");
    const inscricao = prompt("Informe o número de inscrição (2024XXXXXX):");
    const nascimento = parseInt(prompt("Informe o ano de nascimento (1901-2007):"));

    if (!isValidNome(nome) || !isValidInscricao(inscricao) || !isValidNascimento(nascimento)) {
        alert("Dados inválidos. Tente novamente.");
        return;
    }

    const notas = {
        natureza: getNota("Natureza"),
        humanas: getNota("Humanas"),
        linguagens: getNota("Linguagens"),
        matematica: getNota("Matemática"),
        redacao: getNota("Redação")
    };

    const resultados = {
        natureza: getResultado(notas.natureza),
        humanas: getResultado(notas.humanas),
        linguagens: getResultado(notas.linguagens),
        matematica: getResultado(notas.matematica),
        redacao: getResultado(notas.redacao)
    };

    vestibulandos.push({ nome, inscricao, nascimento, notas, resultados });
}

function getNota(materia) {
    let nota;
    do {
        nota = parseInt(prompt(`Informe a nota em ${materia} (0 a 1000):`));
        if (isNaN(nota) || nota < 0 || nota > 1000) {
            alert("Nota inválida! Por favor, insira um valor entre 0 e 1000.");
        }
    } while (isNaN(nota) || nota < 0 || nota > 1000);
    return nota;
}

function getResultado(nota) {
    if (nota > 550) return "Aprovado";
    if (nota < 400) return "Reprovado";
    return "Recuperação";
}

function isValidNome(nome) {
    return nome && nome.split(' ').length >= 2 && !/\d/.test(nome);
}

function isValidInscricao(inscricao) {
    return /^\d{10}$/.test(inscricao) && inscricao.startsWith("2024");
}

function isValidNascimento(nascimento) {
    return nascimento >= 1901 && nascimento <= 2007;
}

function exibirResultados() {
    document.write("<h2> Resultados dos Vestibulandos </h2> <br><br>");

    for (let i = 0; i < vestibulandos.length; i++) {
        const vestibulando = vestibulandos[i];
        document.write(`Vestibulando ${i + 1}, <br> Nome: ${vestibulando.nome}, <br> Número de Inscrição: ${vestibulando.inscricao}, <br>
                Ano de Nascimento: ${vestibulando.nascimento}, <br> Nota em Natureza: ${vestibulando.notas.natureza} - ${vestibulando.resultados.natureza} 
                <br> Nota em Humanas: ${vestibulando.notas.humanas} - ${vestibulando.resultados.humanas}
                <br> Nota em Linguagens: ${vestibulando.notas.linguagens} - ${vestibulando.resultados.linguagens}
                <br> Nota em Matemática: ${vestibulando.notas.matematica} - ${vestibulando.resultados.matematica}
                <br> Nota em Redação: ${vestibulando.notas.redacao} - ${vestibulando.resultados.redacao} <br><br>
            
        `);
    }
}


// Função para iniciar o cadastro
function iniciarCadastro() {
    let continuar = true;

    while (continuar) {
        cadastrarVestibulando();
        if (vestibulandos.length >= 5) {
            const opcao = prompt("Deseja continuar cadastrando? (1 - Sim, 2 - Exibir resultados)");
            if (opcao === "2") {
                exibirResultados();
                continuar = false;
            } else if (opcao !== "1") {
                alert("Opção inválida");
            }
        } else {
            alert("Você deve cadastrar no mínimo 5 pessoas.");
        }
    }
}

// Chama a função para iniciar o cadastro
iniciarCadastro();


