<?php

include_once '../config/conexao.php';
include_once 'validador.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$json_front = file_get_contents("php://input");
$dados_json = json_decode($json_front, true);




$dados_limpos = limparDados($dados_json["nome"], $dados_json["telefone"]);
$result_validar = validarVazio($dados_limpos["nome"], $dados_limpos["telefone"]);


if (!$result_validar["Erro"]) {

    $dados_id = $dados_json["id"];
    $dados_nome = $dados_json["nome"];
    $dados_telefone = $dados_json["telefone"];

    $retorno_banco = consultarCadasto($conn,$dados_id);

    //realizar o update dentro do retono da consulta
    if ($retorno_banco) {
        extract($retorno_banco);

        $result_update = false;

        $sql_alterar = "UPDATE contatos SET nome= :nome, telefone= :telefone WHERE id = :idAlterar";
        $alterar_sql = $conn->prepare($sql_alterar);
        $alterar_sql->bindParam(':idAlterar', $dados_id, PDO::PARAM_INT);
        $alterar_sql->bindParam(':nome', $dados_nome, PDO::PARAM_STR);
        $alterar_sql->bindParam(':telefone', $dados_telefone, PDO::PARAM_STR);
        $result_update = $alterar_sql->execute();


        if ($result_update) {
            $result =
                [
                    "erro" => false,
                    "mensagem" => "Dados Alterados com sucesso",
                    "id" => $dados_id,
                    "nome" => $dados_nome,
                    "telefone" => $dados_telefone
                ];
        } else {
            $result =
                [
                    "erro" => true,
                    "menssagem" => "Houve um erro ao tentar realizar a alteração do registro no sistema"
                ];
        }
    } else {
        $result =
            [
                "erro:" => false,
                "menssagem" => "Registro não encontrado"
            ];
    }
} else {
    $result = [
        "erro" => true,
        "mensagem" =>  "Sem dados necessário enviar preechido",
        "resposta" => $result_validar['Menssagem']
    ];
}




http_response_code(200);
echo json_encode($result);
