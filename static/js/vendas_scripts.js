const modallAdd = new bootstrap.Modal(document.getElementById('modal-add-venda'));
let btnEditar = document.getElementsByClassName("editar-venda");
let produtoNaTabela = document.getElementsByClassName("id-produto");

/*
--------------------------------------------------------------------------------------
Função para obter a lista de VENDAS existente do servidor via requisição GET
--------------------------------------------------------------------------------------
*/
const getListVendas = async () => {
  let url = 'http://127.0.0.1:5000/vendas';
  fetch(url, {
    method: 'get',
  })
  .then((response) => response.json())
  .then((data) => {
    data.vendas.forEach(item => insertListVenda(item.id, item.produto, item.cliente, item.quantidade, item.valor))
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
getListVendas()
  
/*
--------------------------------------------------------------------------------------
Função para colocar um item na lista de VENDAS do servidor via requisição POST
--------------------------------------------------------------------------------------
*/
const postItemVenda = async (inputProduto, inputCliente, inputQuantidade, inputValor) => {
  const formData = new FormData();
  formData.append('produto_id', inputProduto);
  formData.append('cliente_id', inputCliente);
  formData.append('quantidade', inputQuantidade);
  formData.append('valor', inputValor);
      
  let url = 'http://127.0.0.1:5000/venda';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  })
}
  
  
/*
--------------------------------------------------------------------------------------
Função para criar os botões de excluir e editar para cada item da lista
--------------------------------------------------------------------------------------
*/
const botoesVenda = (parent) => {
  parent.className = "td-opcoes-venda";
    
  /*let editar = document.createElement("button");
  editar.innerHTML = "Editar";
  editar.className = "editar-venda";
  parent.appendChild(editar);*/
    
  let excluir = document.createElement("button");
  excluir.innerHTML = "Excluir";
  excluir.className = "excluir-venda btn btn-danger";
  parent.appendChild(excluir);
}
  
/*
--------------------------------------------------------------------------------------
Função para remover um item da lista de VENDAS de acordo com o click no botão close
--------------------------------------------------------------------------------------
*/
const removeElementVenda = () => {
  let close = document.getElementsByClassName("excluir-venda");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idVenda = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItemVenda(idVenda)
        alert("Removida!")
      }
    }
  }
}
  
/*
--------------------------------------------------------------------------------------
Função para deletar um item da lista de VENDAS do servidor via requisição DELETE
--------------------------------------------------------------------------------------
*/
const deleteItemVenda = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/venda?id=' + item;
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
Função para adicionar um novo item de VENDAS com um produto, cliente, quantidade e valor 
--------------------------------------------------------------------------------------
*/
let inputProduto = document.getElementById("newProduto");
let valorInputProduto;
let valorProduto;
let valorDePagamento;

inputProduto.addEventListener("change", () => {
  valorInputProduto = document.getElementById("newProduto").value; //pegando o id do produto
  valorProduto = produtoPorId(valorInputProduto)[4]; //pegando o valor do produto no banco
  console.log("valor do produto:", valorProduto);
  console.log("quantidade do produto no banco:", produtoPorId(valorInputProduto)[3]);
});

const newItemVenda = () => {
  let inputCliente = document.getElementById("newCliente").value;
  let inputQuantidade = document.getElementById("newQuantidade").value;
    
  let quantidadeProduto = produtoPorId(valorInputProduto)[3];
  valorDePagamento = (valorProduto * inputQuantidade);

  if (valorInputProduto === '') {
    alert("Selecione um produto da lista!");
  } else if (inputCliente === '') {
    alert("Selecione um cliente da lista!");
  } else if (isNaN(inputQuantidade)) {
    alert("O campo quantidade espera um valor numérico!");
  } else if (inputQuantidade <= 0) {
    alert("Por favor informe um valor maior que 0");
  } else if (inputQuantidade > quantidadeProduto) {
    alert("a quantidade informada é maior do que a quantidade em estoque, informe um menor valor!")
  } else {
    if(confirm("O valor da venda é de: " + valorDePagamento + "\n" + "Deseja confirmar a venda?")) {
      quantidadeProduto -= inputQuantidade;
      postItemVenda(valorInputProduto, inputCliente, inputQuantidade, valorDePagamento);
      atualizarQtdProduto(valorInputProduto, quantidadeProduto);
      alert("Venda Adicionada!");
    }
  
  }

  modallAdd.hide();

  setTimeout(() => {
    location.reload();
  }, 500);
}


const atualizarQtdProduto = async (id, quantidade) => {
  const formData = new FormData();
  formData.append("quantidade", quantidade);

  let url = "http://127.0.0.1:5000/update_quantidade_produto_pela_venda/" + id;

  fetch(url, {
    method: 'PUT',
    body: formData
  })
  .then(response => {
    response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}

  
/*
--------------------------------------------------------------------------------------
Função para inserir items na lista de VENDAS apresentada
--------------------------------------------------------------------------------------
*/
const insertListVenda = (id, produto, cliente, quantidade, valor) => {
  var venda = [id, produto, cliente, quantidade, valor];
  var table = document.getElementById('tabela-vendas');
  var row = table.insertRow();
      
  let tr; //table row
  let cel;

  for (var i = 0; i < venda.length; i++) {
    cel = row.insertCell(i);
    cel.textContent = venda[i];
    tr = cel.parentElement;
  }
  botoesVenda(row.insertCell(-1));
  document.getElementById("newProduto").value = "";
  document.getElementById("newCliente").value = "";
  document.getElementById("newQuantidade").value = "";
      
  removeElementVenda();
      
  let td = tr.children; //htmlcollection
      
  td[1].classList.add("produto");
  td[2].classList.add("cliente");

  let produtos = produtoPorIdVenda(id);

  let clientes = clientePorIdVenda(id);

  td[1].innerHTML = produtos;
  td[2].innerHTML = clientes;

}



function fazGet(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText
}

/*
Função para receber todos os clientes do banco de dados ,
para serem inseridos no select de adição de venda
*/
function recebeClientes() {
  let data = fazGet("http://127.0.0.1:5000/clientes");
  let objeto = JSON.parse(data)
  
  const arrayComplexo = Object.keys(objeto).map(chave => {
    const valor = objeto[chave];

    if (typeof valor === 'object') {
      return Object.values(valor)
    }

    return valor;
  }).reduce((acc, curr) => acc.concat(curr), []);

  let clientes = document.getElementById("newCliente");

  arrayComplexo.forEach((cliente) => {
    clientes.appendChild(new Option(cliente.nome, cliente.id));
  })
}

/*
Função para receber todos os produtos do banco de dados,
para serem inseridos no select de adição de venda
*/
function recebeProdutos() {
  let data = fazGet("http://127.0.0.1:5000/produtos");
  let objeto = JSON.parse(data)

  const arrayComplexoProdutos = Object.keys(objeto).map(chave => {
    const valor = objeto[chave];

    if (typeof valor === 'object') {
      return Object.values(valor)
    }

    return valor;
  }).reduce((acc, curr) => acc.concat(curr), []);

  let produtos = document.getElementById("newProduto");
  
  arrayComplexoProdutos.forEach((produto) => {
    if (produto.quantidade > 0){
      produtos.appendChild(new Option(produto.nome, produto.id));
    }
  })

}

recebeProdutos();
recebeClientes();

/*
Função que busca um produto a partir do id da venda, por meio da relationship.
É retornado apenas o nome do produto
*/
function produtoPorIdVenda(id) {
  let data = fazGet("http://127.0.0.1:5000/produto_por_id_venda?id=" + id);
  let resultado = JSON.parse(data);

  const arrayComplexoProduto = Object.keys(resultado).map(chave => {
    const valor = resultado[chave];

    if (typeof valor === 'object') {
      return Object.values(valor);
    }

    return valor;
  }).reduce((acc, curr) => acc.concat(curr), []);

  return arrayComplexoProduto[2];
}

/*
Função que busca um produto a partir do id resgatado do select de adição de venda
*/
function produtoPorId(id) {
  let data = fazGet("http://127.0.0.1:5000/produto_por_id?id=" + id);
  let resultado = JSON.parse(data);

  const arrayProduto = Object.keys(resultado).map(chave => {
    const valor = resultado[chave];

    if (typeof valor == 'object') {
      return Object.values(valor);
    }

    return valor;
  }).reduce((acc, curr) => acc.concat(curr), []);

  return arrayProduto;
}

/*
Função que busca um cliente a partir do id da venda, por meio da relationship.
É retornado apenas o cpf do cliente
*/
function clientePorIdVenda(id) {
  let data = fazGet("http://127.0.0.1:5000/cliente_por_id_venda?id=" + id);
  let resultado = JSON.parse(data);

  const arrayCompletoCliente = Object.keys(resultado).map(chave => {
    const valor = resultado[chave];

    if (typeof valor === 'object') {
      return Object.values(valor);
    }
    
    return valor;
  }).reduce((acc, curr) => acc.concat(curr), []);

  return arrayCompletoCliente[0];
}


/*--------------------------------------------------------------------------------------
Função para pesquisa por texto dentro da tabela Produtos
--------------------------------------------------------------------------------------
*/
const inputBusca = document.getElementById('input-busca');
const tabelaVendas = document.getElementById('tabela-vendas');

inputBusca.addEventListener('keyup', ()=> {
  let expressao = inputBusca.value.toLowerCase();

  if (expressao.length === 1) {
    return
  }

  let rows = tabelaVendas.getElementsByTagName('tr');

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