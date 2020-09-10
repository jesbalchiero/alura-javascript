var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteForm(form);    
    var erros = validaPaciente(paciente);
    console.log(erros);

    if(erros.length > 0){
        exibeErros(erros);
        return;
    }
    
    adicionaPaciente(paciente);

    form.reset();
    var mensagemErro = document.querySelector("#mensagem-erro")
    mensagemErro.innerHTML = "";
});

function adicionaPaciente(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeErros(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteForm(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
};

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd (paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd (paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd (paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe)
    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0) erros.push("Necessário o preenchimento do Nome do Paciente!")
    if(paciente.peso.length == 0) erros.push ("Necessário o preenchimento da Peso do Paciente!")
    if(paciente.altura.length == 0) erros.push ("Necessário o preenchimento da Altura do Paciente!")
    if(paciente.gordura.length == 0) erros.push ("Necessário o preenchimento da % de Gordura!")
    if(!validaPeso(paciente.peso)) erros.push("Peso inválido!");
    if(!validaAltura(paciente.altura)) erros.push("Altura inválida!");

    return erros;
}