<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/conexao.php';


$json_front = file_get_contents("php://input");
$nome_json = $_GET['nome'] ?? null;
$nome_json = trim($nome_json);


if ($nome_json != null) {
  $nome = "%" . $nome_json . "%";

  $consuta_produtos = "SELECT * FROM contatos WHERE nome LIKE :nome";
  $dados_produtos = $conn->prepare($consuta_produtos);
  $dados_produtos->bindParam(':nome', $nome, PDO::PARAM_STR);
  $dados_produtos->execute();

  if (($dados_produtos) && ($dados_produtos->rowCount() != 0)) {
    while ($linha_produto = $dados_produtos->fetch(PDO::FETCH_ASSOC)) {
      extract($linha_produto);

      $return[] = [
        'id' => $id,
        'nome' => $nome,
        'telefone' => $telefone
      ];
    }

    http_response_code(200);
    echo json_encode($return);
  } else {
    $return = [
      "erro" => false,
      "mensagem" => "Nada encontrado"
    ];

    http_response_code(404);
    echo json_encode($return);
  }
} else {
  $return = [
    "erro" => false,
    "mensagem" => "Digite alguma informação"
  ];

  http_response_code(404);
  echo json_encode($return);
}
