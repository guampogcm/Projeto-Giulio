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

$data_inicio = trim($_POST['data_inicio'] ?? '') ?: null; 
$data_fim    = trim($_POST['data_fim'] ?? '') ?: null;    
$status      = trim($_POST['status'] ?? '');
$objetivo    = trim($_POST['objetivo'] ?? '');

if (empty($status) || empty($objetivo)) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Status e objetivo sao obrigatorios.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}
    $stmt = $conexao->prepare(
        "UPDATE $tabela
            SET data_inicio = ?, data_fim = ?, status = ?, objetivo = ?
          WHERE id_mentoria = ?"
    );
    $stmt->bind_param('ssssi', $data_inicio, $data_fim, $status, $objetivo, $id);

    if ($stmt->execute()) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Mentoria alterada com sucesso.';
        $retorno['data']     = ['id_mentoria' => $id];
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Nao foi possivel alterar a mentoria.';
        $retorno['data']     = [];
    }


$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);