var lista = JSON.parse(localStorage.getItem("usuarios")) || [];
var editando = -1;

function salvar() {
  var id = document.getElementById("id_usuario").value;
  var login = document.getElementById("login").value;
  var nome = document.getElementById("nome").value;
  var telefone = document.getElementById("telefone").value;
  var email = document.getElementById("email").value;

  var usuario = {
    id_usuario: id,
    login: login,
    nome: nome,
    telefone: telefone,
    email: email
  };

  if (editando == -1) {
    lista.push(usuario);
  } else {
    lista[editando] = usuario;
    editando = -1;
  }

  localStorage.setItem("usuarios", JSON.stringify(lista));
  document.getElementById("form").reset();
  mostrar();
}

function mostrar() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var linha = "<tr>";
    linha += "<td>" + lista[i].id_usuario + "</td>";
    linha += "<td>" + lista[i].login + "</td>";
    linha += "<td>" + lista[i].nome + "</td>";
    linha += "<td>" + lista[i].telefone + "</td>";
    linha += "<td>" + lista[i].email + "</td>";
    linha += "<td><button onclick='editar(" + i + ")'>Editar</button> <button onclick='excluir(" + i + ")'>Excluir</button></td>";
    linha += "</tr>";
    tabela.innerHTML += linha;
  }
}

function editar(i) {
  document.getElementById("id_usuario").value = lista[i].id_usuario;
  document.getElementById("login").value = lista[i].login;
  document.getElementById("nome").value = lista[i].nome;
  document.getElementById("telefone").value = lista[i].telefone;
  document.getElementById("email").value = lista[i].email;
  editando = i;
}

function excluir(i) {
  lista.splice(i, 1);
  localStorage.setItem("usuarios", JSON.stringify(lista));
  mostrar();
}

mostrar();
