<?php

function limparDados($nome, $telefone){
    $resultado  =[
        "nome" => trim($nome ?? ""),
        "telefone" => preg_replace('/\D/','',$telefone ?? "") 
    ];

    return $resultado;
}


function validarExistencia($nome, $telefone){

    if(!empty($nome) && !empty($telefone)){
        $result = [
            "Erro" => false
        ];
    }else{
        $result = [
            "Erro" => true,
            "Menssagem" => "É necessário prencher todos os campos corretamente"
        ];
    }
    return $result;
}

function consultarCadasto(PDO $conn, $id){
    $sql = "SELECT * FROM contatos WHERE id = :id";
    $alterar_prod = $conn->prepare($sql);
    $alterar_prod->bindParam(":id", $id, PDO::PARAM_INT);
    $alterar_prod->execute();

    return $alterar_prod->fetch(PDO::FETCH_ASSOC);
}