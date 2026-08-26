
const formulario = document.querySelector("#salvar");

formulario.addEventListener("click", (e) => {


    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const dados = {
        nome: nome,
        telefone: telefone
    };

    fetch('http://localhost/piqueraapi/api/inserir.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(dados),
    })
        .then(data => console.log(data.json()));

});


const buscar = document.querySelector("#buscar");

buscar.addEventListener("click", async (e) => {
    const nomeLista = document.getElementById("buscarContatos").value;

    const parametros = new URLSearchParams({
        nome: nomeLista
    });

    await fetch(`http://localhost/piqueraapi/api/listar.php?${parametros}`, {
        method: 'GET',
        credentials: "include"
    })
        .then(dados => dados.json())
        .then(data => {
            console.log(data);
            const tBody = document.querySelector("tbody");
            tBody.innerHTML = "";

            data.forEach(contato => {
                const tr = document.createElement("tr");

                tr.dataset.id = contato.id;

                tr.innerHTML += `
                <td>${contato.id}</td>
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>
                <button class="btn btn-outline-danger btn-sm">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button> 
                <button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal-edicao" onclick="carregarDadosEdicao(this)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button> </td>
            `;

                tBody.appendChild(tr);
            });

        });

});


async function carregarDadosEdicao(botao) {

    if (!botao) return;

    const tr = botao.closest('tr');
    const id = tr.dataset.id;


    const modal = document.getElementById("modal-confirmar"); // preciso lembrar que esse modal vai salvar o ID para edição 
    modal.dataset.id = id;


    await fetch(`http://localhost/piqueraapi/api/buscar_contato.php?id=${id}`, {
        method: 'GET',
        credentials: "include"
    })
        .then(dados => dados.json())
        .then(dados => {
            document.querySelector("#input-nome-modal").value = dados.nome;
            document.querySelector("#input-telefone-modal").value = dados.telefone;

        });
}



async function alterarDados(){

    const nomeEditar = document.getElementById("input-nome-modal").value;
    const telefoneEditar = document.getElementById("input-telefone-modal").value;
   

    const modalEdicao = document.getElementById("modal-confirmar"); // realizar a busca pelo modal que tem o ID do cliente
    const id = modalEdicao.dataset.id;

    const dados ={
        id: id,
        nome: nomeEditar,
        telefone: telefoneEditar
    };


    const retorno = await fetch(`http://localhost/piqueraapi/api/alterar.php`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    });

    const resposta = await retorno.json();

    if(!retorno.ok){
        console.error("Erro HTTP: ", retorno.status);
        console.error(resposta);
        return;
    }

    console.log("Sucesso:", resposta);

}




