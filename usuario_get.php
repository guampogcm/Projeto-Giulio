<?php
include_once('conexao.php');

// Padrão de retorno em todas as situações
$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem que envio para o front
    'data'     => []
];

if (isset($_GET['id'])) {
    // Consulta de um único usuário (id recebido por GET)
    $id = (int) $_GET['id'];
    $stmt = $conexao->prepare("SELECT * FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id);
} else {
    // Consulta de todos os usuários
    $stmt = $conexao->prepare("SELECT * FROM usuario ORDER BY nome");
}

$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];
if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }
    $retorno = [
        'status'   => 'ok',
        'mensagem' => 'Sucesso, consulta efetuada.',
        'data'     => $tabela
    ];
} else {
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Não há registros',
        'data'     => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
