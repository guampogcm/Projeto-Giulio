<?php
// estudante_alterar.php
// UPDATE: o id vem pela URL (estudante_alterar.php?id=5) e os dados novos pelo body (POST).
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) { // aqui o id vem da URL, ex: estudante_alterar.php?id=123
    $id             = (int) $_GET['id'];
    $nome           = trim($_POST['nome'] ?? '');
    $email          = trim($_POST['email'] ?? '');
    $curso          = trim($_POST['curso'] ?? '');
    $periodo        = trim($_POST['periodo'] ?? '');
    $telefone       = trim($_POST['telefone'] ?? '');
    $area_interesse = trim($_POST['area_interesse'] ?? '');
    $data_inicio    = trim($_POST['data_inicio'] ?? '') ?: null; // vazio -> NULL

    if (empty($nome)) { // empty verifica se a variavel esta vazia, ou seja, nao foi preenchida
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'O nome e obrigatorio.';
    } else {
        $stmt = $conexao->prepare(
            'UPDATE estudante
                SET nome = ?, email = ?, curso = ?, periodo = ?,
                    telefone = ?, area_interesse = ?, data_inicio = ?
              WHERE id_estudante = ?'
        );
        // 7 strings dos campos + 1 integer do id (o id e o ultimo por causa do WHERE)
        $stmt->bind_param('sssssssi', $nome, $email, $curso, $periodo, $telefone, $area_interesse, $data_inicio, $id);

        // execute() retorna true se a query rodou sem erro.
        // (aqui nao usamos affected_rows porque salvar sem mudar nada daria 0 e pareceria erro)
        if ($stmt->execute()) {
            $retorno['status']   = 'ok';
            $retorno['mensagem'] = 'Estudante alterado com sucesso.';
        } else {
            $retorno['status']   = 'nok';
            $retorno['mensagem'] = 'Nao foi possivel alterar o estudante.';
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
