const modalAtt = new bootstrap.Modal(document.getElementById('modal-att-cliente'));
const modallAdd = new bootstrap.Modal(document.getElementById('modal-add-cliente'));

/*
--------------------------------------------------------------------------------------
Função para obter a lista de CLIENTES existente do servidor via requisição GET
--------------------------------------------------------------------------------------
*/
const getListClientes = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => insertListCliente(item.nome, item.telefone, item.email, item.cpf))
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
getListClientes()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista de CLIENTES do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItemCliente = async (inputNome, inputTelefone, inputEmail, inputCpf) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('telefone', inputTelefone);
    formData.append('email', inputEmail);
    formData.append('cpf', inputCpf);
    
    let url = 'http://127.0.0.1:5000/cliente';
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
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const botoesCliente = (parent) => {
    parent.className = "td-opcoes-cliente";
  
    let editar = document.createElement("button");
    editar.innerHTML = "Editar";
    editar.className = "editar-cliente btn btn-warning";
    parent.appendChild(editar);
  
    let excluir = document.createElement("button");
    excluir.innerHTML = "Excluir";
    excluir.className = "excluir-cliente btn btn-danger";
    parent.appendChild(excluir);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de CLIENTES de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElementCliente = () => {
    let close = document.getElementsByClassName("excluir-cliente");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const cpfCliente = div.getElementsByTagName('td')[3].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItemCliente(cpfCliente)
          alert("Removido!")
        }
      }
    }
}

const elementoEditTabela = () => {
  let editar = document.getElementsByClassName("editar-cliente");
  let i;
  for (i = 0; i < editar.length; i++) {
    editar[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpfCliente = div.getElementsByTagName('td')[3].innerHTML;
      modalAtt.show();
      carregarCliente(cpfCliente)
    }
  }
}


/*
--------------------------------------------------------------------------------------
Função para deletar um item da lista de CLIENTES do servidor via requisição DELETE
--------------------------------------------------------------------------------------
*/
const deleteItemCliente = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/delete?cpf=' + item;
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
  Função para adicionar um novo item de CLIENTE com nome, telefone, email e cpf 
  --------------------------------------------------------------------------------------
*/
const newItemCliente = () => {
    let inputCliente = document.getElementById("newCliente").value;
    let inputTelefone = document.getElementById("newTelefone").value;
    let inputemail = document.getElementById("newEmail").value;
    let inputCpf = document.getElementById("newCpf").value;
  
    if (inputCliente === '') {
      alert("Escreva o nome do cliente!");
    } else if (inputCpf === '') {
      alert("Informe o CPF do cliente!");
    } else if (isNaN(inputTelefone) || isNaN(inputCpf)) {
      alert("Os dados Telefone e/ou CPF precisam ser números!");
    } else {
      insertListCliente(inputCliente, inputTelefone, inputemail, inputCpf)
      postItemCliente(inputCliente, inputTelefone, inputemail, inputCpf)
      /*editarCliente(inputCliente, inputTelefone, inputemail, inputCpf)*/
      alert("Cliente Adicionado!");
    }

    modallAdd.hide();
}

/*
--------------------------------------------------------------------------------------
Função para inserir items na lista de CLIENTES apresentada
--------------------------------------------------------------------------------------
*/
const insertListCliente = (nomeCliente, telefone, email, cpf) => {
    var cliente = [nomeCliente, telefone, email, cpf];
    var table = document.getElementById('tabela-clientes');
    var row = table.insertRow();
    
    for (var i = 0; i < cliente.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = cliente[i];
    }
    /*botaoDelete(row.insertCell(-1))*/
    botoesCliente(row.insertCell(-1))
    document.getElementById("newCliente").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newCpf").value = "";
    elementoEditTabela()
    //editarElementCliente()
    removeElementCliente()
  
  }


/*
--------------------------------------------------------------------------------------
Função para editar um cliente já existente
--------------------------------------------------------------------------------------
*/

let cpfDoAlterado;

const carregarCliente = async (cpf) => {
  let url = 'http://127.0.0.1:5000/cliente?cpf=' + cpf;
  
  cpfDoAlterado = cpf;

  fetch(url, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((data) => {
    let inputCliente = document.getElementById("attCliente").value = data.nome;
    let inputTelefone = document.getElementById("attTelefone").value = data.telefone;
    let inputemail = document.getElementById("attEmail").value = data.email;
    let inputCpf = document.getElementById("attCpf").value = data.cpf;
  })
  .catch((error) => {
    console.error('Error', error);
  });
}

const btnAttCliente = document.getElementById("btn-att-cliente");

btnAttCliente.addEventListener('click', e => {
  atualizarCliente(cpfDoAlterado);
  modalAtt.hide();
  setTimeout(() => {
    location.reload();
  }, 500);
})


const atualizarCliente = async (cpf) => {
  let inputCliente = document.getElementById("attCliente").value;
  let inputTelefone = document.getElementById("attTelefone").value;
  let inputemail = document.getElementById("attEmail").value;
  let inputCpf = document.getElementById("attCpf").value;

  const formData = new FormData();
  formData.append("nome", inputCliente);
  formData.append("telefone", inputTelefone);
  formData.append("email", inputemail);
  formData.append("cpf", inputCpf);

  let url = 'http://127.0.0.1:5000/update_cliente?cpf=' + cpf;

  fetch(url, {
    method: 'PUT',
    body: formData
  }).then(response => {
    return response.json();
  }).catch((error) => {
    console.error('Error:', error);
  })
}


const inputBusca = document.getElementById('input-busca');
const tabelaClientes = document.getElementById('tabela-clientes');

inputBusca.addEventListener('keyup', ()=> {
  let expressao = inputBusca.value.toLowerCase();

  if (expressao.length === 1) {
    return
  }

  let rows = tabelaClientes.getElementsByTagName('tr');

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