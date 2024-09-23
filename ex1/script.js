let nomes = [];
let horasTrabalhadas = [];
let salarios = [];
let pisPasep = [];
let continuar = true;

function calcularDeducoes(salario) {
    let inss, irpf;

    // Calcular INSS
    if (salario <= 1500.99) {
        inss = salario * 0.08;
    } else if (salario <= 3000.99) {
        inss = salario * 0.09;
    } else {
        inss = salario * 0.11;
    }

    // Calcular IRPF
    if (salario <= 1500.99) {
        irpf = 0;
    } else if (salario <= 2000.99) {
        irpf = salario * 0.075;
    } else if (salario <= 4000.99) {
        irpf = salario * 0.15;
    } else {
        irpf = salario * 0.275;
    }

    let totalDeducoes = inss + irpf;
    let salarioLiquido = salario - totalDeducoes;

    return {
        salarioBruto: salario,
        inss: inss,
        irpf: irpf,
        salarioLiquido: salarioLiquido
    };
}

/* Essa função utiliza uma expressão regular (/\d/) para procurar dígitos na string. 
Se encontrar algum dígito, retorna true; caso contrário, retorna false. */
function hasNumber(NBA) {
    return /\d/.test(NBA);
}

function isValidName(name) {
    let parts = name.split(' ');
    if (parts.length < 2) return false;
    for (let part of parts) {
        if (part.length < 3) return false;
    }
    return true;
}

function entrar() {
    if (nomes.length < 50) {
        let nome = prompt("Informe o nome completo:");
        while (!nome || !isValidName(nome) || hasNumber(nome)) {
            nome = prompt("Nome inválido. Informe o nome completo (nome e sobrenome) com pelo menos 3 caracteres cada e sem números:");
        }

        let horas = parseInt(prompt("Informe a Quantidade de Horas Trabalhadas:"));
        while (isNaN(horas) || horas < 20 || horas > 200) {
            horas = parseInt(prompt("Horas Trabalhadas inválidas. Informe um valor válido (entre 20 e 200 horas):"));
        }

        let salario = parseFloat(prompt("Informe o salário:"));
        while (isNaN(salario) || salario < 1000 || salario > 300000) {
            salario = parseFloat(prompt("Salário inválido. Informe um salário válido (entre R$ 1.000,00 e R$ 300.000,00):"));
        }

        let pis = prompt("Informe o número do PIS/PASEP (11 dígitos):");
        while (!pis || pis.length !== 11 || isNaN(pis)) {
            pis = prompt("Número do PIS/PASEP inválido. Informe um número válido (11 dígitos):");
        }

        nomes.push(nome);
        horasTrabalhadas.push(horas);
        salarios.push(salario);
        pisPasep.push(pis);
    } else {
        alert("Limite de 50 cadastros atingido.");
    }
}

function exibirCadastrados() {
    document.write("Lista de Funcionários Cadastrados <br/><br/>");
    for (let i = 0; i < nomes.length; i++) {
        let deducoes = calcularDeducoes(salarios[i]);
        document.write(`Nome: ${nomes[i]}, <br/> PIS/PASEP: ${pisPasep[i]}, <br/> Horas Trabalhadas: ${horasTrabalhadas[i]}, <br/> Salário Bruto: R$ ${deducoes.salarioBruto.toFixed(2)}, <br/> INSS: R$ ${deducoes.inss.toFixed(2)}, <br/> IRPF: R$ ${deducoes.irpf.toFixed(2)}, <br/> Salário Líquido: R$ ${deducoes.salarioLiquido.toFixed(2)}<br/><br/>`);
    }
}

while (continuar) {
    entrar();
    let opcao = prompt("Deseja continuar cadastrando? (1 - Sim, 2 - Exibir)");
    if (opcao === "2") {
        if (nomes.length >= 5) {
            exibirCadastrados();
            continuar = false;
        } else {
            alert("Você deve cadastrar no mínimo 5 pessoas.");
        }
    } else if (opcao !== "1") {
        alert("Opção Inválida");
    }
}
