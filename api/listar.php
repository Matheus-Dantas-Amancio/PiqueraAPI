<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/conexao.php';

$consuta_produtos = "SELECT * FROM contatos";
$dados_produtos = $conn->prepare($consuta_produtos);
$dados_produtos->execute();



if(($dados_produtos) && ($dados_produtos->rowCount() != 0))
    {
      while($linha_produto = $dados_produtos->fetch(PDO::FETCH_ASSOC)){
        extract($linha_produto);

        $lista_produtos[] = [
            'id' => $id,
            'nome' => $nome,
            'telefone' => $telefone
        ];
      }  

      http_response_code(200);
      echo json_encode($lista_produtos);

    }