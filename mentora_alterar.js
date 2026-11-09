document.addEventListener('DOMContentLoaded', async () => {
    const url = new URLSearchParams(window.location.search); 
    const id  = url.get('id');
    await carregarUsuarios(); 
    buscar(id);              
});

// Busca os usuarios no banco (via PHP) e monta as opcoes do <select>
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

async function buscar(id) {
    const retorno  = await fetch('../php/mentora_get.php?id=' + id);
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        const reg = resposta.data[0]; // o PHP devolve um array com 1 registro
        document.getElementById('id_usuario').value      = reg.id_usuario;
        document.getElementById('area_atuacao').value    = reg.area_atuacao;
        document.getElementById('empresa').value         = reg.empresa ?? '';
        document.getElementById('disponibilidade').value = reg.disponibilidade;
        document.getElementById('id').value              = id;
    } else {
        alert('ERRO: ' + resposta.mensagem);
        window.location.href = 'mentora.html';
    }
}

document.getElementById('enviar').addEventListener('click', () => {
    alterar();
});

async function alterar() {
    const id = document.getElementById('id').value;

    const fd = new FormData();
    fd.append('id_usuario',      document.getElementById('id_usuario').value);
    fd.append('area_atuacao',    document.getElementById('area_atuacao').value);
    fd.append('empresa',         document.getElementById('empresa').value);
    fd.append('disponibilidade', document.getElementById('disponibilidade').value);

    const retorno = await fetch('../php/mentora_alterar.php?id=' + id, {
        method: 'POST',
        body:   fd
    });
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        alert('SUCESSO: ' + resposta.mensagem);
        window.location.href = 'mentora.html';
    } else {
        alert('ERRO: ' + resposta.mensagem);
    }
}
