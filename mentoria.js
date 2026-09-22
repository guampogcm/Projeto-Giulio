var lista = JSON.parse(localStorage.getItem("mentorias")) || [];
var editando = -1;

function salvar() {
  var mentoria = {
    id_mentoria: document.getElementById("id_mentoria").value,
    data_inicio: document.getElementById("data_inicio").value,
    data_fim: document.getElementById("data_fim").value,
    status: document.getElementById("status").value,
    objetivo: document.getElementById("objetivo").value
  };

  if (editando == -1) {
    lista.push(mentoria);
  } else {
    lista[editando] = mentoria;
    editando = -1;
  }

  localStorage.setItem("mentorias", JSON.stringify(lista));
  document.getElementById("form").reset();
  mostrar();
}

function mostrar() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var linha = "<tr>";
    linha += "<td>" + lista[i].id_mentoria + "</td>";
    linha += "<td>" + lista[i].data_inicio + "</td>";
    linha += "<td>" + lista[i].data_fim + "</td>";
    linha += "<td>" + lista[i].status + "</td>";
    linha += "<td>" + lista[i].objetivo + "</td>";
    linha += "<td><button onclick='editar(" + i + ")'>Editar</button> <button onclick='excluir(" + i + ")'>Excluir</button></td>";
    linha += "</tr>";
    tabela.innerHTML += linha;
  }
}

function editar(i) {
  document.getElementById("id_mentoria").value = lista[i].id_mentoria;
  document.getElementById("data_inicio").value = lista[i].data_inicio;
  document.getElementById("data_fim").value = lista[i].data_fim;
  document.getElementById("status").value = lista[i].status;
  document.getElementById("objetivo").value = lista[i].objetivo;
  editando = i;
}

function excluir(i) {
  lista.splice(i, 1);
  localStorage.setItem("mentorias", JSON.stringify(lista));
  mostrar();
}

mostrar();
