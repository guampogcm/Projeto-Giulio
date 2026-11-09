<?php
// estudante_novo.php
// CREATE: recebe os dados do formulario (FormData -> $_POST) e faz o INSERT.
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

// Receber os dados do FormData (vem via $_POST)
// ?? '' evita erro caso o campo nao tenha sido enviado; trim() tira espacos
// O id_estudante NAO vem do front: e AUTO_INCREMENT, o banco gera sozinho.
$nome           = trim($_POST['nome'] ?? '');
$email          = trim($_POST['email'] ?? '');
$curso          = trim($_POST['curso'] ?? '');
$periodo        = trim($_POST['periodo'] ?? '');
$telefone       = trim($_POST['telefone'] ?? '');
$area_interesse = trim($_POST['area_interesse'] ?? '');
// Data vazia vira NULL no banco (uma string vazia '' daria erro numa coluna DATE)
$data_inicio    = trim($_POST['data_inicio'] ?? '') ?: null;

// Validacao: campos obrigatorios (antes do prepare)
if (empty($nome)) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'O nome e obrigatorio.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit; // para aqui, nao tenta gravar no banco
}

$stmt = $conexao->prepare(
    'INSERT INTO estudante (nome, email, curso, periodo, telefone, area_interesse, data_inicio)
     VALUES (?, ?, ?, ?, ?, ?, ?)'
);

// 7 interrogacoes = 7 letras. 's' = string (a data tambem vai como texto 'AAAA-MM-DD')
$stmt->bind_param('sssssss', $nome, $email, $curso, $periodo, $telefone, $area_interesse, $data_inicio);
$stmt->execute();

// affected_rows > 0 = a linha foi inserida
if ($stmt->affected_rows > 0) {
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Estudante cadastrado com sucesso.';
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Falha ao cadastrar o estudante.';
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
