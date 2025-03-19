document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-article");
  const titleInput = document.getElementById("article-title");
  const contentInput = document.getElementById("article-content");
  const imageInput = document.getElementById("article-image");
  const articlesList = document.getElementById("articles-list");
  const themeToggle = document.getElementById("toggle-theme");

  // Carregar artigos salvos
  function loadArticles() {
      articlesList.innerHTML = "";
      const articles = JSON.parse(localStorage.getItem("articles")) || [];
      articles.forEach((article, index) => {
          const articleDiv = document.createElement("div");
          articleDiv.classList.add("article");
          articleDiv.innerHTML = `
              <h3>${article.title}</h3>
              <p>${article.content}</p>
              ${article.image ? `<img src="${article.image}" alt="Imagem do artigo">` : ""}
              <button onclick="deleteArticle(${index})">Excluir</button>
          `;
          articlesList.appendChild(articleDiv);
      });
  }

  // Salvar novo artigo
  saveButton.addEventListener("click", () => {
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      const file = imageInput.files[0];

      if (title && content) {
          const reader = new FileReader();
          reader.onload = function(event) {
              const imageBase64 = event.target.result;

              const articles = JSON.parse(localStorage.getItem("articles")) || [];
              articles.push({ title, content, image: imageBase64 });
              localStorage.setItem("articles", JSON.stringify(articles));

              titleInput.value = "";
              contentInput.value = "";
              imageInput.value = "";
              loadArticles();
          };

          if (file) {
              reader.readAsDataURL(file);
          } else {
              const articles = JSON.parse(localStorage.getItem("articles")) || [];
              articles.push({ title, content, image: null });
              localStorage.setItem("articles", JSON.stringify(articles));
              titleInput.value = "";
              contentInput.value = "";
              loadArticles();
          }
      }
  });

  // Excluir artigo
  window.deleteArticle = function(index) {
      let articles = JSON.parse(localStorage.getItem("articles"));
      articles.splice(index, 1);
      localStorage.setItem("articles", JSON.stringify(articles));
      loadArticles();
  };

  // Alternar tema claro/escuro
  themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
  });

  loadArticles();
});
