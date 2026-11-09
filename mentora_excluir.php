<?php
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) { // o get id vem da URL, ex: mentora_alterar.php?id=123
    $id              = (int) $_GET['id'];
    $id_usuario      = (int) ($_POST['id_usuario'] ?? 0);
    $area_atuacao    = trim($_POST['area_atuacao'] ?? '');
    $empresa         = trim($_POST['empresa'] ?? '');
    $disponibilidade = trim($_POST['disponibilidade'] ?? '');

    if (empty($id_usuario) || empty($area_atuacao) || empty($disponibilidade)) {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Usuaria, area de atuacao e disponibilidade sao obrigatorias.';
    } else {
        $stmt = $conexao->prepare( // aqui é ligado a conexao.php, que tem a variavel $conexao
            'UPDATE mentoras
                SET area_atuacao = ?, empresa = ?, disponibilidade = ?, id_usuario = ?
              WHERE id_mentoras = ?'
        );

        $stmt->bind_param('sssii', $area_atuacao, $empresa, $disponibilidade, $id_usuario, $id);

        if ($stmt->execute()) {
            $retorno['status']   = 'ok';
            $retorno['mensagem'] = 'Mentora alterada com sucesso.';
        } else {
            $retorno['status']   = 'nok';
            $retorno['mensagem'] = 'Nao foi possivel alterar a mentora.';
        }
        $stmt->close();
    }
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
}

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);

//diferente do alterar, o excluir não precisa de dados do body, apenas do id na URL. Por isso não tem $_POST, apenas $_GET