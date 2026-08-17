<?php

session_start();

include_once '../config/conexao.php';
include_once 'validador.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// !IMPORTANTE!!!! Não esquecer que nos endpoints usar a validação para não deixar que o atacante acesse paginas ou dados sem estar autorizado

$json_front = file_get_contents("php://input");
$dados_json = json_decode($json_front, true);

$usuario = $dados_json["usuario"] ?? '';
$senha = $dados_json["senha"] ?? '';

$sql = "SELECT id, senha FROM usuarios WHERE usuario = :usuario LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':usuario',$usuario, PDO::PARAM_STR);
$stmt->execute();

$dados = $stmt->fetch(PDO::FETCH_ASSOC);

if($dados && password_verify($senha, $dados['senha'])){
    http_response_code(200);

    $_SESSION['usuario_id'] = $dados['id'];

    $result = [
        "erro" => false,
        "mensagem" => "Usuario Logado com sucesso"
    ];

}else{

    http_response_code(401);
    $result = [
        "erro" => true,
        "mensagem" => "Senha ou Usuario invalidos"
    ];
    
}

echo json_encode($result);
exit();




