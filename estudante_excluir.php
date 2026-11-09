<?php
// estudante_excluir.php
// DELETE: diferente do alterar, o excluir nao precisa de dados do body,
// apenas do id na URL (estudante_excluir.php?id=5). Por isso so tem $_GET, sem $_POST.
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];

    $stmt = $conexao->prepare('DELETE FROM estudante WHERE id_estudante = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();

    // affected_rows > 0 = alguma linha foi apagada
    // (se der 0, o id nao existia no banco)
    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Estudante excluido com sucesso.';
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Nao foi possivel excluir o estudante.';
    }
    $stmt->close();
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
}

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
