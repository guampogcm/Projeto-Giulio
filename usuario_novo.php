<?php
include_once('conexao.php');

$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem que envio para o front
    'data'     => []
];

// Trazendo as informações do front-end (FormData -> $_POST)
$nome     = trim($_POST['nome']     ?? '');
$email    = trim($_POST['email']    ?? '');
$telefone = trim($_POST['telefone'] ?? '');
$login    = trim($_POST['login']    ?? '');

if ($nome === '' || $email === '' || $telefone === '' || $login === '') {
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Preencha todos os campos.',
        'data'     => []
    ];
} else {
    try {
        $stmt = $conexao->prepare("
            INSERT INTO usuario (nome, email, telefone, login)
            VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nome, $email, $telefone, $login);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Usuário cadastrado com sucesso.',
                'data'     => []
            ];
        } else {
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Falha ao cadastrar usuário.',
                'data'     => []
            ];
        }
        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        // 1062 = valor duplicado (login UNIQUE)
        $msg = ($e->getCode() == 1062)
            ? 'Já existe um usuário com este login.'
            : 'Falha ao cadastrar usuário.';
        $retorno = ['status' => 'nok', 'mensagem' => $msg, 'data' => []];
    }
}

$conexao->close();
header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
