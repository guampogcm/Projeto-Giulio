<?php 
mysqli_report(MYSQLI_REPORT_OFF);

$servidor   = 'localhost:3306'; // host:porta
$usuario    = 'root';           // usuario do MySQL
$senha      = '';               // senha (vazia no XAMPP padrao)
$nome_banco = 'poliwomen';      // nome do banco criado no script SQL

// Criar a conexao
$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
// Verificar se a conexao falhou
if ($conexao->connect_error) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode([
        'status'   => 'nok',
        'mensagem' => 'Falha na conexao: ' . $conexao->connect_error,
        'data'     => []
    ]);
    exit; 
}

$conexao->set_charset('utf8mb4');
