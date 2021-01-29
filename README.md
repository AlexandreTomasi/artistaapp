### Dados da inscrição no processo seletivo da POLÍCIA JUDICIÁRIA CIVIL.
- Nome Completo: Alexandre Tomasi
- CPF: 03323458150
- Telefone Celular: 65992893683
- email: alexandretomasi18@gmail.com


# Sistema front-end para exibir artistas e albuns

### Arquitetura
- node v10.19.0
- npm versão 6.14.4
- @vue/cli 4.5.10

### Ferramentas
- Visual Studio Code 1.25.1

### Configuração inicial
O sistema operacional necessita ter as seguintes bibliotecas instaladas:

#### nodejs
"apt install nodejs"

#### npm
Instalar o npm [link](https://www.hostinger.com.br/tutoriais/instalar-node-js-ubuntu/)  
"apt install npm"  
#### Instalação do CLI do vue:  
"npm i -g @vue/cli"  
#### Instalação de dependencias
"npm install --save font-awesome"  
"npm install --save vuex"  
"npm install --save bootstrap-vue"  
"npm install --save vue-gravatar"  
"npm install --save vue-router"  
"npm install --save axios"  
"npm install --save liquor-tree"  
"npm install --save vue-mq"  
"npm install sass-loader sass webpack --save-dev"  
"npm i --save lodash"  
"npm install --save vue-toasted"  
"npm install --save es6-promise"  
 
axios - biblioteca para requisições(requests) para back-end.  
bootstrap-vue - bilbioteca para responsividade, componentes e diretivas.  
font-awesome - biblioteca de icones.  
vue-gravatar - biblioteca com avatar para usuarios sem fotos.  
vue-router - bliblioteca para gerenciamento de rotas.  
vue-toasted - biblioteca para mostrar alertas na pagina.  
sass-loader - compilador CSS para transformar em JS.  

#### Criação do projeto
Projeto criado usando a opção padrão do vue CLI.  
"vue create artistaapp"  

### Executando
Vá até a raiz do projeto dentro da pasta "artistaapp" e execute o seguinte comando:  
"npm run serve -- --port 8081"  
Pode-se alterar a porta em que o projeto irá executar conforme necessite. Devido back-end já estar utilizando a porta 8080 foi escolhido a porta 8081 para o front-end.

### Acessando o sistema.
Abra navegador e acesse o link [http://localhost:8081/auth](http://localhost:8081/auth).  

### Descrição do Sistema
O sistema artistaapp tem como objetivo gerenciar álbuns de artistas, o usuario poderá realizar as seguintes opções:
- Buscar álbuns: Busca de álbuns com opção de filtro para nome do álbum de forma ordenada. Exibição de forma paginada.
- Inserir álbum: Inserção de um novo álbum com opção de enviar imagens da capa do album. 
- Editar álbum:  Busca álbuns igual a "*Buscar álbuns*" e ao clicar no álbum o usuario terá opção de inserir mais imagens ou excluir as que já estão inseridas, alterar nome do álbum e excluir álbun

- Inserir Artista: Inserção de um novo artista.
- Buscar e editar ou excluir artista: Busca artistas por nome com opção de ordenação de forma paginada, ao clicar em um artista abrirá uma tela com as opçõpes de editar nome do artista ou exclui-lo

### Aparencia visual do sistema
O sistema foi criado usando o layout de grid, são três partes **cabeçalho**, **conteúdo** e **rodapé**. 
####  Cabeçalho
O cabeçalho na parte superior informa o nome do sistema e possui dois menus.  
O primeiro menu do lado esquerdo o qual garante acesso as funcionalidades do sistema, possui o botão para esconder ou mostrar basta clicar na seta "> ou <".  
Possui um sub-menu em cascata, quando a tela for menor que 630px o sub-menu irá diminuir ficando dentro do espaço do menu.  
O segundo menu dropdown ao lado direito focado no usuario logado tem a opção de fazer logout e mostrar nome e foto do usuario logado.  

#### Conteúdo
A grid de conteúdo é onde mostra as páginas com funcionalidades, nela o usuario poderá fazer CRUD de artistas ou álbuns.  

#### Rodapé
A grid de rodapé localiza-se na parte de baixo da tela, com informações sobre os direitos exclusivo do autor e o ano.

### Conceitos técnicos
#### Autenticação
O sistema tem uma tela login para o usuario autenticar. Os menus do cabeçalho só serão exibidos se o usuario estiver logado no sistema.  
Ao clicar em entrar(logar) com dados corretos, o componente de autenticação irá salvar no localStorage as informações do usuario logado como
os tokens para comunicação com back-end e informações do usuario. Dessa forma uma vez que o usuario logou não precisará logar novamente
 até o token de refresh expirar(mesmo fechando navegador) ou solicitar o deslogamento.
Toda vez que o sistema for aberto no navegador será validado esses tokens para mostrar os menu, caso o token esteja expirado sera encaminhado para tela de autenticação.
#### Refresh token
Todas as requisições ao back-end necessitam de autenticação utilizando JWT(JSON Web Tokens).  
Para não ser necessario que o usuario faça login a cada expiração de token, foi feito um interceptador para atualizar esse token assim que expirar.  
Na autenticação o back-end retorna dois token, um desses tokens é o token de refresh que possui um tempo maior de duração. Assim foi criado um interceptador
para interceptar todas as respostas do back-end, desse modo toda vez que o token de tempo mas curto expirar (erro forbidden 403) o interceptador irá tentar atualizar os tokens
utilizando a api de refresh, caso possua sucesso os tokens no localStorage serão atualizados e sera refeito a consulta no back-end, retornando a resposta da requisição original 
sem que o usuario perceba, caso o token de refresh esteja expirado sera encaminhado para tela de autenticação.  

#### Tela de busca
As telas de buscas utilizam sessionStorage do navegador para salvar a informação do filtro da consulta e a ordenação,  
assim quando usuario sair da tela de busca e depois retornar os filtros continuarão, eles serão removidos do navegador quando  
usuario fechar o navegador, remover os filtros ou quando excluir um album ou artista a qual havia pesquisado.  
As APIs de buscas possuem paginação, assim as telas de busca são paginadas exibindo apenas três resultados, o usuario podera clicar na pagina em que deseja ir  
ou clicar para proxima pagina ou para anterior.  
Os três resultados listados na pagina poderão ser clicados para detalhadamento, editação ou excluzão dependendo da funcionalidade.  
Ao abrir a tela de pesquisa poderá ocorrer lentidao na resposta da requisição ao back-end, assim a tela de pesquisa mostra um aguarde até a conclusão da requisiçao.

#### Tela de inserção de álbuns
Na tela de inserção de álbuns o usuario poderá informar o nome do álbum, escolher um artista que está no select, que foi preenchido com dados vindo do banco,
 e enviar imagens da capa do álbum.  
Ao clicar em "*Inserir Álbum*" sera enviado ao back-end todas as informações e imagens.

#### Tela de inserção de álbuns
Utiliza na primeira tela a *Tela de busca*, ao clicar em um album será encaminhado para tela de edição.  
Na tela de edição o usuario poderá enviar mais imagens, alterar nome do album ou excluir.
Ao clicar em *"Inserir mais imagens"* terá a opção de enviar uma ou mais imagens quando finalizar o sistema enviará essas imagens ao banco.
As imagens são listadas com o botão de excluir que irá imediatamente exclui-las do banco se clicado.  

