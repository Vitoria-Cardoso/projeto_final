document.addEventListener("DOMContentLoaded", function () {
	const modal = document.getElementById("modal");
	const modalTitle = document.getElementById("modal-title");
	const modalBody = document.getElementById("modal-body");
	const closeBtn = document.querySelector(".close");
	const buttons = document.querySelectorAll(".button-group button");

	// Jogo 1 - Média dos Números
	buttons[0].addEventListener("click", () => {
		modal.style.display = "block";
		modalTitle.textContent = "Jogo 1 - Média dos Números";

		modalBody.innerHTML = `
            <label for="quantidade">Quantos números você vai inserir?</label>
            <input type="number" id="quantidade" min="1" style="width: 60px;">
            <button id="confirmarQuantidade">Confirmar</button>
            <div id="inputs-container" style="margin-top:20px;"></div>
            <div id="resultado" style="margin-top:20px; font-weight:bold;"></div>
        `;

		document.getElementById("confirmarQuantidade").onclick = function () {
			const quantidade = Number(document.getElementById("quantidade").value);
			const inputsContainer = document.getElementById("inputs-container");
			const resultado = document.getElementById("resultado");
			resultado.textContent = "";
			inputsContainer.innerHTML = "";

			if (isNaN(quantidade) || quantidade <= 0) {
				resultado.textContent = "Quantidade inválida!";
				return;
			}

			// Cria os campos de input
			for (let i = 0; i < quantidade; i++) {
				const input = document.createElement("input");
				input.type = "number";
				input.placeholder = `Número ${i + 1}`;
				input.style.margin = "5px";
				inputsContainer.appendChild(input);
			}

			// Botão para calcular a média
			const calcularBtn = document.createElement("button");
			calcularBtn.textContent = "Calcular Média";
			calcularBtn.style.display = "block";
			calcularBtn.style.marginTop = "15px";
			inputsContainer.appendChild(calcularBtn);

			calcularBtn.onclick = function () {
				let soma = 0;
				let validos = 0;
				const inputs = inputsContainer.querySelectorAll('input[type="number"]');
				inputs.forEach((input) => {
					const valor = Number(input.value);
					if (!isNaN(valor)) {
						soma += valor;
						validos++;
					}
				});
				if (validos === quantidade) {
					resultado.textContent =
						"A média dos números inseridos é: " + soma / quantidade;
				} else {
					resultado.textContent = "Preencha todos os campos corretamente!";
				}
			};
		};
	});

	// Jogo 2 - Formulário para TXT
	buttons[1].addEventListener("click", () => {
		modal.style.display = "block";
		modalTitle.textContent = "Jogo 2 - Formulário para TXT";

		modalBody.innerHTML = `
            <form id="formulario">
                <div style="display:flex; flex-direction:column; gap:10px; align-items:center;">
                    <input type="text" id="valor1" placeholder="Valor 1" required>
                    <input type="text" id="valor2" placeholder="Valor 2" required>
                    <input type="text" id="valor3" placeholder="Valor 3" required>
                    <input type="text" id="valor4" placeholder="Valor 4" required>
                    <input type="text" id="valor5" placeholder="Valor 5" required>
                    <button type="submit">Baixar TXT</button>
                </div>
            </form>
        `;

		document
			.getElementById("formulario")
			.addEventListener("submit", function (e) {
				e.preventDefault();

				const valores = [];
				for (let i = 1; i <= 5; i++) {
					const valor = document.getElementById(`valor${i}`).value.trim();
					if (valor === "") {
						alert(`O campo Valor ${i} está vazio.`);
						return;
					}
					valores.push(valor);
				}

				const conteudo = valores
					.map((v, i) => `Valor ${i + 1}: ${v}`)
					.join("\n");
				const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = "valores.txt";
				link.click();
			});
	});

	// Jogo 3 - Número Secreto no Modal
	buttons[2].addEventListener("click", () => {
		modal.style.display = "block";
		modalTitle.textContent = "Jogo 3 - Número Secreto";
		modalBody.innerHTML = `
        <h3 id="jogo3-titulo">Jogo do número secreto</h3>
        <p id="jogo3-msg">Escolha um número entre 1 e 10</p>
        <input type="number" id="jogo3-chute" min="1" max="10" style="margin:10px 0;">
        <br>
        <button id="jogo3-verificar">Verificar</button>
        <button id="jogo3-reiniciar" disabled>Reiniciar</button>
    `;

		let listaDeNumerosSorteados = [];
		const numeroLimite = 10;
		let numeroSecreto = gerarNumeroAleatorio();
		let tentativas = 1;

		function exibirTextoNaTela(tagId, texto) {
			document.getElementById(tagId).innerHTML = texto;
		}

		function exibirMensagemInicial() {
			exibirTextoNaTela("jogo3-titulo", "Jogo do número secreto");
			exibirTextoNaTela("jogo3-msg", "Escolha um número entre 1 e 10");
		}

		function gerarNumeroAleatorio() {
			let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
			let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

			if (quantidadeDeElementosNaLista == numeroLimite) {
				listaDeNumerosSorteados = [];
			}
			if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
				return gerarNumeroAleatorio();
			} else {
				listaDeNumerosSorteados.push(numeroEscolhido);
				return numeroEscolhido;
			}
		}

		function limparCampo() {
			document.getElementById("jogo3-chute").value = "";
		}

		document.getElementById("jogo3-verificar").onclick = function () {
			let chute = document.getElementById("jogo3-chute").value;

			if (chute == numeroSecreto) {
				exibirTextoNaTela("jogo3-titulo", "Acertou!");
				let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
				let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
				exibirTextoNaTela("jogo3-msg", mensagemTentativas);
				document.getElementById("jogo3-reiniciar").removeAttribute("disabled");
			} else {
				if (chute > numeroSecreto) {
					exibirTextoNaTela("jogo3-msg", "O número secreto é menor");
				} else {
					exibirTextoNaTela("jogo3-msg", "O número secreto é maior");
				}
				tentativas++;
				limparCampo();
			}
		};

		document.getElementById("jogo3-reiniciar").onclick = function () {
			numeroSecreto = gerarNumeroAleatorio();
			limparCampo();
			tentativas = 1;
			exibirMensagemInicial();
			document.getElementById("jogo3-reiniciar").setAttribute("disabled", true);
		};

		exibirMensagemInicial();
	});

	// Fechar modal
	closeBtn.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
});
