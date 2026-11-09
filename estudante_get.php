<?php
// estudante_get.php
// READ: devolve os estudantes em JSON.
//   estudante_get.php        -> todos os estudantes (usado na lista)
//   estudante_get.php?id=5   -> so o estudante 5 (usado na tela de alterar)
include_once('conexao.php'); // traz a variavel $conexao
$retorno = ['status' => '', 'mensagem' => '', 'data' => []]; // padrao de resposta do grupo

// SELECT base. Diferente da mentora, aqui nao precisa de JOIN:
// nome, email e telefone ficam na propria tabela estudante.
$sql = 'SELECT id_estudante, nome, email, curso, periodo, telefone,
               area_interesse, data_inicio
          FROM estudante';

if (isset($_GET['id'])) {
    // Buscar por ID
    $id   = (int) $_GET['id'];                           // (int) garante que e numero
    $stmt = $conexao->prepare($sql . ' WHERE id_estudante = ?');
    $stmt->bind_param('i', $id);                          // 'i' = integer
} else {
    // Buscar todos
    $stmt = $conexao->prepare($sql . ' ORDER BY nome');
}

$stmt->execute();
$resultado = $stmt->get_result(); // pega o resultado da query
$tabela = [];                     // aqui vamos guardar as linhas que vieram do banco

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
