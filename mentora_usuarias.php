<?php 
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$stmt = $conexao->prepare('SELECT id_usuario, nome FROM usuario ORDER BY nome');

$stmt->execute(); // executa a query
$resultado = $stmt->get_result(); // pega o resultado da query
$tabela = []; // aqui vamos guardar os dados que vieram do banco

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $tabela;
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao ha usuarios cadastrados.';
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
