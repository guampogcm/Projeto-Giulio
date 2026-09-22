var lista = JSON.parse(localStorage.getItem("mentoras")) || [];
var editando = -1;

function salvar() {
  var mentora = {
    id_mentora: document.getElementById("id_mentora").value,
    disponibilidade: document.getElementById("disponibilidade").value,
    area_atuacao: document.getElementById("area_atuacao").value,
    empresa: document.getElementById("empresa").value
  };

  if (editando == -1) {
    lista.push(mentora);
  } else {
    lista[editando] = mentora;
    editando = -1;
  }

  localStorage.setItem("mentoras", JSON.stringify(lista));
  document.getElementById("form").reset();
  mostrar();
}

function mostrar() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var linha = "<tr>";
    linha += "<td>" + lista[i].id_mentora + "</td>";
    linha += "<td>" + lista[i].disponibilidade + "</td>";
    linha += "<td>" + lista[i].area_atuacao + "</td>";
    linha += "<td>" + lista[i].empresa + "</td>";
    linha += "<td><button onclick='editar(" + i + ")'>Editar</button> <button onclick='excluir(" + i + ")'>Excluir</button></td>";
    linha += "</tr>";
    tabela.innerHTML += linha;
  }
}

function editar(i) {
  document.getElementById("id_mentora").value = lista[i].id_mentora;
  document.getElementById("disponibilidade").value = lista[i].disponibilidade;
  document.getElementById("area_atuacao").value = lista[i].area_atuacao;
  document.getElementById("empresa").value = lista[i].empresa;
  editando = i;
}

function excluir(i) {
  lista.splice(i, 1);
  localStorage.setItem("mentoras", JSON.stringify(lista));
  mostrar();
}

mostrar();
