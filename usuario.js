function listar() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvar(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

let editandoId = null; 

function adicionar(dados) {
  if (!dados.nome.trim()) return null; 

  const lista = listar();
  const novo = {
    id: Date.now(), 
    login: dados.login.trim(),
    nome: dados.nome.trim(),
    telefone: dados.telefone.trim(),
    email: dados.email.trim(),
    criadoEm: new Date().toISOString(),
  };
  lista.push(novo);
  salvar(lista);
  return novo;
}


function editar(id, dados) {
  if (!dados.nome.trim()) return; 

  const lista = listar().map((u) =>
    u.id === id
      ? {
          ...u,
          login: dados.login.trim(),
          nome: dados.nome.trim(),
          telefone: dados.telefone.trim(),
          email: dados.email.trim(),
        }
      : u
  );
  salvar(lista);
}


function remover(id) {
  salvar(listar().filter((u) => u.id !== id));
}

function removerComConfirm(id) {
  const u = listar().find((x) => x.id === id);
  if (u && confirm(`Excluir '${u.nome}'?`)) {
    remover(id);
    if (editandoId === id) {
      editandoId = null;
      form.reset();
    }
    renderLista();
  }
}


function renderLista() {
  const tabela = document.getElementById("tabela");
  const usuarios = listar();

  if (usuarios.length === 0) {
    tabela.innerHTML =
      '<tr class="vazio"><td colspan="5">Nenhum usuário.</td></tr>';
    return;
  }

  tabela.innerHTML = usuarios
    .map(
      (u) => `
    <tr data-id="${u.id}">
      <td>${u.login}</td>
      <td>${u.nome}</td>
      <td>${u.telefone}</td>
      <td>${u.email}</td>
      <td>
        <button class="btn-editar">Editar</button>
        <button class="btn-del">Excluir</button>
      </td>
    </tr>`
    )
    .join("");
}


const form = document.getElementById("form");
const inputNome = document.getElementById("nome");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    login: document.getElementById("login").value,
    nome: inputNome.value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
  };

 
  if (!dados.nome.trim()) {
    inputNome.classList.add("input-erro");
    return;
  }
  inputNome.classList.remove("input-erro");

  if (editandoId === null) {
    adicionar(dados);
  } else {
    editar(editandoId, dados);
    editandoId = null;
  }

  form.reset();
  inputNome.focus();
  renderLista();
});


document.getElementById("tabela").addEventListener("click", (e) => {
  const linha = e.target.closest("[data-id]");
  if (!linha) return;
  const id = Number(linha.dataset.id);

  if (e.target.matches(".btn-del")) {
    removerComConfirm(id);
  }

  if (e.target.matches(".btn-editar")) {
    const u = listar().find((x) => x.id === id);
    if (!u) return;

    document.getElementById("login").value = u.login;
    inputNome.value = u.nome;
    document.getElementById("telefone").value = u.telefone;
    document.getElementById("email").value = u.email;
    editandoId = id;
    inputNome.focus();
  }
});

document.addEventListener("DOMContentLoaded", () => renderLista());
