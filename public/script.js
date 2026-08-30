function mostrarToast(mensagem) {
    const elementoToast = document.getElementById("meuToast");
    document.getElementById("toastMensagem").textContent = mensagem;
    const toast = bootstrap.Toast.getOrCreateInstance(elementoToast);

    toast.show();
}

let idParaExcluir;

function pegarId(botao) {
    const tr = botao.closest("tr");
    idParaExcluir = tr.dataset.id;
}

const formulario = document.querySelector("#salvar");

formulario.addEventListener("click", async (e) => {

    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');

    if (!inputNome.value.trim() || !inputTelefone.value.trim()) {

        mostrarToast("Preencha todos os dados corretamente!");
        return;
    }

    const dados = {
        nome: nome,
        telefone: telefone
    };

    try {
        retornoCadastrar = await fetch('http://localhost/piqueraapi/api/inserir.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(dados),
        });

        const respostaCadastrar = await retornoCadastrar.json();

        if (!retornoCadastrar.ok) {
            mostrarToast(respostaCadastrar.mensagem);
            return;
        }

        mostrarToast(respostaCadastrar.mensagem);
        document.getElementById('nome').value = "";
        document.getElementById('telefone').value = "";

    } catch (erro) {
        mostrarToast(erro);
    }


});


async function buscarDados() {
    const nomeLista = document.getElementById("buscarContatos").value;

    const parametros = new URLSearchParams({
        nome: nomeLista
    });

    try {
        const resposta = await fetch(`http://localhost/piqueraapi/api/listar.php?${parametros}`, {
            method: 'GET',
            credentials: "include"
        });

        const retorno = await resposta.json();
        
        if (!Array.isArray(retorno)) {
            mostrarToast(retorno.mensagem);
            return;
        }

        console.log(retorno);

        const tBody = document.querySelector("tbody");
        tBody.innerHTML = "";

        retorno.forEach(contato => {
            const tr = document.createElement("tr");

            tr.dataset.id = contato.id;

            tr.innerHTML += `
                <td>${contato.id}</td>
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>
                <button class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modal-confirmar-exclusao" onclick="pegarId(this)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button> 
                <button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal-edicao" onclick="carregarDadosEdicao(this)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button> </td>
            `;

            tBody.appendChild(tr);
        });

    } catch (error) {
        mostrarToast(error);
    }
}




async function carregarDadosEdicao(botao) {

    if (!botao) return;

    const tr = botao.closest('tr');
    const id = tr.dataset.id;


    const modal = document.getElementById("modal-confirmar"); // preciso lembrar que esse modal vai salvar o ID para edição 
    modal.dataset.id = id;



    try {
        await fetch(`http://localhost/piqueraapi/api/buscar_contato.php?id=${id}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(dados => dados.json())
            .then(dados => {
                document.querySelector("#input-nome-modal").value = dados.nome;
                document.querySelector("#input-telefone-modal").value = dados.telefone;

            });
    } catch (erro) {
        mostrarToast(erro);
    }
}


async function alterarDados() {

    const nomeEditar = document.getElementById("input-nome-modal").value;
    const telefoneEditar = document.getElementById("input-telefone-modal").value;

    const modalEdicao = document.getElementById("modal-confirmar"); // realizar a busca pelo modal que tem o ID do cliente
    const id = modalEdicao.dataset.id;

    const dados = {
        id: id,
        nome: nomeEditar,
        telefone: telefoneEditar
    };

    try {
        const retorno = await fetch(`http://localhost/piqueraapi/api/alterar.php`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        const resposta = await retorno.json();

        if (!retorno.ok) {

            mostrarToast(resposta.mensagem);
            return;
        }

        const elementoModal = document.getElementById("modal-confirmar");
        const modal = bootstrap.Modal.getInstance(elementoModal);

        modal.hide();
        console.log(resposta.mensagem);
        mostrarToast(resposta.mensagem);

    } catch (erro) {
        mostrarToast(erro);
    }

}

async function excluirContato() {

    try {
        $respostaExclusao = await fetch(`http://localhost/piqueraapi/api/deletar.php?id=${idParaExcluir}`, {
            method: 'DELETE',
            credentials: "include"
        });

        $retornoExclusao = await $respostaExclusao.json();

        if (!$respostaExclusao.ok) {
            mostrarToast($retornoExclusao.mensagem);
            return;
        }


        const elementoModalExclusao = document.getElementById("modal-confirmar-exclusao");
        const modalExclusao = bootstrap.Modal.getInstance(elementoModalExclusao);
        modalExclusao.hide();

        mostrarToast($retornoExclusao.mensagem);
        buscarDados();

    } catch (error) {
        mostrarToast(error);
    }

}

