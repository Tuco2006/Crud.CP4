let jogadorasIniciais = [
    { nome: "Marta", posicao: "Atacante", clube: "Orlando Pride", estatisticas: "17 gols", foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzdSwK02gD9CFl0m4xU8HKnt6gsj1id4fJpQ&s", favorito: false },
    { nome: "Formiga", posicao: "Meio-campo", clube: "PSG", estatisticas: "200 jogos", foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdvXmyyOM8l_WLXq3yNaXxuSDb7KL2jQ-0Q&s", favorito: false }
];

let jogadoras = JSON.parse(localStorage.getItem("jogadoras"));
if (!jogadoras) {
    jogadoras = jogadorasIniciais;
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

function mostrarJogadoras() {
    const lista = document.querySelector("#jogadorasList");
    lista.innerHTML = "";

    jogadoras.forEach((j, index) => {
        const card = document.createElement("div");
        card.innerHTML = `
            <span class="favorito" onclick="favoritar(${index})">${j.favorito ? "❤️" : "Favoritar"}</span>
            <h3>${j.nome}</h3>
            <img src="${j.foto}">
            <p><b>Posição:</b> ${j.posicao}</p>
            <p><b>Clube:</b> ${j.clube}</p>
            <p><b>Estatísticas:</b> ${j.estatisticas}</p>
            <button onclick="editarJogadora(${index})">Editar</button>
            <button onclick="removerJogadora(${index})">Excluir</button>
        `;
        lista.appendChild(card);
    });
}

document.querySelector("#jogadoraForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const posicao = document.querySelector("#posicao").value;
    const clube = document.querySelector("#clube").value;
    const estatisticas = document.querySelector("#estatisticas").value;
    const foto = document.querySelector("#foto").value;

    if(nome && posicao && clube && estatisticas && foto){
        const nova = { nome, posicao, clube, estatisticas, foto, favorito: false };
        jogadoras.push(nova);
        salvar();
        alert("Jogadora adicionada com sucesso!");
        document.querySelector("#jogadoraForm").reset();
    } else {
        alert("Preencha todos os campos!");
    }
});

function editarJogadora(i) {
    let j = jogadoras[i];
    let novoNome = prompt("Editar nome:", j.nome);
    let novaPosicao = prompt("Editar posição:", j.posicao);
    let novoClube = prompt("Editar clube:", j.clube);
    let novasEstatisticas = prompt("Editar estatísticas:", j.estatisticas);
    let novaFoto = prompt("Editar URL da foto:", j.foto);

    if(novoNome && novaPosicao && novoClube && novasEstatisticas && novaFoto){
        jogadoras[i] = {
            nome: novoNome,
            posicao: novaPosicao,
            clube: novoClube,
            estatisticas: novasEstatisticas,
            foto: novaFoto,
            favorito: j.favorito
        };
        salvar();
        alert("Jogadora editada com sucesso!");
    }
}

function removerJogadora(i) {
    if(confirm("Deseja excluir essa jogadora?")) {
        jogadoras.splice(i,1);
        salvar();
        alert("Jogadora removida com sucesso!");
    }
}

function favoritar(i) {
    jogadoras[i].favorito = !jogadoras[i].favorito;
    salvar();
}

function salvar() {
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
    mostrarJogadoras();
}

function filtrar() {
    var clube = document.querySelector("#filtroClube").value.toLowerCase();
    var lista = document.querySelector("#jogadorasList");
    lista.innerHTML = "";

    for (var i = 0; i < jogadoras.length; i++) {
        var j = jogadoras[i];
        if (j.clube.toLowerCase().indexOf(clube) > -1) {
            var card = document.createElement("div");
            card.innerHTML = `
                <h3>${j.nome}</h3>
                <img src="${j.foto}">
                <p><b>Posição:</b> ${j.posicao}</p>
                <p><b>Clube:</b> ${j.clube}</p>
                <p><b>Estatísticas:</b> ${j.estatisticas}</p>
                <button onclick="editarJogadora(${i})">Editar</button>
                <button onclick="removerJogadora(${i})">Excluir</button>
            `;
            lista.appendChild(card);
        }
    }
}

mostrarJogadoras();
