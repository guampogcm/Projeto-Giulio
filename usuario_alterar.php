<?php
include_once('conexao.php');

$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem que envio para o front
    'data'     => []
];

// Trazendo as informações do front-end
$nome     = trim($_POST['nome']     ?? '');
$email    = trim($_POST['email']    ?? '');
$telefone = trim($_POST['telefone'] ?? '');
$login    = trim($_POST['login']    ?? '');
$id       = (int) ($_GET['id'] ?? 0); // id vem pela URL (GET)

if ($id <= 0 || $nome === '' || $email === '' || $telefone === '' || $login === '') {
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Preencha todos os campos.',
        'data'     => []
    ];
} else {
    try {
        $stmt = $conexao->prepare("
            UPDATE usuario SET
                nome = ?, email = ?, telefone = ?, login = ?
            WHERE id_usuario = ?");
        $stmt->bind_param("ssssi", $nome, $email, $telefone, $login, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Usuário alterado com sucesso.',
                'data'     => []
            ];
        } else {
            // 0 linhas: id inexistente ou nenhum dado foi modificado
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Nenhuma alteração realizada.',
                'data'     => []
            ];
        }
        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $msg = ($e->getCode() == 1062)
            ? 'Já existe um usuário com este login.'
            : 'Falha ao alterar usuário.';
        $retorno = ['status' => 'nok', 'mensagem' => $msg, 'data' => []];
    }
}

$conexao->close();
header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
