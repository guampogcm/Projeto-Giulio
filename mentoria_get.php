<?php
include_once('conexao.php'); 

$retorno = [
    'status'   => '', 
    'mensagem' => '', 
    'data'     => []  
];

$sql = "SELECT id_mentoria, data_inicio, data_fim, status, objetivo FROM $tabela";

if (isset($_GET['id']) && $_GET['id'] !== '') {
    // Buscar por ID especifico
    $id   = (int) $_GET['id'];
    $stmt = $conexao->prepare($sql . ' WHERE id_mentoria = ?');
    $stmt->bind_param('i', $id);
} else {
    $stmt = $conexao->prepare($sql . ' ORDER BY id_mentoria DESC');
}

$stmt->execute();
$resultado = $stmt->get_result();
$lista = [];

if ($resultado && $resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $lista[] = $linha;
    }
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $lista;
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao ha registros.';
    $retorno['data']     = [];
}

$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);