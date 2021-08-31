# Desenvolvimento de temas Tray Commerce

Para desenvolver temas para Tray Commerce é necessário configurar um ambiente de desenvolvimento com algumas ferramentas que vão auxiliar no seu desenvolvimento.

Requisitos:

- Ruby
- NodeJS

Os temas Tray costumam usar Gulp como gerenciador de tarefas e Sass como preprocessdor CSS. Portanto esse workflow segue com essas ferramentas como base.

Já o HTML é feito utilizando o Twig como template engine.

Clone o repositório para sua máquina de desenvolvimento:

```shell
$ git clone https://github.com/albreis/workflow-tray-commerce-theme
```

Acesse o diretório do projeto:
```shell
$ cd workflow-tray-commerce-theme
```

Instale os pacotes NPM:
```shell
$ npm install
```

Instale o OpenCode:

```shell
# gem install opencode
```

Configure o OpenCode para trabalhar com o tema Tray:

```shell
$ opencode configure [key] [password] [theme id]
```

Os dados de acesso podem ser encontrados em https://opencode.tray.com.br/v2/developers

Baixe os arquivos do tema:

```shell
$ opencode download
```

Inicie o Gulp:

```shell
$ gulp
```

Após esses passos basta começar a editar seu template que os arquivos serão enviados automaticamente para a Tray Commerce.

Você verá logs como este:

```shell
[09:04:23] Arquivo enviado: css/theme.min.css
Done.
[09:04:44] Arquivo enviado: pages/home.html
Done.
[09:08:12] Starting 'sass'...
[09:08:12] Finished 'sass' after 4.41 ms
[09:08:15] Arquivo enviado: css/theme.min.css
Done.
```