<?php
include_once('conexao.php');

$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem que envio para o front
    'data'     => []
];

// Trazendo as informações do front-end (id pela URL - GET)
$id = (int) ($_GET['id'] ?? 0);

try {
    $stmt = $conexao->prepare("DELETE FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'Usuário excluído com sucesso.',
            'data'     => []
        ];
    } else {
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'Falha ao excluir usuário.',
            'data'     => []
        ];
    }
    $stmt->close();
} catch (mysqli_sql_exception $e) {
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Falha ao excluir usuário.',
        'data'     => []
    ];
}

$conexao->close();
header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
