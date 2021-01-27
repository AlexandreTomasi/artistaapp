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
Abra navegador e acesse o link [http://localhost:8081/auth](http://localhost:8081/auth)