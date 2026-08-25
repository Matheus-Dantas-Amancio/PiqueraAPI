

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
                <td><button class="btn btn-outline-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
            `;

             tBody.appendChild(tr);
            });
           
        });




});

