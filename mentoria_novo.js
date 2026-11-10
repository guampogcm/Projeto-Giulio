document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo() {
    const data_inicio = document.getElementById('data_inicio').value;
    const data_fim    = document.getElementById('data_fim').value;
    const status     = document.getElementById('status').value.trim();
    const objetivo   = document.getElementById('objetivo').value.trim();

    if (!status || !objetivo) {
        alert('Por favor, preencha o status e o objetivo da mentoria.');
        return;
    }

    const fd = new FormData();
    fd.append('data_inicio', data_inicio);
    fd.append('data_fim', data_fim);
    fd.append('status', status);
    fd.append('objetivo', objetivo);

    try {
        const retorno = await fetch(URL_PHP + 'mentoria_novo.php', {
            method: 'POST',
            body: fd
        });
        const resposta = await retorno.json();

        if (resposta.status === 'ok') {
            alert('SUCESSO: ' + resposta.mensagem);
            window.location.href = 'mentoria.html'; // Volta para a listagem
        } else {
            alert('ERRO: ' + resposta.mensagem);
        }
    } catch (erro) {
        console.error('Erro ao cadastrar mentoria:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}