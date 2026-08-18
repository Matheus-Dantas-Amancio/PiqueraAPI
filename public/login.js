
const logar = document.querySelector('button');

logar.addEventListener("click", async (e)=> {
    const usuario = document.getElementById('usuario').value;
    console.log(usuario);
    const senha = document.getElementById('senha').value;

    const dados ={
        usuario: usuario,
        senha: senha
    };

    const resposta = await fetch('http://localhost/piqueraapi/api/login.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });

    const data = await resposta.json();

    if(resposta.ok && !data.erro){
        window.location.href =  "index.html";
        return;
    }
    
    alert(data.mensagem);
});