<?php
include_once('conexao.php');

$retorno = [
    'status'   => '', 
    'mensagem' => '', 
    'data'     => []  
];

$id = (int) ($_GET['id'] ?? ($_POST['id_mentoria'] ?? ($_POST['id'] ?? 0)));

if ($id <= 0) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}

 {
    $stmt = $conexao->prepare("DELETE FROM $tabela WHERE id_mentoria = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Mentoria excluida com sucesso.';
        $retorno['data']     = ['id_mentoria' => $id];
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Nao foi possivel excluir a mentoria.';
        $retorno['data']     = [];
    }

    $stmt->close();
} 

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);