<h1 align="center" >Projeto Aipsi</h1>
<h3 align="center" > Painel de monitoramento de ativos da industria </h3>

<p align="center" >
<img src="https://ucarecdn.com/51a43b88-8cad-41a7-8584-3b0e42915b92/-/preview/-/quality/smart/"/>
<img src="https://ucarecdn.com/89c06126-764c-4044-b0ad-281e71c12877/-/preview/-/quality/smart/"/>
<img src="https://ucarecdn.com/c5437a9a-d068-463f-aa2a-1711d75f7943/-/preview/-/quality/smart/"/>
<img src="https://ucarecdn.com/b46f527b-5802-46be-b172-76fe6c53e469/-/preview/-/quality/smart/"/>
</p>


### Protótipo de um dashboard para gerenciamento de ativos na industria
A tela principal foi desenvolvida para mostrar de forma aninhada os ativos cadastrados nessa [api](https://aipsi.herokuapp.com/). Cada equipamento deve ser apresentado em um card contendo o status, a saúde, nome, modelo e a opção para atribuir um funcionário para manutenção. Alem do rodapé com as opções de ver detalhes, editar e deletar



### Sobre o desenvolvimento

  A idéia que norteou o desenvolvimento da aplicação foi a de mostrar o máximo de dados sobre os equipamento sem criar um ambiente poluído. Criar uma proposta que facilita a atribuição de um funcionário para verificar o equipamento mediante aos dados no card.
  E ainda fazer uma visualização de detalhes sem sair da tela principal
#
## Funcionalidades

<ul>
<li>Cadastros, atualização e deleção de equipamentos</li>
<li>Cadastro de filiais </li>
<li>Visualização de dados cadastrados atraves de cards na pagina principal</li>
</ul>

#

## Tecnologias utilizadas

- [React](https://reactjs.org/)
- [Ant Desing](https://ant.design/)
- [Highcharts](https://www.highcharts.com/)
#
## Como executar

Clone o projeto

```bash
  git clone git@github.com:enicio/special-goggles-front.git
```

Mude para as pasta raiz

```bash
  cd special-goggles-front
```

Instale as dependencias

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

```bash
  Acesse pelo endereço http://localhost:3000/ no seu nagegador
```
#

## Prerequisitos
 Esse projeto foi desnvolvido para mostar os dados dessa [api](https://aipsi.herokuapp.com/)
#

### Aprendizados
- Não conhecia a biblioteca Ant Design, gostei muito da simplicidade de uso e da qualidade da documentação.
- Utilizar o biblioteca de graficos Highchart

### Dificuldades enconttradas
- Apesar da boa documentação, em alguns momentos ficou meio abstrato em como interagir e passar dados para alguns componentes utilizados.
- Tive dificuldade tambem com a configuração com gráfico do tipo gauge com a biblioteva Highchart, pois eram muitos parametros no objeto com a configuração.

### Possiveis melhorias para o projeto
- Implementar todo o fluxo de e paginas de chamados para da usuários.
- Desenvolver o sistema de autenticação, atribuindo responsabilidades por niveis de usuários.
- Criar a funcionalidade de atualização dinâmica atraves de sockets em conjunto com o backend da aplicação.
- Refatorar algumas partes do código craindo componentes e evitar códigos duplicados.
- Implementar algum gerenciador de estados centralizados como Redux ou ContexAPI. Isso será essencial para expandir o projeto com mais telas e funcionalidades.

### Considerações finais

Fiquei contente com o resultado da implementação ate o momento. Construi um aplicação com frontend hospedado na Vercel, backend na Heroku, upload de imagens na Amazon S3 e banco de dados no Mongo Atlas. Tudo devidamente configurado com variáveis de ambiente, logo facilita muito na troca de parametros sem precisar de intervenção no código.
Tenho em mente de continuar a implementar as melhorias citadas acima para monitorar as maquinas do meu laboratório, por exemplo, minha cnc, impressora 3D e ate mesmo os meus computadores. A aquisição de dados será feita por sistemas embarcados, mas esse é um outro projeto que estou criando em paralelo e em breve terei um repositório para ele.
