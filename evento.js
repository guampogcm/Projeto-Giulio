var lista = JSON.parse(localStorage.getItem("eventos")) || [];
var editando = -1;

function salvar() {
  var evento = {
    id_evento: document.getElementById("id_evento").value,
    nome: document.getElementById("nome").value,
    data_evento: document.getElementById("data_evento").value
  };

  if (editando == -1) {
    lista.push(evento);
  } else {
    lista[editando] = evento;
    editando = -1;
  }

  localStorage.setItem("eventos", JSON.stringify(lista));
  document.getElementById("form").reset();
  mostrar();
}

function mostrar() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var linha = "<tr>";
    linha += "<td>" + lista[i].id_evento + "</td>";
    linha += "<td>" + lista[i].nome + "</td>";
    linha += "<td>" + lista[i].data_evento + "</td>";
    linha += "<td><button onclick='editar(" + i + ")'>Editar</button> <button onclick='excluir(" + i + ")'>Excluir</button></td>";
    linha += "</tr>";
    tabela.innerHTML += linha;
  }
}

function editar(i) {
  document.getElementById("id_evento").value = lista[i].id_evento;
  document.getElementById("nome").value = lista[i].nome;
  document.getElementById("data_evento").value = lista[i].data_evento;
  editando = i;
}

function excluir(i) {
  lista.splice(i, 1);
  localStorage.setItem("eventos", JSON.stringify(lista));
  mostrar();
}

mostrar();
