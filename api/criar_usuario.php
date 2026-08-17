<?php

include_once '../config/conexao.php';

$usuario = 'admin';
$senha = password_hash("123456",PASSWORD_ARGON2I);

$sql = "INSERT INTO usuarios (usuario, senha) VALUES (:usuario, :senha)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
$stmt->bindParam(':senha',$senha,PDO::PARAM_STR);

if($stmt->execute()){
    echo "Usuario criado com sucesso";
}else{
    echo "Não foi possível criar o usuario";
}



