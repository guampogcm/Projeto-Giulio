<?php 
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

// Receber os dados do FormData (vem via $_POST)
// ?? '' evita erro caso o campo nao tenha sido enviado; trim() tira espacos
$id_usuario      = (int) ($_POST['id_usuario'] ?? 0); // (int) garante que e numero
$area_atuacao    = trim($_POST['area_atuacao'] ?? '');
$empresa         = trim($_POST['empresa'] ?? '');
$disponibilidade = trim($_POST['disponibilidade'] ?? '');

// Validacao: campos obrigatorios (antes do prepare)
if (empty($id_usuario) || empty($area_atuacao) || empty($disponibilidade)) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Usuaria, area de atuacao e disponibilidade sao obrigatorias.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}

$stmt = $conexao->prepare(
    'INSERT INTO mentoras (area_atuacao, empresa, disponibilidade, id_usuario)
     VALUES (?, ?, ?, ?)'
);

$stmt->bind_param('sssi', $area_atuacao, $empresa, $disponibilidade, $id_usuario);
$stmt->execute();

// (se o id_usuario nao existir, a FK impede o INSERT e cai no else)
if ($stmt->affected_rows > 0) {
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Mentora cadastrada com sucesso.';
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Falha ao cadastrar a mentora.';
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
