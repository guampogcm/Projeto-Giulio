var lista = JSON.parse(localStorage.getItem("mentoras")) || []; // || -> OU, se não houver nada no localStorage, cria uma lista vazia
var editando = -1; // -1 -> não está editando nenhum item

function gerarNovoId() { // essa funnção serve para gerar um novo ID para cada mentora cadastrada, pois o ID é único e não pode se repetir
  // Função para gerar um novo ID
  if (lista.length === 0) {
    return 1; // se a lista estiver vazia, o primeiro ID será 1
  }
  let novoId = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== i > novoId) {
      novoId = lista[i].id;
    }
  }
  return novoId + 1; // essa parte serve para pegar o maior ID da lista e somar 1, assim o próximo ID será único
}

  function salvar() {
    // Função para salvar os dados do formulário
    var mentora = {
      // toda essa parte do código é para pegar os valores do formulário e colocar em um objeto mentora
      id: gerarNovoId(),
      nome: document.getElementById("nome").value,
      disponibilidade: document.getElementById("disponibilidade").value,
      area_atuacao: document.getElementById("area_atuacao").value,
      empresa: document.getElementById("empresa").value,
    };

    if (editando == -1) {
      lista.push(mentora); // Se não estiver editando, adiciona a mentora na lista
    } else {
      lista[editando] = mentora;
      editando = -1;
    }

    localStorage.setItem("mentoras", JSON.stringify(lista)); // o .setitem aqui serve para salvar a lista no localStorage, o JSON.stringify é para transformar a lista em uma string, pois o localStorage só aceita strings
    document.getElementById("form").reset(); // o .reset aqui serve para limpar o formulário após salvar os dados
    mostrar();
  }

  function mostrar() {
    var tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    for (var i = 0; i < lista.length; i++) {
      // aqui serve para adicionar o item salvo da lista e o .length serve para pegar o tamanho da lista, ou seja, quantos itens tem na lista
      var linha = "<tr>";
      linha += "<td>" + lista[i].id + "</td>";
      linha += "<td>" + lista[i].nome + "</td>";
      linha += "<td>" + lista[i].disponibilidade + "</td>";
      linha += "<td>" + lista[i].area_atuacao + "</td>";
      linha += "<td>" + lista[i].empresa + "</td>";
      linha +=
        "<td><button onclick='editar("+ i +")'>Editar</button> <button onclick='excluir("+ i +")'>Excluir</button></td>";
      linha += "</tr>";
      tabela.innerHTML += linha;
    }
  }
  mostrar(); // o mostrar fica fora da funcao mostrar para que a tabela seja exibida assim que a página for carregada, sem precisar clicar em nenhum botão

  function editar(i) { 
    // função para editar o item da lista de mentorasa
    document.getElementById("nome").value = lista[i].nome;
    document.getElementById("disponibilidade").value = lista[i].disponibilidade;
    document.getElementById("area_atuacao").value = lista[i].area_atuacao;
    document.getElementById("empresa").value = lista[i].empresa;
    editando = i;
    mostrar();
  }

  function excluir(i) {
    // função para excluir o item da lista de mentoras.
    lista.splice(i, 1);
    localStorage.setItem("mentoras", JSON.stringify(lista));
    mostrar();
  }