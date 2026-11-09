// estudante.js
// Tela de LISTA: busca os estudantes no banco (READ) e permite excluir (DELETE).
// O JS nao acessa o banco direto: ele chama os arquivos PHP com fetch.

// Quando a pagina terminar de carregar, busca os estudantes no banco
document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

// READ - busca todos os estudantes (fetch GET simples, sem parametros)
async function buscar() {
    const retorno  = await fetch('../php/estudante_get.php');
    const resposta = await retorno.json(); // { status, mensagem, data }

    if (resposta.status == 'ok') {
        preencherTabela(resposta.data);
    } else {
        // status 'nok' = nao ha registros no banco
        document.getElementById('lista').innerHTML =
            '<p class="mensagem-vazia">Nenhum estudante cadastrado.</p>';
    }
}

// Monta a tabela HTML com o array que veio do PHP (resposta.data)
function preencherTabela(tabela) {
    let html = `
        <table class="tabela-centro">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Curso</th>
                <th>Período</th>
                <th>Telefone</th>
                <th>Área de Interesse</th>
                <th>Data Início</th>
                <th>Ações</th>
            </tr>`;

    // Para cada estudante (e) do array, cria uma linha <tr>
    // ?? '' mostra vazio em vez de "null" quando o campo nao foi preenchido
    for (const e of tabela) {
        html += `
            <tr>
                <td>${e.id_estudante}</td>
                <td>${e.nome}</td>
                <td>${e.email ?? ''}</td>
                <td>${e.curso ?? ''}</td>
                <td>${e.periodo ?? ''}</td>
                <td>${e.telefone ?? ''}</td>
                <td>${e.area_interesse ?? ''}</td>
                <td>${formatarData(e.data_inicio)}</td>
                <td class="acoes">
                    <!-- Editar abre outra pagina levando o id na URL -->
                    <a href="estudante_alterar.html?id=${e.id_estudante}"><button type="button">Editar</button></a>
                    <button type="button" class="btn-excluir" onclick="excluir(${e.id_estudante})">Excluir</button>
                </td>
            </tr>`;
    }

    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}

// O banco devolve a data como 'AAAA-MM-DD'; aqui mostramos como 'DD/MM/AAAA'
function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// DELETE - envia o ID pela URL (GET) para o PHP excluir
async function excluir(id) {
    if (!confirm('Deseja realmente excluir este estudante?')) {
        return; // usuario cancelou
    }

    const retorno  = await fetch('../php/estudante_excluir.php?id=' + id);
    const resposta = await retorno.json();

    alert(resposta.mensagem);
    if (resposta.status == 'ok') {
        buscar(); // recarrega a lista com os dados atualizados do banco
    }
}
