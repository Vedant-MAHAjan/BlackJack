
//***********BlackJack ***************************/

//writing the click event in JS itself rather than what was done in cat challenge

let blackjack = {        //key used in the challenge
    "you": {"scoreSpan":"#your-blackjack-result","div":"#yourBox","score":0},
    "dealer": {"scoreSpan":"#dealer-blackjack-result","div":"#botBox","score":0},
    "cards": ["2","3","4","5","6","7","8","9","10","J","Q","K","A"],
    "cardValue":{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":10,"Q":10,"K":10,"A":[1,11]},
    "win_number" : 0,
    "loss_number" : 0,
    "draw_number" : 0,
    "isStand" : false,
    "turnsOver" : false,
};

const YOU = blackjack["you"];
const DEALER = blackjack["dealer"];

//

const hitSound = new Audio("swish.m4a");
const winSound = new Audio("cash.mp3");
const lossSound = new Audio("aww.mp3");

//button click events
document.querySelector("#blackjack-hit-button").addEventListener("click",blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click",dealerLogic);

document.querySelector("#blackjack-deal-button").addEventListener("click",blackjackDeal);

//random card dealt for player
function blackjackHit()
{
    if(blackjack["isStand"] === false)
    {
        let playerCard = randomCard();        //random card picked
        showCard(playerCard,YOU);    //card image shown
        updateScore(playerCard,YOU);       //score updated
        showScore(YOU);
    }
}


//random card dealt for bot
let card_count = 0;
function dealerLogic()    //stand button
{
    
    blackjack["isStand"] = true;
    let dealerCard = randomCard();
    showCard(dealerCard,DEALER);
    updateScore(dealerCard,DEALER);
    showScore(DEALER);
    card_count++;
    console.log("Card_count is ",card_count);

    if(card_count === 3)
    {
        blackjack["turnsOver"] = true; 
        let winner = findWinner();
        showWinner(winner);    
    }
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random()*13);
    return blackjack["cards"][randomIndex];
}

//random card shown on the image 
function showCard(newCard,activePlayer)
{
    if(activePlayer["score"] < 21)
    {
        let cardImage = document.createElement("img");
        cardImage.src = `${newCard}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

//deal button used to clear the board
function blackjackDeal()
{
    if(blackjack["turnsOver"] === true)
    {
        blackjack["isStand"] = false;
        card_count= 0;
        let yourImages = document.querySelector("#yourBox").querySelectorAll("img");  //images cleared
        let dealerImages = document.querySelector("#botBox").querySelectorAll("img");   //images cleared
        
        for(i=0; i < yourImages.length; i++)
        {
            yourImages[i].remove();
        }

        for(i=0; i < dealerImages.length; i++)
        {
            dealerImages[i].remove();
        }

        YOU["score"] = 0;
        DEALER["score"] = 0;

        document.querySelector("#your-blackjack-result").textContent = 0;
        document.querySelector("#dealer-blackjack-result").textContent = 0;

        document.querySelector("#your-blackjack-result").style.color = "white";
        document.querySelector("#dealer-blackjack-result").style.color = "white";

        document.querySelector("#blackjack-result").textContent = "Lets play!";
        document.querySelector("#blackjack-result").style.color = "black";    

        blackjack["turnsOver"] = true;
    }
    
}

//take the score of that player and update it using the cardValue dictionary and the corresponding value
function updateScore(dealtCard, activePlayer)
{
    if(dealtCard === "A")
    {
        if(activePlayer["score"] + blackjack["cardValue"][dealtCard][1] <= 21)
        {
            activePlayer["score"] += blackjack["cardValue"][dealtCard][1];
        }
        else
        {
            activePlayer["score"] += blackjack["cardValue"][dealtCard][0];
        }
    }
    else
    {
        activePlayer["score"] += blackjack["cardValue"][dealtCard];   
    }
}

function showScore(activePlayer)
{
    console.log(activePlayer["score"]);

    if(activePlayer["score"] > 21)
    {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    }
    else
    {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
    
}

//logic of finding the winner based on the scores 
function findWinner()
{
    let winner;

    //when user score is less than 21
    if(YOU["score"] <= 21)
    {
        if(DEALER["score"] > 21)
        {
            console.log(YOU["score"]);
            console.log(DEALER["score"]);
            blackjack["win_number"]++;
            winner = YOU;
        }
        else if(YOU["score"] > DEALER["score"])
        {
            console.log(YOU["score"]);
            console.log(DEALER["score"]);
            blackjack["win_number"]++;
            winner = YOU;
        }
        else if(YOU["score"] < DEALER["score"])
        {
            console.log(YOU["score"]);
            console.log(DEALER["score"]);
            blackjack["loss_number"]++;
            winner = DEALER;
        }
        else if(YOU["score"] === DEALER["score"])
        {
            console.log(YOU["score"]);
            console.log(DEALER["score"]);
            blackjack["draw_number"]++;
        }
    }
    //when user score is greater than 21
    else if(YOU["score"] > 21 && DEALER["score"] <= 21)
    {
        console.log(YOU["score"]);
        console.log(DEALER["score"]);
        blackjack["loss_number"]++;
        winner = DEALER;
    }
    //when user and dealer both have score greater than 21
    else
    {
        console.log(YOU["score"]);
        console.log(DEALER["score"]);
        blackjack["draw_number"]++;
    }

    console.log("winner is ", winner);
    return winner;
}

//displaying the winner
function showWinner(winner)
{
    if(blackjack["turnsOver"])
    {
        let message, messageColor;

        if(winner === YOU)
        {
            document.querySelector("#wins").textContent = blackjack["win_number"];
            message = "You Won!"; 
            messageColor = "purple";
            winSound.play();
        }
        else if(winner === DEALER)
        {
            document.querySelector("#losses").textContent = blackjack["loss_number"];
            message = "You Lost!";
            messageColor = "red";
            lossSound.play();
        }
        else
        {
            document.querySelector("#draws").textContent = blackjack["draw_number"];
            message = "You Drew!";
            messageColor = "black";
        }

        document.querySelector("#blackjack-result").textContent = message;
        document.querySelector("#blackjack-result").style.color = messageColor;
    }
    
}
