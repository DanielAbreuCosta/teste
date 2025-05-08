class Usuario {
  constructor(nome, idade, email) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
  }

  exibirDados() {
    return `${this.nome} - ${this.idade} anos - ${this.email}`;
  }
}

const usuarios = [];

document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;

  const novoUsuario = new Usuario(nome, idade, email);
  usuarios.push(novoUsuario);

  atualizarLista();
  this.reset();
});

function atualizarLista() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "<h2>Usuários Cadastrados:</h2>";
  usuarios.forEach((usuario, index) => {
    lista.innerHTML += `<p>${index + 1}. ${usuario.exibirDados()}</p>`;
  });
}
