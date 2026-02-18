'use strict'


const keys = ["♠", "♧", "♢", "♡"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameOver = false;

const dealerCards = document.getElementById("dealer-cards");
const playerCards = document.getElementById("player-cards");
const dealerScore = document.getElementById("dealer-score");
const playerScore = document.getElementById("player-score");
const message = document.getElementById("message");

const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const restart = document.getElementById("restart");




//デッキの作成
let createDeck = () => {
    deck = [];//初期化

    for(let key of keys){
        for(let value of values){
            deck.push({key, value})//キーに(♠,♧,♢,♡)、valueに数字のオブジェクト形式で配列に追加
            console.log(deck);
        }
    }
}

//カードのドロー(deckから1つ取り除く)
let draw = () => {
    let drawCard = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
    console.log("drawCard", drawCard);
    return drawCard;
}

//合計値算出
let calculateScore = (hand) => {
    let score = 0;
    let count = 0;
    hand.forEach(card => {
        if(card.value === "A"){
            count ++;
            score += 11;
            console.log("A", score)
            console.log(typeof card.value)
        }else if(card.value === "J" || card.value === "Q" || card.value === "K"){
            count ++;
            score += 10
            console.log("J or Q or K", score)
            console.log(typeof card.value)
        }else{
            count ++;
            score += parseInt(card.value);//card.valueをparseIntで整数に変換
            console.log("card.value", score)
            console.log(typeof card.value)
        }
    })
    return score;
}


//手札表示
let openHands = (hideDealerFirstCard = true) => {
    dealerCards.innerHTML = "";
    console.log("dealerCards", dealerCards.innerHTML)
    playerCards.innerHTML = "";
    console.log("playerCards", playerCards.innerHTML)

    // ディーラーのカード表示
    dealerHand.forEach((card, index) => {
        if (hideDealerFirstCard && index === 0 && !gameOver) {
            dealerCards.innerHTML += "[🂠]";
            console.log("dealerCards", dealerCards.innerHTML)
        } else {
            dealerCards.innerHTML += `[${card.key}${card.value}]`;
            console.log("dealerCards", dealerCards.innerHTML)
        }
    });

    // プレイヤーのカード表示
    playerHand.forEach(card => {
        playerCards.innerHTML += `[${card.key}${card.value}]`;
        console.log("playerCards", playerCards.innerHTML)
    });

    // 合計値を追加表示
    if (gameOver) {
        dealerCards.innerHTML += ` 合計: ${calculateScore(dealerHand)}`;
        console.log("dealerCards", dealerCards.innerHTML)
    }
    playerCards.innerHTML += ` 合計: ${calculateScore(playerHand)}`;
    console.log("playerCards", playerCards.innerHTML)
};



let checkWinner = () => {
     const playerScore = calculateScore(playerHand);
     console.log("playerScore", playerScore)
     const dealerScore = calculateScore(dealerHand);
     console.log("dealerScore", dealerScore)

        if (playerScore > 21) {
            return "Burst! LOSE";
        } else if (dealerScore > 21) {
            return "WIN!";
        } else if (playerScore > dealerScore) {
            return "WIN！";
        } else if (playerScore < dealerScore) {
            return "LOSE";
        } else {
            return "DRAW";
        }
    }

    let gameStart = () => {
        gameOver = false;
        createDeck();
        dealerHand = [draw(), draw()];
        playerHand = [draw(), draw()];
        openHands();
        message.textContent = "";
    }

    hit.addEventListener("click", () => {
        if(gameOver) return;
        playerHand.push(draw());
        console.log("playerHand", playerHand)
        openHands();

        if(calculateScore(playerHand) > 21){
            gameOver = true;
            openHands(false);
            message.textContent = checkWinner();
        }
    });

    stand.addEventListener("click", () => {
        if(gameOver) return;

        while(calculateScore(dealerHand) < 17){
            dealerHand.push(draw());
            console.log("dealerHand", dealerHand)
        }
        gameOver = true;
        openHands(false);
        message.textContent = checkWinner();
    });

    restart.addEventListener("click", gameStart);

    gameStart();
