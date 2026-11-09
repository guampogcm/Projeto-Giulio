document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
});

async function carregarUsuarios() {
    const retorno  = await fetch('../php/mentora_usuarias.php');
    const resposta = await retorno.json();

    let html = '<option value="">Selecione...</option>';
    if (resposta.status == 'ok') {
        for (const u of resposta.data) {
            html += `<option value="${u.id_usuario}">${u.nome}</option>`;
        }
    }
    document.getElementById('id_usuario').innerHTML = html;
}

// Ao clicar em Salvar, chama a funcao novo()
document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo() {
    // Monta o FormData com os valores digitados no formulario
    const fd = new FormData();
    fd.append('id_usuario',      document.getElementById('id_usuario').value);
    fd.append('area_atuacao',    document.getElementById('area_atuacao').value);
    fd.append('empresa',         document.getElementById('empresa').value);
    fd.append('disponibilidade', document.getElementById('disponibilidade').value);

    // Envia para o PHP via POST (o PHP le com $_POST)
    const retorno = await fetch('../php/mentora_novo.php', {
        method: 'POST',
        body:   fd
    });

    // Le o JSON devolvido pelo PHP { status, mensagem, data }
    const resposta = await retorno.json();

    // Verifica o status e age conforme o resultado
    if (resposta.status == 'ok') {
        alert('SUCESSO: ' + resposta.mensagem);
        window.location.href = 'mentora.html'; // volta para a lista
    } else {
        alert('ERRO: ' + resposta.mensagem);
    }
}
