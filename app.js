document.addEventListener("DOMContentLoaded", function () {
    const botaoTeste = document.getElementById("botaoTeste");
    const mensagem = document.getElementById("mensagem");

    if (!botaoTeste) {
        console.error("Botão #botaoTeste não encontrado.");
        return;
    }

    botaoTeste.addEventListener("click", function () {
        botaoTeste.textContent = "Funcionou!";

        if (mensagem) {
            mensagem.textContent =
                "JavaScript funcionando também. Podemos começar a aventura!";
        }
    });
});
