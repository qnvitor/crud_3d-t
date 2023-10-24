function calcular() {
    // Obter o valor de "resistencia"
    const resistencia = document.getElementById('resistencia').value;

    // Verificar se o valor é um número válido
    if (!isNaN(resistencia)) {
        // Multiplicar o valor de "resistencia" por 5
        const pdv = resistencia * 5;

        // Exibir o resultado no elemento "pdvDisplay"
        document.getElementById('pdvDisplay').innerHTML = pdv;
    } else {
        alert('A resistência deve ser um número válido.');
    }

    // Obter o valor de "habilidade"
    const habilidade = document.getElementById('habilidade').value;

    // Verificar se o valor é um número válido
    if (!isNaN(habilidade)) {
        // Multiplicar o valor de "habilidade" por 5
        const pdm = habilidade * 5;

        // Exibir o resultado no elemento "pdvDisplay"
        document.getElementById('pdmDisplay').innerHTML = pdm;
    } else {
        alert('A habilidade deve ser um número válido.');
    }

    // Obter o valor de "forca"
    const forca = document.getElementById('forca').value;

    // Verificar se o valor é um número válido
    if (!isNaN(forca)) {
        // Multiplicar o valor de "forca" por 5
        const pda = forca * 1;

        // Exibir o resultado no elemento "pdaDisplay"
        document.getElementById('pdaDisplay').innerHTML = pda;
    } else {
        alert('A força deve ser um número válido.');
    }
}

let fichas = JSON.parse(localStorage.getItem('fichas')) || [];
let fichaParaEditar = null;

function renderizarLista() {
    const listaFichas = document.getElementById('listaFichas');
    listaFichas.innerHTML = '';
    fichas.forEach((ficha, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${ficha.nome}, ${ficha.pontos}, ${ficha.lore}, ${ficha.forca}, ${ficha.habilidade}, ${ficha.resistencia}, ${ficha.pdf}, ${ficha.pda}, ${ficha.pdm}, ${ficha.pdv} `;
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            excluirFicha(index);
        };
        
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            carregarParaEdicao(index);
        };
        
        itemLista.appendChild(btnExcluir);
        itemLista.appendChild(btnEditar);
        listaFichas.appendChild(itemLista);
    });
}

function salvarFicha() {
    const nome = document.getElementById('nome').value;
    const pontos = document.getElementById('pontos').value;
    const lore = document.getElementById('lore').value;
    const forca = document.getElementById('forca').value;
    const habilidade = document.getElementById('habilidade').value;
    const resistencia = document.getElementById('resistencia').value;
    const pdf = document.getElementById('pdf').value;
    const pda = document.getElementById('pdaDisplay').textContent; // Obter PDA do elemento span
    const pdm = document.getElementById('pdmDisplay').textContent; // Obter PDM do elemento span
    const pdv = document.getElementById('pdvDisplay').textContent; // Obter PDV do elemento span

    if(fichaParaEditar !== null) {
        fichas[fichaParaEditar] = {nome, pontos, lore, forca, habilidade, resistencia, pdf, pda, pdm, pdv};
        fichaParaEditar = null;
        document.getElementById('btnAtualizar').style.display = 'none';
    } else {
        fichas.push({nome, pontos, lore, forca, habilidade, resistencia, pdf, pda, pdm, pdv});
    }

    localStorage.setItem('fichas', JSON.stringify(fichas));

    document.getElementById('nome').value = '';
    document.getElementById('pontos').value = '';
    document.getElementById('lore').value = '';
    document.getElementById('forca').value = '';
    document.getElementById('habilidade').value = '';
    document.getElementById('resistencia').value = '';
    document.getElementById('pdf').value = '';
    document.getElementById('pdaDisplay').textContent = '';
    document.getElementById('pdmDisplay').textContent = '';
    document.getElementById('pdvDisplay').textContent = '';

    renderizarLista();
}

function excluirFicha(index) {
    fichas.splice(index, 1);
    localStorage.setItem('fichas', JSON.stringify(fichas));
    renderizarLista();
}

function carregarParaEdicao(index) {
    fichaParaEditar = index;
    document.getElementById('nome').value = fichas[index].nome;
    document.getElementById('pontos').value = fichas[index].pontos;
    document.getElementById('lore').value = fichas[index].lore;
    document.getElementById('forca').value = fichas[index].forca;
    document.getElementById('habilidade').value = fichas[index].habilidade;
    document.getElementById('resistencia').value = fichas[index].resistencia;
    document.getElementById('pdf').value = fichas[index].pdf;
    document.getElementById('pda').value = fichas[index].pda;
    document.getElementById('pdm').value = fichas[index].pdm;
    document.getElementById('pdv').value = fichas[index].pdv;
    
    document.getElementById('btnAtualizar').style.display = 'inline-block';
}

function atualizarFicha() {
    const nome = document.getElementById('nome').value;
    const pontos = document.getElementById('pontos').value;
    const lore = document.getElementById('lore').value;
    const forca = document.getElementById('forca').value;
    const habilidade = document.getElementById('habilidade').value;
    const resistencia = document.getElementById('resistencia').value;
    const pdf = document.getElementById('pdf').value;
    const pda = document.getElementById('pda').value;
    const pdm = document.getElementById('pdm').value;
    const pdv = document.getElementById('pdv').value;

    fichas[fichaParaEditar] = {nome, pontos, lore, forca, habilidade, resistencia, pdf, pda, pdm, pdv};
    localStorage.setItem('fichas', JSON.stringify(fichas));
    
    document.getElementById('nome').value = '';
    document.getElementById('pontos').value = '';
    document.getElementById('lore').value = '';
    document.getElementById('forca').value = '';
    document.getElementById('habilidade').value = '';
    document.getElementById('resistencia').value = '';
    document.getElementById('pdf').value = '';
    document.getElementById('pda').value = '';
    document.getElementById('pdm').value = '';
    document.getElementById('pdv').value = '';
    document.getElementById('btnAtualizar').style.display = 'none';

    fichaParaEditar = null;
    renderizarLista();
}

renderizarLista();