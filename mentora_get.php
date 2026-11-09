<?php 
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$sql = 'SELECT m.id_mentoras, m.area_atuacao, m.empresa, m.disponibilidade, 
               m.id_usuario, u.nome, u.email
          FROM mentoras m
         INNER JOIN usuario u ON u.id_usuario = m.id_usuario';

if (isset($_GET['id'])) {
    // Buscar por ID
    $id   = (int) $_GET['id'];
    $stmt = $conexao->prepare($sql . ' WHERE m.id_mentoras = ?');
    $stmt->bind_param('i', $id); // 'i' = integer
} else {
    // Buscar todas
    $stmt = $conexao->prepare($sql . ' ORDER BY m.id_mentoras');
}

$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha; // adiciona cada linha ao array
    }
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $tabela;
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao ha registros.';
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
