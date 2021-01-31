### Dados da inscrição no processo seletivo da POLÍCIA JUDICIÁRIA CIVIL.
- Nome Completo: Alexandre Tomasi
- CPF: 03323458150
- Telefone Celular: 65992893683
- e-mail: alexandretomasi18@gmail.com


# Sistema front-end para exibir artistas e álbuns

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
No arquivo *package.json* do projeto mostra as dependencias utilizadas(*dependencies*).  
"npm install --save font-awesome"  
"npm install --save vuex"  
"npm install --save bootstrap-vue@2.0.0-rc.11"  
"npm install --save vue-gravatar"  
"npm install --save vue-router"  
"npm install --save axios"  
"npm install --save liquor-tree"  
"npm install --save vue-mq"  
"npm install sass-loader sass webpack --save-dev"  
"npm i --save lodash"  
"npm install --save vue-toasted"  
"npm install --save es6-promise"  
"npm install v-slim-dialog --save"  
"npm install save vue-plain-pagination"   
 
axios - biblioteca para requisições(requests) para back-end.  
bootstrap-vue - biblioteca para responsividade, componentes e diretivas.  
font-awesome - biblioteca de ícones.  
vue-gravatar - biblioteca com avatar para usuários sem fotos.  
vue-router - biblioteca para gerenciamento de rotas.  
vue-toasted - biblioteca para mostrar alertas na pagina.  
sass-loader - compilador CSS para transformar em JS.  
v-slim-dialog - biblioteca para modal de confirmação.  
vue-plain-pagination - biblioteca para paginação.

**Obs. Importante usar o bootstrap versão "2.0.0-rc.11" para não ocorrer alertas no console.**  
Caso queira saber a versão instalada use:   
"npm list bootstrap-vue"  
Se desejar excluir, para instalar a versão utilizada:  
"npm uninstall bootstrap-vue"  

#### Criação do projeto
Projeto criado usando a opção padrão do vue CLI.  
"vue create artistaapp"  

### Executando
Vá até a raiz do projeto dentro da pasta "artistaapp" e execute o seguinte comando:  
"npm run serve -- --port 8081"  
Pode-se alterar a porta em que o projeto irá executar conforme necessite. Devido back-end já estar utilizando a porta 8080 foi escolhido a porta 8081 para o front-end.  
**Obs. O back-end criado artistaapi permite acesso apenas da url origem "http://localhost:8081".**

### Acessando o sistema.
Abra navegador e acesse o link [http://localhost:8081/auth](http://localhost:8081/auth).  

### Descrição do Sistema
O sistema artistaapp tem como objetivo gerenciar álbuns de artistas, o usuário poderá realizar as seguintes opções:
- Buscar álbuns: Busca de álbuns com opção de filtro para nome do álbum de forma ordenada. Exibição de forma paginada.
- Inserir álbum: Inserção de um novo álbum com opção de enviar imagens da capa do álbum. 
- Editar álbum:  Busca álbuns igual a "*Buscar álbuns*" e ao clicar no álbum o usuário terá opção de inserir mais imagens ou excluir as que já estão inseridas, alterar nome do álbum e excluir álbum

- Inserir Artista: Inserção de um novo artista.
- Buscar e editar ou excluir artista: Busca artistas por nome com opção de ordenação de forma paginada, ao clicar em um artista abrirá uma tela com as opções de editar nome do artista ou exclui-lo

### Aparência visual do sistema
O sistema foi criado usando o layout de grid, são três partes **cabeçalho**, **conteúdo** e **rodapé**. 
####  Cabeçalho
O cabeçalho na parte superior informa o nome do sistema e possui dois menus.  
O primeiro menu do lado esquerdo o qual garante acesso as funcionalidades do sistema, possui o botão para esconder ou mostrar basta clicar na seta "> ou <".  
Possui um submenu em cascata, quando a tela for menor que 630px o submenu irá diminuir ficando dentro do espaço do menu.  
O segundo menu *dropdown* ao lado direito focado no usuário logado tem a opção de fazer logout e mostrar nome e foto do usuário logado.  

#### Conteúdo
A grid de conteúdo é onde mostra as páginas com funcionalidades, nela o usuário poderá fazer CRUD de artistas ou álbuns.  

#### Rodapé
A grid de rodapé localiza-se na parte de baixo da tela, com informações sobre os direitos exclusivo do autor e o ano.

### Conceitos técnicos
#### Autenticação
O sistema tem uma tela login para o usuário autenticar. Os menus do cabeçalho só serão exibidos se o usuário estiver logado no sistema.  
Ao clicar em entrar(logar) com dados corretos, o componente de autenticação irá salvar no *localStorage* as informações do usuário logado como
os tokens para comunicação com back-end e informações do usuário. Dessa forma uma vez que o usuário logou não precisará logar novamente,
 até o momento que o token de *refresh* expirar(mesmo fechando navegador) ou solicitar o *logout*.
Toda vez que o sistema for aberto no navegador será validado esses tokens para mostrar os menu, caso o token esteja expirado sera encaminhado para tela de autenticação.
#### Refresh token
Todas as requisições ao back-end necessitam de autenticação utilizando JWT(JSON Web Tokens).  
Para não ser necessario que o usuário faça login a cada expiração de token, foi feito um interceptador para atualizar esse token assim que expirar.  
Na autenticação o back-end retorna dois token, um desses tokens é o token de *refresh* que possui um tempo maior de duração. Assim foi criado um interceptador
para interceptar todas as respostas do back-end, desse modo toda vez que o token de tempo mas curto expirar (erro *forbidden* 403) o interceptador irá tentar atualizar os tokens
utilizando a api de *refresh*, caso possua sucesso os tokens no *localStorage* serão atualizados e sera refeito a consulta no back-end, retornando a resposta da requisição original 
sem que o usuário perceba, caso o token de *refresh* esteja expirado sera encaminhado para tela de autenticação.  

#### Tela de busca
As telas de buscas utilizam *sessionStorage* do navegador para salvar a informação do filtro da consulta e a ordenação,  
assim quando usuário sair da tela de busca e depois retornar os filtros continuarão, eles serão removidos do navegador quando:  
usuário fechar o navegador, remover os filtros ou quando excluir um álbum ou artista a qual havia pesquisado.  
As APIs de buscas possuem paginação, assim as telas de busca são paginadas exibindo apenas três resultados, o usuário poderá clicar na pagina em que deseja ir  
ou clicar para próxima pagina ou para anterior.  
Os três resultados listados na pagina poderão ser clicados para detalhamento, editação ou exclusão dependendo da funcionalidade.  
Ao abrir a tela de pesquisa poderá ocorrer lentidão na resposta da requisição ao back-end, assim a tela de pesquisa mostra um aguarde até a conclusão da requisição.
Ao digitar no campo de busca o sistema irá consultar no back-end, colocou-se um método para aguardar o fim da digitação por meio segundo, para assim depois fazer a requisição. Evitando de fazer varias requisições ao back-end enquanto usuario digita.

#### Tela Inserir álbuns
Na tela de inserção de álbuns o usuário poderá informar o nome do álbum, escolher um artista que está no seletor, que foi preenchido com dados vindo do banco,
 e enviar imagens da capa do álbum.  
Ao clicar em "*Inserir Álbum*" sera enviado ao back-end todas as informações e imagens.

#### Tela editar álbuns
Utiliza na primeira tela a *Tela de busca*, ao clicar em um álbum será encaminhado para tela de edição.  
Na tela de edição o usuário poderá enviar mais imagens, alterar nome do álbum ou excluir.
Ao clicar em *"Inserir mais imagens"* terá a opção de enviar uma ou mais imagens quando finalizar o sistema enviará essas imagens ao banco.
As imagens são listadas com o botão de excluir que irá imediatamente excluí-las do banco se clicado.  
Ao salvar ou excluir álbum, será encaminhado para tela de busca para edição.

### Dockerizando o projeto
Seguindo os passos para dockerizar extraídos da documentação do Vue.js utilizando o *nginx*, do seguinte site [https://br.vuejs.org/v2/cookbook/dockerize-vuejs-app.html](https://br.vuejs.org/v2/cookbook/dockerize-vuejs-app.html)  
O projeto possui um arquivo na raiz chamado DockerFile o qual possui configurações para a dockerização.  
Devido o projeto utilizar a biblioteca "*vue-router*" é necessário criar um arquivo para configurar o *nginx* o qual está na raiz do projeto. "*nginx/nginx.conf*"

Já possuindo o docker instalado no sistema operacional utilize os seguintes comandos para dockerizar:  
Compilar a imagem Docker da aplicação Vue.  
"docker build -t artistas01-app ."  

Executar a aplicação Vue em um contêiner Docker:  
"docker run -it -p 8081:81 --rm --name artistas-app-1 artistas01-app"   

**Obs. Foi utilizado a porta 8081 para executar a aplicação Vue devido ao back-end estar executando na porta 8080.**  
**O back-end criado artistaapi permite acesso apenas da url origem "http://localhost:8081".**  