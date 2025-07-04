document.addEventListener("DOMContentLoaded", function () {
	const modal = document.getElementById("modal");
	const modalTitle = document.getElementById("modal-title");
	const modalBody = document.getElementById("modal-body");
	const closeBtn = document.querySelector(".close");
	const buttons = document.querySelectorAll(".button-group button");

	// Botões
	buttons[0].addEventListener("click", iniciarJogoMedia);
	buttons[1].addEventListener("click", iniciarJogoFormularioTxt);
	buttons[2].addEventListener("click", iniciarJogoNumeroSecreto);

	// Fechar modal
	closeBtn.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	// Jogo 1 - Média
	function iniciarJogoMedia() {
		modal.style.display = "block";
		modalTitle.textContent = "Jogo 1 - Média dos Números";
		modalBody.innerHTML = `
			<label for="quantidade">Quantos números você vai inserir?</label>
			<input type="number" id="quantidade" min="1" style="width: 60px;">
			<button id="confirmarQuantidade">Confirmar</button>
			<div id="inputs-container" style="margin-top:20px;"></div>
			<div id="resultado" style="margin-top:20px; font-weight:bold;"></div>
		`;

		document.getElementById("confirmarQuantidade").onclick = criarCamposNumeros;
	}

	function criarCamposNumeros() {
		const quantidade = parseInt(document.getElementById("quantidade").value);
		const inputsContainer = document.getElementById("inputs-container");
		const resultado = document.getElementById("resultado");
		inputsContainer.innerHTML = "";
		resultado.textContent = "";

		if (!Number.isInteger(quantidade) || quantidade <= 0) {
			resultado.textContent = "Quantidade inválida!";
			return;
		}

		for (let i = 0; i < quantidade; i++) {
			const input = document.createElement("input");
			input.type = "number";
			input.placeholder = `Número ${i + 1}`;
			input.style.margin = "5px";
			inputsContainer.appendChild(input);
		}

		const calcularBtn = document.createElement("button");
		calcularBtn.textContent = "Calcular Média";
		calcularBtn.style.marginTop = "15px";
		inputsContainer.appendChild(calcularBtn);

		calcularBtn.onclick = function () {
			calcularMedia(quantidade);
		};
	}

	function calcularMedia(quantidade) {
		let soma = 0;
		let validos = 0;
		const inputs = document.querySelectorAll("#inputs-container input");

		inputs.forEach((input) => {
			const valor = Number(input.value);
			if (!isNaN(valor)) {
				soma += valor;
				validos++;
			}
		});

		const resultado = document.getElementById("resultado");
		if (validos === quantidade) {
			const media = soma / quantidade;
			resultado.textContent = `A média dos números inseridos é: ${media}`;
		} else {
			resultado.textContent = "Preencha todos os campos corretamente!";
		}
	}

	// Jogo 2 - Formulario para txt
	function iniciarJogoFormularioTxt() {
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
			.addEventListener("submit", gerarArquivoTxt);
	}

	function gerarArquivoTxt(event) {
		event.preventDefault();

		const valores = [];
		for (let i = 1; i <= 5; i++) {
			const valor = document.getElementById(`valor${i}`).value.trim();
			if (valor === "") {
				alert(`O campo Valor ${i} está vazio.`);
				return;
			}
			valores.push(valor);
		}

		const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
		const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "valores.txt";
		link.click();
	}

	// Jogo 3 - Numero secreto
	let listaDeNumerosSorteados = [];
	let numeroSecreto = 0;
	let tentativas = 1;
	const numeroLimite = 10;

	function iniciarJogoNumeroSecreto() {
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

		listaDeNumerosSorteados = [];
		numeroSecreto = gerarNumeroAleatorio();
		tentativas = 1;
		exibirMensagemInicial();

		document.getElementById("jogo3-verificar").onclick = verificarChute;
		document.getElementById("jogo3-reiniciar").onclick = reiniciarJogo;
	}

	function gerarNumeroAleatorio() {
		let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

		if (listaDeNumerosSorteados.length === numeroLimite) {
			listaDeNumerosSorteados = [];
		}

		if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
			return gerarNumeroAleatorio();
		} else {
			listaDeNumerosSorteados.push(numeroEscolhido);
			return numeroEscolhido;
		}
	}

	function exibirTextoNaTela(tagId, texto) {
		document.getElementById(tagId).innerHTML = texto;
	}

	function exibirMensagemInicial() {
		exibirTextoNaTela("jogo3-titulo", "Jogo do número secreto");
		exibirTextoNaTela("jogo3-msg", "Escolha um número entre 1 e 10");
	}

	function limparCampo() {
		document.getElementById("jogo3-chute").value = "";
	}

	function verificarChute() {
		let chute = parseInt(document.getElementById("jogo3-chute").value);

		if (!Number.isInteger(chute)) {
			alert("Digite um número inteiro!");
			return;
		}

		if (chute === numeroSecreto) {
			exibirTextoNaTela("jogo3-titulo", "Acertou!");
			let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
			let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
			exibirTextoNaTela("jogo3-msg", mensagem);
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
	}

	function reiniciarJogo() {
		numeroSecreto = gerarNumeroAleatorio();
		tentativas = 1;
		limparCampo();
		exibirMensagemInicial();
		document.getElementById("jogo3-reiniciar").setAttribute("disabled", true);
	}
});
