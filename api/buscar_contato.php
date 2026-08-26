<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/conexao.php';

$id_contato = $_GET['id'] ?? null;
$id_contato = trim($id_contato);


if ($id_contato != null) {

  $consuta_produto = "SELECT * FROM contatos WHERE id = :id";
  $dados_produtos = $conn->prepare($consuta_produto);
  $dados_produtos->bindParam(':id', $id_contato, PDO::PARAM_INT);
  $dados_produtos->execute();

  if (($dados_produtos) && ($dados_produtos->rowCount() != 0)) {
     $linha_produto = $dados_produtos->fetch(PDO::FETCH_ASSOC);
     extract($linha_produto);

      $return= [
        'id' => $id,
        'nome' => trim($nome),
        'telefone' => trim($telefone)
      ];
       http_response_code(200);
    echo json_encode($return);
    }else {
    $return = [
      "erro" => false,
      "mensagem" => "Nada encontrado"
    ];

    http_response_code(404);
    echo json_encode($return);
  }
}else {
  $return = [
    "erro" => false,
    "mensagem" => "Digite alguma informação"
  ];

  http_response_code(404);
  echo json_encode($return);
}