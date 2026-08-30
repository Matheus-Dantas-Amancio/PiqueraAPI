## ⚙️ Configuração do Banco de Dados

Após baixar o projeto em sua máquina, é necessário configurar um banco de dados para que a API possa funcionar corretamente.

Neste projeto foi utilizado o **XAMPP**, utilizando o **MySQL** como banco de dados e o **phpMyAdmin** para sua administração.

### 1. Criando o banco de dados

Abra o **phpMyAdmin** ou outro cliente MySQL e execute os seguintes comandos:

```sql
CREATE DATABASE piqueraapi;

USE piqueraapi;
```

### 2. Criando as tabelas

Após criar e selecionar o banco de dados, execute os comandos abaixo para criar as tabelas necessárias para o funcionamento da aplicação.

#### Tabela `contatos`

```sql
CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(30) NOT NULL
);
```

#### Tabela `usuarios`

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);
```

### 3. Configurando a conexão com o banco

Após criar o banco e as tabelas, abra o arquivo `conexao.php` e verifique se as informações de conexão correspondem às configurações do seu ambiente:

```php
<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "piqueraapi";

$conn = new PDO(
    "mysql:host=$host;dbname=" . $dbname,
    $user,
    $pass
);
```

> **Observação:** Caso você tenha configurado uma senha para o usuário `root` do MySQL, altere o valor da variável `$pass` de acordo com a sua configuração.

### 4. Executando o projeto

Após configurar o banco de dados, basta iniciar o servidor **Apache** e o **MySQL** pelo XAMPP.

Como este projeto utiliza o XAMPP, a pasta do projeto deve estar dentro do diretório:

```text
C:\xampp\htdocs\
```

Por exemplo:

```text
C:\xampp\htdocs\piqueraapi\
```

Com o Apache e o MySQL em execução e o projeto dentro da pasta `htdocs`, a aplicação estará pronta para ser utilizada.
