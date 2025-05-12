let editando = false;
let itemEditandoIndex = null;
let contatos = JSON.parse(localStorage.getItem("contatos")) || [];

const form = document.getElementById("contact-form");
const contactList = document.getElementById("contact-list");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submit-btn");

// LOGIN
function fazerLogin() {
  const senha = document.getElementById("password").value;
  if (senha === "1234") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
  } else {
    alert("Senha incorreta!");
  }
}

// SALVAR
function salvarContatos() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

// RENDERIZAR
function renderizarContatos(filtro = "") {
  contactList.innerHTML = "";
  contatos
    .filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((contato, index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <span>${contato.nome} | ${contato.email} | ${contato.telefone}</span>
        <div class="actions">
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">🗑️</button>
        </div>
      `;

      item.querySelector(".edit-btn").addEventListener("click", () => {
        nameInput.value = contato.nome;
        emailInput.value = contato.email;
        phoneInput.value = contato.telefone;
        editando = true;
        itemEditandoIndex = index;
        submitBtn.textContent = "Salvar Edição";
      });

      item.querySelector(".delete-btn").addEventListener("click", () => {
        contatos.splice(index, 1);
        salvarContatos();
        renderizarContatos(searchInput.value);
      });

      contactList.appendChild(item);
    });
}

// FORM SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = nameInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = phoneInput.value.trim();

  if (!nome || !email || !telefone) return;

  if (editando) {
    contatos[itemEditandoIndex] = { nome, email, telefone };
    editando = false;
    itemEditandoIndex = null;
    submitBtn.textContent = "Cadastrar";
  } else {
    contatos.push({ nome, email, telefone });
  }

  salvarContatos();
  renderizarContatos(searchInput.value);
  form.reset();
});

// BUSCA
searchInput.addEventListener("input", () => {
  renderizarContatos(searchInput.value);
});

// MODO ESCURO
document.getElementById("modo-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// EXPORTAR CONTATOS
document.getElementById("export-btn").addEventListener("click", () => {
  const texto = contatos.map(c => `${c.nome} - ${c.email} - ${c.telefone}`).join("\n");
  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contatos.txt";
  link.click();
});

// Inicialização
renderizarContatos();
