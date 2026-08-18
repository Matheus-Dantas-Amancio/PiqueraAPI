

const formulario =  document.querySelector("#salvar");

formulario.addEventListener("click", (e) =>{
   

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    console.log(nome,telefone);

    const dados  = {
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


