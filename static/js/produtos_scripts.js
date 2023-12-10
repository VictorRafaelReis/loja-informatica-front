const modallAdd = new bootstrap.Modal(document.getElementById('modal-add-produto'));
const modalAtt = new bootstrap.Modal(document.getElementById("modal-att-produto"));

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de PRODUTOS existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListProdutos = async () => {
    let url = 'http://127.0.0.1:5000/produtos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.produtos.forEach(item => insertListProduto(item.nome, item.categoria, item.quantidade, item.valor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
    getListProdutos()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista de PRODUTOS do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItemProduto = async (inputProduto, inputCategoria, inputQuantidade, inputValor) => {
    const formData = new FormData();
    formData.append('nome', inputProduto);
    formData.append("categoria", inputCategoria);
    formData.append('quantidade', inputQuantidade);
    formData.append('valor', inputValor);
  
    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
/*const botaoDelete = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}*/

const botoesProduto = (parent) => {
  parent.className = "td-opcoes-produto";

  let editar = document.createElement("button");
  editar.innerHTML = "Editar";
  editar.className = "editar-produto btn btn-warning";
  parent.appendChild(editar);

  let excluir = document.createElement("button");
  excluir.innerHTML = "Excluir";
  excluir.className = "excluir-produto btn btn-danger";
  parent.appendChild(excluir);
}
  

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de PRODUTOS de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElementProduto = () => {
  let close = document.getElementsByClassName("excluir-produto");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItemProduto(nomeItem)
        alert("Removido!")
      }
    }
  }
}

const elementoEditTabela = () => {
  let editar = document.getElementsByClassName("editar-produto");
  let i;
  for (i = 0; i < editar.length; i++) {
    editar[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeProduto = div.getElementsByTagName('td')[0].innerHTML;
      modalAtt.show();
      carregarProduto(nomeProduto);
    }
  }
}

  
/*
--------------------------------------------------------------------------------------
Função para deletar um item da lista de PRODUTOS do servidor via requisição DELETE
--------------------------------------------------------------------------------------
*/
const deleteItemProduto = (item) => {
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

  
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item de PRODUTO com nome, categoria, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItemProduto = () => {
  let inputProduto = document.getElementById("newProduto").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputQuantidade = document.getElementById("newQuantidade").value;
  let inputValor = document.getElementById("newValor").value;
  
  if (inputProduto === '') {
    alert("Escreva o nome de um item!");
  } else if (inputCategoria === ''){
    alert("Insira o tipo de categoria do produto!");
  }else if (isNaN(inputQuantidade) || isNaN(inputValor)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertListProduto(inputProduto, inputCategoria, inputQuantidade, inputValor)
    postItemProduto(inputProduto, inputCategoria, inputQuantidade, inputValor)
    alert("Item adicionado!");
    modallAdd.hide()
  }
}

  
/*
--------------------------------------------------------------------------------------
Função para inserir items na lista de PRODUTOS apresentada
--------------------------------------------------------------------------------------
*/
const insertListProduto = (nomeProduto, categoria, quantidade, valor) => {
  var item = [nomeProduto, categoria, quantidade, valor];
  var table = document.getElementById('tabela-produtos');
  var row = table.insertRow();
  
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  /*botaoDelete(row.insertCell(-1))*/
  botoesProduto(row.insertCell(-1))
  document.getElementById("newProduto").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newQuantidade").value = "";
  document.getElementById("newValor").value = "";
  
  elementoEditTabela()
  removeElementProduto()
}


let nomeDoAlterado;

const carregarProduto = async (nome) => {
  let url = "http://127.0.0.1:5000/produto?nome=" + nome;

  nomeDoAlterado = nome;

  fetch(url, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((data) => {
    let inputProduto = document.getElementById("attProduto").value = data.nome;
    let inputCategoria = document.getElementById("attCategoria").value = data.categoria;
    let inputQuantidade = document.getElementById("attQuantidade").value = data.quantidade;
    let inputValor = document.getElementById("attValor").value = data.valor;
  })
  .catch((error) => {
    console.error('Error', error);
  })
}

const btnAttProduto = document.getElementById("btn-att-produto");

btnAttProduto.addEventListener('click', e => {
  atualizarProduto(nomeDoAlterado);
  modalAtt.hide();
  setTimeout(() => {
    location.reload();
  }, 500);
})


const atualizarProduto = async (nome) => {
  let inputProduto = document.getElementById("attProduto").value;
  let inputCategoria = document.getElementById("attCategoria").value;
  let inputQuantidade = document.getElementById("attQuantidade").value;
  let inputValor = document.getElementById("attValor").value;

  const formData = new FormData();
  formData.append("nome", inputProduto);
  formData.append("categoria", inputCategoria);
  formData.append("quantidade", inputQuantidade);
  formData.append("valor", inputValor);

  let url = "http://127.0.0.1:5000/update_produto?nome=" + nome;

  fetch(url, {
    method: 'PUT',
    body: formData
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}


/*--------------------------------------------------------------------------------------
Função para pesquisa por texto dentro da tabela Produtos
--------------------------------------------------------------------------------------
*/
const inputBusca = document.getElementById('input-busca');
const tabelaProdutos = document.getElementById('tabela-produtos');

inputBusca.addEventListener('keyup', ()=> {
  let expressao = inputBusca.value.toLowerCase();

  if (expressao.length === 1) {
    return
  }

  let rows = tabelaProdutos.getElementsByTagName('tr');

  //console.log(rows);
  for (let posicao in rows) {
    if (true === isNaN(posicao)) {
      continue;
    }
    
    let conteudoDaLinha = rows[posicao].innerHTML.toLowerCase();

    if (true === conteudoDaLinha.includes(expressao)) {
      rows[posicao].style.display = '';
    } else {
      rows[posicao].style.display = 'none';
    }
  }
});