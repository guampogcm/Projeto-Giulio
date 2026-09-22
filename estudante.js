var lista = JSON.parse(localStorage.getItem("estudantes")) || [];
var editando = -1;

function salvar() {
  var estudante = {
    id_estudante: document.getElementById("id_estudante").value,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    curso: document.getElementById("curso").value,
    periodo: document.getElementById("periodo").value,
    telefone: document.getElementById("telefone").value,
    area_interesse: document.getElementById("area_interesse").value,
    data_inicio: document.getElementById("data_inicio").value
  };

  if (editando == -1) {
    lista.push(estudante);
  } else {
    lista[editando] = estudante;
    editando = -1;
  }

  localStorage.setItem("estudantes", JSON.stringify(lista));
  document.getElementById("form").reset();
  mostrar();
}

function mostrar() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var linha = "<tr>";
    linha += "<td>" + lista[i].id_estudante + "</td>";
    linha += "<td>" + lista[i].nome + "</td>";
    linha += "<td>" + lista[i].email + "</td>";
    linha += "<td>" + lista[i].curso + "</td>";
    linha += "<td>" + lista[i].periodo + "</td>";
    linha += "<td>" + lista[i].telefone + "</td>";
    linha += "<td>" + lista[i].area_interesse + "</td>";
    linha += "<td>" + lista[i].data_inicio + "</td>";
    linha += "<td><button onclick='editar(" + i + ")'>Editar</button> <button onclick='excluir(" + i + ")'>Excluir</button></td>";
    linha += "</tr>";
    tabela.innerHTML += linha;
  }
}

function editar(i) {
  document.getElementById("id_estudante").value = lista[i].id_estudante;
  document.getElementById("nome").value = lista[i].nome;
  document.getElementById("email").value = lista[i].email;
  document.getElementById("curso").value = lista[i].curso;
  document.getElementById("periodo").value = lista[i].periodo;
  document.getElementById("telefone").value = lista[i].telefone;
  document.getElementById("area_interesse").value = lista[i].area_interesse;
  document.getElementById("data_inicio").value = lista[i].data_inicio;
  editando = i;
}

function excluir(i) {
  lista.splice(i, 1);
  localStorage.setItem("estudantes", JSON.stringify(lista));
  mostrar();
}

mostrar();
