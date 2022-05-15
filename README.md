# Boas vindas ao repositório do API de Blogs!

## Habilidades 

Nesse projeto, construí um back-end usando `ORM` com o pacote `sequelize` do `npm`, e fui capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`

## O que foi desenvolvido

Arquiteturei e desenvolvi uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, desenvolvi alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados.

Primeiro, criei uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, criei também uma tabela de Categorias para seus Posts e por fim a tabela de Posts foi meu foco, guardando todas as informações dos posts realizados na plataforma.

Desenvolvi uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para fazer um post é necessário usuário e login, portanto foi trabalhada a **relação entre** `user` e `post`. Também foi necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.