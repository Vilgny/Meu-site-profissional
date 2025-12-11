# 🚀 LS Digitalize - Site Profissional (Modelo Agência Moderna)

Este projeto é um site de página única (single page) em HTML, CSS e JS puro, seguindo o modelo de agência moderna, com foco em conversão e responsividade.

## ⚙️ Configuração Rápida

### 1. Trocar Logo (.site-logo)

1.  Coloque sua imagem de logo (ex: `logo.png` ou `logo.svg`) dentro da pasta `img/`.
2.  Abra o arquivo `index.html`.
3.  Localize a tag `<img>` dentro da seção `<header>`:

    ```html
    <img src="img/logo.png" alt="LS Digitalize - Criação de Sites" class="site-logo">
    ```

4.  Altere o `src` e o `alt` para o nome do seu arquivo e da sua empresa. A classe **`.site-logo`** já garante o tamanho e a responsividade corretos no `style.css`.

### 2. Conectar WhatsApp

O link para o WhatsApp está em dois locais principais:

1.  **Header/CTA Principal/CTA Final:** No `index.html`, localize todos os links que começam com `https://wa.me/` e substitua o número:

    ```html
    <a href="[https://wa.me/5584921488749](https://wa.me/5584921488749)" class="btn btn-primary btn-cta pulse-effect" target="_blank">
        Fale com um Especialista Agora!
    </a>
    ```

    **Altere `5584921488749`** pelo seu número completo (código do país + DDD + número, sem espaços ou traços).

### 3. Formulário de Contato (Desativado Nessa versão)

O formulário usa o serviço **Formspree** para enviar mensagens sem a necessidade de um backend.

1.  Crie uma conta gratuita no Formspree (https://formspree.io/).
2.  Crie um novo formulário para obter o seu ID exclusivo (ex: `f/SEU_ID_UNICO`).
3.  No `index.html`, localize a tag `<form>` e substitua o URL no atributo `action`:

    ```html
    <form id="contact-form" class="contact-form" action="[https://formspree.io/f/SEU_ID_FORMSPREE](https://formspree.io/f/SEU_ID_FORMSPREE)" method="POST">
    ```

    **Substitua `SEU_ID_FORMSPREE`** pelo seu ID Formspree real.

### 4. Portfólio (Classe `.portfolio-img`)

1.  Coloque as imagens do seu portfólio na pasta `img/`.
2.  No `index.html`, na seção `#portfolio`, localize os elementos `<img>`:

    ```html
    <img src="img/portfolio-01.jpg" alt="Exemplo de projeto 1 - Design Antes e Depois" class="portfolio-img" loading="lazy">
    ```

3.  Altere o `src` e o `alt`. **Mantenha a classe `.portfolio-img`** em cada imagem para garantir que o estilo e a funcionalidade do Modal sejam aplicados corretamente.

## 🎨 Animações

O site inclui animações sutis de "scroll reveal" (fade-in + slide-up) em todas as seções.

* **Para desativar todas as animações:**
    No arquivo `index.html`, adicione ou certifique-se de que a classe `no-animations` esteja na tag `<body>`:
    ```html
    <body class="no-animations">
    ```

* **Para ativar as animações:**
    Simplesmente remova a classe `no-animations` da tag `<body>`:
    ```html
    <body>
    ```

## 📝 Licença e Fontes

* **Licença:** Código aberto, use e modifique como desejar.
* **Fonte:** A fonte utilizada é **Inter** (via Google Fonts), licenciada sob a Open Font License.
