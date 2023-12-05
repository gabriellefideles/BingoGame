let players = [];

function generateCard() {
    const playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert('Por favor, insira seu nome.');
        return;
    }

    const existingPlayer = players.find(player => player.name === playerName);
    if (existingPlayer) {
        alert('Este nome já foi utilizado. Por favor, escolha outro.');
        return;
    }

    const card = generateRandomCard();
    players.push({ name: playerName, card: card });

    displayCards();
}

function generateRandomCard() {
    const columns = ['B', 'I', 'N', 'G', 'O'];
    let card = {};

    columns.forEach(column => {
        card[column] = [];
        let startRange, endRange;

        switch (column) {
            case 'B':
                startRange = 1;
                endRange = 15;
                break;
            case 'I':
                startRange = 16;
                endRange = 30;
                break;
            case 'N':
                startRange = 31;
                endRange = 45;
                break;
            case 'G':
                startRange = 46;
                endRange = 60;
                break;
            case 'O':
                startRange = 61;
                endRange = 75;
                break;
        }

        while (card[column].length < 5) {
            let num = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
            if (card[column].indexOf(num) === -1) {
                card[column].push(num);
            }
        }
    });

    return card;
}

function displayCards() {
    const cardsContainer = document.getElementById('bingo-cards');
    cardsContainer.innerHTML = '';

    players.forEach(player => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `<p>${player.name}</p>`;

        Object.keys(player.card).forEach(column => {
            cardDiv.innerHTML += `<p>${column}: ${player.card[column].join(', ')}</p>`;
        });

        cardsContainer.appendChild(cardDiv);
    });
}

function startGame() {
    if (players.length < 2) {
        alert('É necessário pelo menos 2 jogadores para começar o jogo.');
        return;
    }

    document.getElementById('drawn-number').innerHTML = 'Número Sorteado: ';
    document.getElementById('winners').innerHTML = 'Vencedores: ';
}

function drawNumber() {
    const drawnNumber = Math.floor(Math.random() * 75) + 1;
    document.getElementById('drawn-number').innerHTML = `Número Sorteado: ${drawnNumber}`;

    checkWinners(drawnNumber);
}

function checkWinners(drawnNumber) {
    const winners = players.filter(player => {
        return player.card['B'].includes(drawnNumber) ||
               player.card['I'].includes(drawnNumber) ||
               player.card['N'].includes(drawnNumber) ||
               player.card['G'].includes(drawnNumber) ||
               player.card['O'].includes(drawnNumber);
    });

    displayWinners(winners);
}

function displayWinners(winners) {
    const winnersDiv = document.getElementById('winners');
    winnersDiv.innerHTML = 'Vencedores: ';

    winners.forEach(winner => {
        winnersDiv.innerHTML += `<p id="winner">${winner.name}</p>`;
    });
}
