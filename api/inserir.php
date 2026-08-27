<?php

header("Access-Control-allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-allow-Headers: *");


include_once '../config/conexao.php';
include_once 'validador.php';

$json_front = file_get_contents("php://input");
$dados = json_decode($json_front,true);
http_response_code(200);

$dados_limpos = limparDados($dados['nome'],$dados['telefone']); 
$dados_existentes = validarExistencia($dados_limpos['nome'], $dados_limpos['telefone']);

if($dados && !$dados_existentes['Erro']){
    $sql_comand = "INSERT INTO contatos (nome,telefone) VALUE (:nome, :telefone)";
    $produtos_cad = $conn->prepare($sql_comand);

    $produtos_cad->bindParam(':nome', $dados_limpos['nome'], PDO::PARAM_STR);
    $produtos_cad->bindParam(':telefone', $dados_limpos['telefone'], PDO::PARAM_STR);

    $produtos_cad->execute();

    if($produtos_cad->rowCount()){
        http_response_code(200);
        $retorno =[
            "erro" => false,
            "mensagem" => "Dados cadastrados com Sucesso!"
         
        ];
    }else{
        http_response_code(500);
        $retorno =
        [
            "erro" => true,
            "mensagem" => "Produto não foi cadastrado"
        ];
    }

}else{
    http_response_code(401);
    $retorno =
    [
        "erro" => true,
        "mensagem" => "Sem dados necessário enviar preechido",
        "resposta" => $dados_existentes['Menssagem']
    ];
}


echo json_encode($retorno);