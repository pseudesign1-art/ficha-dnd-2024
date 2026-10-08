document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
   ABRIR E FECHAR FICHA
================================================== */

if (abrirLyria) {

    abrirLyria.addEventListener("click", function (evento) {

        if (evento.target.closest(".botao-opcoes")) {
            return;
        }

        document.body.classList.add("ficha-aberta");

        paginaFicha.classList.add("ativa");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


if (voltarPersonagens) {

    voltarPersonagens.addEventListener("click", function () {

        document.body.classList.remove("ficha-aberta");

        paginaFicha.classList.remove("ativa");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ==================================================
   ABAS DA FICHA
================================================== */

abasFicha.forEach(function (aba) {

    aba.addEventListener("click", function () {

        const destino = aba.dataset.aba;


        abasFicha.forEach(function (botao) {
            botao.classList.remove("ativa");
        });


        conteudosAba.forEach(function (conteudo) {
            conteudo.classList.remove("ativo");
        });


        aba.classList.add("ativa");


        const conteudoDestino =
            document.getElementById("aba-" + destino);


        if (conteudoDestino) {
            conteudoDestino.classList.add("ativo");
        }

    });

});


/* ==================================================
   PONTOS DE VIDA
================================================== */

controlesPV.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const alteracao =
            Number(botao.dataset.pv);


        pvAtual += alteracao;


        if (pvAtual < 0) {
            pvAtual = 0;
        }


        if (pvAtual > pvMaximo) {
            pvAtual = pvMaximo;
        }


        pvAtualElemento.textContent =
            pvAtual;


        const porcentagem =
            (pvAtual / pvMaximo) * 100;


        barraVidaFicha.style.width =
            porcentagem + "%";

    });

});
    
    const itensMenu = document.querySelectorAll(".menu-item");
    const paginas = document.querySelectorAll(".pagina");

    const tituloPagina = document.getElementById("tituloPagina");

    const modalCriar = document.getElementById("modalCriar");
    const criarPersonagem = document.getElementById("criarPersonagem");
    const cardNovoPersonagem = document.getElementById("cardNovoPersonagem");

    const fecharModal = document.getElementById("fecharModal");
    const cancelarModal = document.getElementById("cancelarModal");

    const formPersonagem = document.getElementById("formPersonagem");
    const nomePersonagem = document.getElementById("nomePersonagem");

    const gradePersonagens = document.getElementById("gradePersonagens");

    const botaoMenuMobile =
        document.getElementById("botaoMenuMobile");

    const sidebar = document.querySelector(".sidebar");

    const abrirLyria = document.getElementById("abrirLyria");
const paginaFicha = document.getElementById("paginaFicha");
const voltarPersonagens = document.getElementById("voltarPersonagens");

const abasFicha = document.querySelectorAll(".aba-ficha");
const conteudosAba = document.querySelectorAll(".conteudo-aba");

const controlesPV = document.querySelectorAll(".controle-pv");
const pvAtualElemento = document.getElementById("pvAtual");
const barraVidaFicha = document.getElementById("barraVidaFicha");

let pvAtual = 38;
const pvMaximo = 38;

    /* NAVEGAÇÃO PRINCIPAL */

    const titulos = {
        personagens: "Meus personagens",
        campanhas: "Campanhas",
        biblioteca: "Biblioteca"
    };


    itensMenu.forEach(function (item) {

        item.addEventListener("click", function () {

            const pagina = item.dataset.pagina;

            itensMenu.forEach(function (botao) {
                botao.classList.remove("ativo");
            });

            item.classList.add("ativo");


            paginas.forEach(function (secao) {
                secao.classList.remove("ativa");
            });


            const paginaDestino =
                document.getElementById("pagina-" + pagina);

            if (paginaDestino) {
                paginaDestino.classList.add("ativa");
            }


            tituloPagina.textContent = titulos[pagina];


            if (window.innerWidth <= 760) {
                sidebar.classList.remove("aberta");
            }

        });

    });


    /* MENU MOBILE */

    botaoMenuMobile.addEventListener("click", function () {
        sidebar.classList.toggle("aberta");
    });


    /* MODAL */

    function abrirModal() {

        modalCriar.classList.add("aberto");

        setTimeout(function () {
            nomePersonagem.focus();
        }, 100);

    }


    function fecharModalCriacao() {

        modalCriar.classList.remove("aberto");

        formPersonagem.reset();

    }


    criarPersonagem.addEventListener("click", abrirModal);

    cardNovoPersonagem.addEventListener("click", abrirModal);

    fecharModal.addEventListener(
        "click",
        fecharModalCriacao
    );

    cancelarModal.addEventListener(
        "click",
        fecharModalCriacao
    );


    modalCriar.addEventListener("click", function (evento) {

        if (evento.target === modalCriar) {
            fecharModalCriacao();
        }

    });


    document.addEventListener("keydown", function (evento) {

        if (
            evento.key === "Escape" &&
            modalCriar.classList.contains("aberto")
        ) {
            fecharModalCriacao();
        }

    });


    /* CRIAÇÃO TEMPORÁRIA DE PERSONAGEM */

    formPersonagem.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nome = nomePersonagem.value.trim();

        if (!nome) {
            return;
        }


        const inicial =
            nome.charAt(0).toUpperCase();


        const novoCard = document.createElement("article");

        novoCard.className = "card-personagem";

        novoCard.innerHTML = `
            <div class="retrato-personagem">

                <span>${inicial}</span>

                <div class="nivel-personagem">
                    Nível 5
                </div>

            </div>

            <div class="card-conteudo">

                <div class="card-topo">

                    <div>
                        <h2>${escaparHTML(nome)}</h2>
                        <p>Classe não definida</p>
                    </div>

                    <button
                        class="botao-opcoes"
                        aria-label="Opções"
                    >
                        •••
                    </button>

                </div>

                <div class="vida">

                    <div class="vida-texto">
                        <span>Pontos de Vida</span>
                        <strong>-- / --</strong>
                    </div>

                    <div class="barra-vida">
                        <div
                            class="barra-vida-atual"
                            style="width: 0%;"
                        ></div>
                    </div>

                </div>

                <div class="card-detalhes">
                    <span>Sem antecedente</span>
                    <span>CA --</span>
                    <span>+3 Prof.</span>
                </div>

            </div>
        `;


        gradePersonagens.insertBefore(
            novoCard,
            cardNovoPersonagem
        );


        fecharModalCriacao();

    });


    /* EVITA INSERÇÃO DE HTML PELO CAMPO DE NOME */

    function escaparHTML(texto) {

        const elemento = document.createElement("div");

        elemento.textContent = texto;

        return elemento.innerHTML;

    }

});
