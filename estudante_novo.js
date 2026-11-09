// estudante_novo.js
// Tela de CADASTRO: pega os valores do formulario e envia para o PHP (CREATE).

// Ao clicar em Salvar, chama a funcao novo()
document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo() {
    // Monta o FormData com os valores digitados no formulario
    // (o 1o parametro e o nome que o PHP le em $_POST['...'])
    const fd = new FormData();
    fd.append('nome',           document.getElementById('nome').value);
    fd.append('email',          document.getElementById('email').value);
    fd.append('curso',          document.getElementById('curso').value);
    fd.append('periodo',        document.getElementById('periodo').value);
    fd.append('telefone',       document.getElementById('telefone').value);
    fd.append('area_interesse', document.getElementById('area_interesse').value);
    fd.append('data_inicio',    document.getElementById('data_inicio').value);

    // Envia para o PHP via POST (o PHP le com $_POST)
    const retorno = await fetch('../php/estudante_novo.php', {
        method: 'POST',
        body:   fd
    });

    // Le o JSON devolvido pelo PHP { status, mensagem, data }
    const resposta = await retorno.json();

    // Verifica o status e age conforme o resultado
    if (resposta.status == 'ok') {
        alert('SUCESSO: ' + resposta.mensagem);
        window.location.href = 'estudante.html'; // volta para a lista
    } else {
        alert('ERRO: ' + resposta.mensagem);
    }
}
