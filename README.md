# Projeto Loja de Informática - Front-End:
  Este projeto foi desenvolvido com o intuito de ser um dos métodos de avaliação para a disciplina de desenvolvimento full-stack básico da pós graduação da PUC-Rio.
  Ele consiste em um sistema de gerenciamento de uma loja que venda produtos de informática e afins. Assim, permitindo a gestão de clientes, produtos e vendas.

# Instalação e Configuração:
  1 - Para que este front-end funcione normalmente será necessária a instalação e configuração da sua API back-end.
      Assim faz-se necessário seguir os passos descritos em loja-informatica-back-end.

  2 - Realizado o procedimento acima, será necessário clonar este repositório, para que tenha acesso aos seus arquivos e pastas.
  
    2.1 - git clone https://github.com/VictorRafaelReis/loja-informatica-front.git

  3 - uma vez clonado o repositório, execute a página index.html em seu navegador para ter acesso ao projeto.
      
      3.1 - Uma forma de execução é por meio do terminal, utilizando o comando "python -m http.server 9000".
            Após executado o comando, em seu navegador de preferência colar a seguinte url, "http://127.0.0.1:9000/static/html/index.html"
      
      3.2 - Outra forma de execução é, caso utilize o editor vscode, uma forma mais prática de execução é por meio da extensão Live Server,
            onde é necessário apenas abrir o arquivo .html desejado e clicar na opção "Go Live" no canto inferior direito da tela.

# Funcionalidades e Execução do Projeto:
  O projeto dispõe de 3 áreas diferentes. A área de Clientes, Produtos e Vendas.

  # Clientes:
    Ao entrar na área de Clientes, que pode ser acessada clicando no item "Clientes", no menu localizado a baixo do título 
    da página em azul.
    Caso exista algum cliente cadastrado no banco de dados, e que esteja sendo recebido via API, ele será exibido em forma 
    de tabela ao centro da tela,
    contendo seus dados: nome, telefone, email e cpf.

    Nessa mesma tabela contendo os clientes, existe o campo opções, contendo os botões "Editar" e "Excluir". Caso o botão
    "Editar" seja pressionado, será aberta a tela de edição contendo os dados do seu respectivo cliente, nessa área de 
    edição, o usuário pode optar por todos ou qual campo deseja modificar deste cliente, após realizadas as modificações 
    é necessário o clique no botão "Salvar", localizado no canto inferior direito desta mesma área de edição.
    Caso não deseje modificar nenhum campo do cliente, basta apenas pressionar o botão "Fechar", localizado ao lado 
    do botão salvar, ou no "X", localizado no canto superior direito da tela de edição.

    Caso o botão "Excluir" seja pressionado, será exibido um alerta pedindo a confirmação de exclusão do cliente que,
    caso confirmado, será deletado do banco de dados, e não será mais exibido na lista.

    Por fim, existe também o botão "Adicionar Cliente", localizado no canto direito abaixo do menu. Ao ser pressionado,
    será exibida a área de adição de cliente, contendo os campos nome, que espera receber valores de texto, o campo de
    telefone, que espera receber valores numéricos, o campo email, que espera receber valores de texto e por fim,
    o campo cpf, que espera receber valores numéricos. Após preenchidos os campos o usuário deverá clicar no botão 
    "Salvar", localizado no canto inferior direito da área de adição. Após adicionado o cliente, o novo cliente será 
    exibido na lista de clientes.

  # Produtos:
    A área de Produtos possue a mesma lógica de funcionamento que a de cliente. A única diferença são nos campos exibidos
    na tabela e nos formulários de adição de novo produto ou atualização de um produto já existente. Que são os seguintes:
    nome, categoria, quantidade e valor unitário. Nos campos de adição de novo produto, ou atualização de produto os 
    campos nome, categoria, quantidade e valor, esperam receber, respectivamente, valores de texto e numéricos. 
    Com ressalva no campo categoria da adição de um novo produto, onde o usuário deverá selecionar dentre alguma das 
    categorias já existentes.

  # Vendas:
    A área de vendas, assim como as áreas de clientes e produtos, também possue uma lista contendo todas as vendas realizadas,
    com os campos: ID da venda, produto, cliente, quantidade e valor. Porém nas opções da lista só existe o botão "Excluir".

    Quanto a adição de uma nova venda. A mesma só poderá ser realizada caso exista algum produto ou cliente, previamente 
    cadastrado no sistema. Ao clicar no botão "Adicionar Venda", o usuário deverá selecionar o produto a que a venda se refere,
    o cliente que estará realizando a compra e a quantidade de itens comprados nesta venda. Ao clicar em "Salvar", será
    exibida uma mensagem informando o valor total da venda, e se deseja realizar a mesma. Caso confirmada a venda será realizada
    e exibida na lista de vendas. E o produto relacionado aquela venda tera a sua quantidade em estoque reduzida pelo valor da 
    quantidade da venda. Caso algum produto esteja com quantidade 0 em estoque, ele não será exibido no select produto na área 
    de adição de uma nova venda.
