<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: Application/json; charset=UTF-8");

include_once '../config/conexao.php';

$dados_id = $_GET['id'] ?? null;
$dados_id = trim($dados_id);


$sql = "SELECT * FROM contatos WHERE id = :id";
$buscador = $conn->prepare($sql);
$buscador->bindParam(':id', $dados_id, PDO::PARAM_INT);
$buscador->execute();

$resultado = $buscador->fetch(PDO::FETCH_ASSOC);



if($buscador->rowCount() != 0){

    $sql_exclusao = "DELETE FROM contatos WHERE id = :idAlvo";
    $exclusor = $conn->prepare($sql_exclusao);
    $exclusor->bindParam(':idAlvo', $resultado["id"],PDO::PARAM_INT);
   $resultado_exclusao = $exclusor->execute();

    if($exclusor->rowCount() != 0){
    
    $response = [
        "erro" => false,
        "mensagem" => "Dados excluidos com sucesso",
        "id" => $resultado["id"] ?? null,
        "nome" => $resultado["nome"] ?? null,
        "telefone" => $resultado["telefone"] ?? null
    ];
    }else{
        $response =[
            "erro" => true,
            "mensagem" => "Erro ao tentar excluir id:".($resultado["id"] ?? null)." e nome: ". ($resultado["nome"] != '' ? $resultado["nome"] :'Sem Nome' )
        ];
    }
    

}else{
    $response = [
        "erro" => true,
        "mensagem" => "Id não encontrado"
    ];
}

http_response_code(200);
echo json_encode($response);