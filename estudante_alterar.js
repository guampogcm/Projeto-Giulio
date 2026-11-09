// estudante_alterar.js
// Tela de ALTERAR: 1) busca o estudante pelo id da URL e preenche o form
//                  2) ao salvar, envia os dados novos para o PHP (UPDATE)

// Quando a pagina carrega, le o id da URL (ex: estudante_alterar.html?id=5)
document.addEventListener('DOMContentLoaded', () => {
    const url = new URLSearchParams(window.location.search);
    const id  = url.get('id');
    buscar(id);
});

// Busca 1 estudante no banco e coloca os valores nos inputs
async function buscar(id) {
    const retorno  = await fetch('../php/estudante_get.php?id=' + id);
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        const reg = resposta.data[0]; // o PHP devolve um array com 1 registro
        // ?? '' evita aparecer "null" no input quando o campo esta vazio no banco
        document.getElementById('nome').value           = reg.nome;
        document.getElementById('email').value          = reg.email ?? '';
        document.getElementById('curso').value          = reg.curso ?? '';
        document.getElementById('periodo').value        = reg.periodo ?? '';
        document.getElementById('telefone').value       = reg.telefone ?? '';
        document.getElementById('area_interesse').value = reg.area_interesse ?? '';
        document.getElementById('data_inicio').value    = reg.data_inicio ?? ''; // 'AAAA-MM-DD' ja e o formato do input date
        document.getElementById('id').value             = id;
    } else {
        // id invalido ou inexistente: avisa e volta para a lista
        alert('ERRO: ' + resposta.mensagem);
        window.location.href = 'estudante.html';
    }
}

document.getElementById('enviar').addEventListener('click', () => {
    alterar();
});

async function alterar() {
    const id = document.getElementById('id').value; // id guardado no input hidden

    const fd = new FormData();
    fd.append('nome',           document.getElementById('nome').value);
    fd.append('email',          document.getElementById('email').value);
    fd.append('curso',          document.getElementById('curso').value);
    fd.append('periodo',        document.getElementById('periodo').value);
    fd.append('telefone',       document.getElementById('telefone').value);
    fd.append('area_interesse', document.getElementById('area_interesse').value);
    fd.append('data_inicio',    document.getElementById('data_inicio').value);

    // O id vai na URL (o PHP le com $_GET) e os dados vao no body (o PHP le com $_POST)
    const retorno = await fetch('../php/estudante_alterar.php?id=' + id, {
        method: 'POST',
        body:   fd
    });
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        alert('SUCESSO: ' + resposta.mensagem);
        window.location.href = 'estudante.html';
    } else {
        alert('ERRO: ' + resposta.mensagem);
    }
}
