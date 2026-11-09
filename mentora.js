// Quando a pagina terminar de carregar, busca as mentoras no banco
document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

// READ - busca todas as mentoras (fetch GET simples, sem parametros)
async function buscar() {
    const retorno  = await fetch('../php/mentora_get.php');
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        preencherTabela(resposta.data);
    } else {
        // status 'nok' = nao ha registros no banco
        document.getElementById('lista').innerHTML =
            '<p class="mensagem-vazia">Nenhuma mentora cadastrada.</p>';
    }
}

// Monta a tabela HTML com o array que veio do PHP (resposta.data)
// nome e email vem da tabela usuario (JOIN feito no mentora_get.php)
function preencherTabela(tabela) {
    let html = `
        <table class="tabela-centro">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Disponibilidade</th>
                <th>Área de Atuação</th>
                <th>Empresa</th>
                <th>Ações</th>
            </tr>`;

    for (const m of tabela) {
        html += `
            <tr>
                <td>${m.id_mentoras}</td>
                <td>${m.nome}</td>
                <td>${m.email}</td>
                <td>${m.disponibilidade}</td>
                <td>${m.area_atuacao}</td>
                <td>${m.empresa ?? ''}</td>
                <td class="acoes">
                    <a href="mentora_alterar.html?id=${m.id_mentoras}"><button type="button">Editar</button></a>
                    <button type="button" class="btn-excluir" onclick="excluir(${m.id_mentoras})">Excluir</button>
                </td>
            </tr>`;
    }

    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}

// DELETE - envia o ID pela URL (GET) para o PHP excluir
async function excluir(id) {
    if (!confirm('Deseja realmente excluir esta mentora?')) {
        return; // usuario cancelou
    }

    const retorno  = await fetch('../php/mentora_excluir.php?id=' + id);
    const resposta = await retorno.json();

    alert(resposta.mensagem);
    if (resposta.status == 'ok') {
        buscar(); // recarrega a lista com os dados atualizados do banco
    }
}
