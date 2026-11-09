// js/usuario.js
// FRONT: captura os dados, envia ao PHP com fetch + FormData e mostra o resultado.
// O JavaScript NÃO acessa o banco; toda comunicação passa pelos arquivos PHP.

// Caminho da pasta dos arquivos PHP (ajuste conforme a estrutura de pastas do grupo)
const URL_PHP = "../php/";

let editandoId = null; // null = cadastrando | número = id_usuario em edição
let usuarios = [];     // cópia local da última listagem (só para preencher o form)

const form = document.getElementById("form");
const inputNome = document.getElementById("nome");

// Evita que dados digitados quebrem o HTML da tabela
function esc(texto) {
  const d = document.createElement("div");
  d.textContent = texto ?? "";
  return d.innerHTML;
}

// READ - lista os usuários (GET)
async function listar() {
  const tabela = document.getElementById("tabela");
  try {
    const resposta = await fetch(URL_PHP + "usuario_get.php");
    const json = await resposta.json();

    if (json.status !== "ok") {
      usuarios = [];
      tabela.innerHTML =
        '<tr class="vazio"><td colspan="5">Nenhum usuário.</td></tr>';
      return;
    }

    usuarios = json.data;
    tabela.innerHTML = usuarios
      .map(
        (u) => `
      <tr data-id="${u.id_usuario}">
        <td>${esc(u.login)}</td>
        <td>${esc(u.nome)}</td>
        <td>${esc(u.telefone)}</td>
        <td>${esc(u.email)}</td>
        <td>
          <button class="btn-editar">Editar</button>
          <button class="btn-del">Excluir</button>
        </td>
      </tr>`
      )
      .join("");
  } catch (erro) {
    tabela.innerHTML =
      '<tr class="vazio"><td colspan="5">Erro ao consultar o servidor.</td></tr>';
  }
}

// CREATE / UPDATE - envia o formulário (POST com FormData)
async function salvar(dados) {
  const formData = new FormData();
  formData.append("login", dados.login);
  formData.append("nome", dados.nome);
  formData.append("telefone", dados.telefone);
  formData.append("email", dados.email);

  // Cadastro: usuario_novo.php | Edição: usuario_alterar.php?id=...
  const url =
    editandoId === null
      ? URL_PHP + "usuario_novo.php"
      : URL_PHP + "usuario_alterar.php?id=" + editandoId;

  try {
    const resposta = await fetch(url, { method: "POST", body: formData });
    const json = await resposta.json();
    alert(json.mensagem);

    if (json.status === "ok") {
      editandoId = null;
      form.reset();
      inputNome.focus();
      listar();
    }
  } catch (erro) {
    alert("Erro ao comunicar com o servidor.");
  }
}

// DELETE - exclui pelo id (GET)
async function excluir(id) {
  const u = usuarios.find((x) => Number(x.id_usuario) === id);
  if (!u || !confirm(`Excluir '${u.nome}'?`)) return;

  try {
    const resposta = await fetch(URL_PHP + "usuario_excluir.php?id=" + id);
    const json = await resposta.json();
    alert(json.mensagem);

    if (json.status === "ok") {
      if (editandoId === id) {
        editandoId = null;
        form.reset();
      }
      listar();
    }
  } catch (erro) {
    alert("Erro ao comunicar com o servidor.");
  }
}

// Envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    login: document.getElementById("login").value.trim(),
    nome: inputNome.value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    email: document.getElementById("email").value.trim(),
  };

  if (!dados.nome) {
    inputNome.classList.add("input-erro");
    return;
  }
  inputNome.classList.remove("input-erro");

  salvar(dados);
});

// Cliques nos botões Editar / Excluir da tabela
document.getElementById("tabela").addEventListener("click", (e) => {
  const linha = e.target.closest("[data-id]");
  if (!linha) return;
  const id = Number(linha.dataset.id);

  if (e.target.matches(".btn-del")) {
    excluir(id);
  }

  if (e.target.matches(".btn-editar")) {
    const u = usuarios.find((x) => Number(x.id_usuario) === id);
    if (!u) return;

    document.getElementById("login").value = u.login;
    inputNome.value = u.nome;
    document.getElementById("telefone").value = u.telefone;
    document.getElementById("email").value = u.email;
    editandoId = id;
    inputNome.focus();
  }
});

document.addEventListener("DOMContentLoaded", listar);
