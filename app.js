const botaoTeste = document.querySelector("#botaoTeste");
const mensagem = document.querySelector("#mensagem");

botaoTeste.addEventListener("click", () => {

    mensagem.textContent =
        "JavaScript funcionando também. Podemos começar a aventura!";

    botaoTeste.textContent =
        "Funcionou!";

});
