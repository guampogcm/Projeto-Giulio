document.addEventListener('DOMContentLoaded', () => {
    const url = new URLSearchParams(window.location.search);
    const id  = url.get('id');
    if (!id) {
        alert('ID da mentoria nao informado.');
        window.location.href = 'mentoria.html';
        return;
    }
    buscar(id);
});

async function buscar(id) {
    try {
        const retorno  = await fetch(URL_PHP + 'mentoria_get.php?id=' + id);
        const resposta = await retorno.json();

        if (resposta.status === 'ok' && resposta.data.length > 0) {
            const m = resposta.data[0];
            document.getElementById('id').value          = m.id_mentoria;
            document.getElementById('data_inicio').value = m.data_inicio ?? '';
            document.getElementById('data_fim').value    = m.data_fim ?? '';
            document.getElementById('status').value      = m.status ?? '';
            document.getElementById('objetivo').value    = m.objetivo ?? '';
        } else {
            alert('ERRO: ' + resposta.mensagem);
            window.location.href = 'mentoria.html';
        }
    } catch (erro) {
        console.error('Erro ao buscar dados da mentoria:', erro);
        alert('Erro ao comunicar com o servidor.');
    }
}

document.getElementById('enviar').addEventListener('click', () => {
    alterar();
});

async function alterar() {
    const id          = document.getElementById('id').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const data_fim    = document.getElementById('data_fim').value;
    const status      = document.getElementById('status').value.trim();
    const objetivo    = document.getElementById('objetivo').value.trim();

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
        const retorno = await fetch(URL_PHP + 'mentoria_alterar.php?id=' + id, {
            method: 'POST',
            body: fd
        });
        const resposta = await retorno.json();

        if (resposta.status === 'ok') {
            alert('SUCESSO: ' + resposta.mensagem);
            window.location.href = 'mentoria.html';
        } else {
            alert('ERRO: ' + resposta.mensagem);
        }
    } catch (erro) {
        console.error('Erro ao alterar mentoria:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}