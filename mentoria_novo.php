<?php
include_once('conexao.php');

$retorno = [
    'status'   => '', 
    'mensagem' => '', 
    'data'     => []  
];


$data_inicio = trim($_POST['data_inicio'] ?? '') ?: null; 
$data_fim    = trim($_POST['data_fim'] ?? '') ?: null;    
$status      = trim($_POST['status'] ?? '');
$objetivo    = trim($_POST['objetivo'] ?? '');
$id_mentoria = !empty($_POST['id_mentoria']) ? (int) $_POST['id_mentoria'] : 0;


if (empty($status) || empty($objetivo)) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Status e objetivo sao obrigatorios.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}

 {
    if ($id_mentoria > 0) {
        $stmt = $conexao->prepare(
            "INSERT INTO $tabela (id_mentoria, data_inicio, data_fim, status, objetivo)
             VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->bind_param('issss', $id_mentoria, $data_inicio, $data_fim, $status, $objetivo);
    } else {
        $stmt = $conexao->prepare(
            "INSERT INTO $tabela (data_inicio, data_fim, status, objetivo)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param('ssss', $data_inicio, $data_fim, $status, $objetivo);
    }

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $novo_id = $conexao->insert_id ?: $id_mentoria;
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Mentoria cadastrada com sucesso.';
        $retorno['data']     = ['id_mentoria' => $novo_id];
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Falha ao cadastrar a mentoria.';
        $retorno['data']     = [];
    }

    $stmt->close();
} 

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);