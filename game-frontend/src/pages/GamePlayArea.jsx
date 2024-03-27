import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardImage from "../assets/img/card.png";
import defuseCardImg from "../assets/img/defuseCard.jpg";
import explodeCard from "../assets/img/explodeCard.png";
import shuffleCard from "../assets/img/shuffleCard.png";
import catCard from "../assets/img/catcard.jpg";
import Popover from "../components/Popover";
import {editUserDetail, getUserDetail, updateUserPoints,} from "../redux/slice/userSlice";

let processComplete = true;

const GamePlayArea = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [deck, setDeck] = useState([]);
  const [defuseCards, setDefuseCards] = useState([]);
  const [openedCard, setOpenedCard] = useState("");

 
  const cards = ["CAT", "DEFUSE", "SHUFFLE", "EXPLODE"];  // game cards defined

  useEffect(() => {
    dispatch(getUserDetail()); //fetching user details
    props.setIsLobby(false);
  }, []);

  useEffect(() => {
    if (!user.deck) return; //updating game
    updateGameState();
  }, [user]);

  const updateUserState = (data) => {
    const { deck, defuseCards, openedCard, gameStatus } = data;
    
    dispatch(                 // update users details in local storage
      editUserDetail({
        username: user?.username,
        matchesWon:
          gameStatus === "won"
            ? Number(user?.matchesWon + 1)
            : user?.matchesWon,
        deck,
        defuseCards,
        openedCard,
      })
    );

    
    if (gameStatus === "won") {             //updating points of users in db
      dispatch(                       
        updateUserPoints({
          username: user?.username,
          matchesWon: user?.matchesWon + 1,
        })
      );
    }
  };

  const sendDataToUpdate = (deck, defuseCards, openedCard, gameStatus) => {
    let data = { deck, defuseCards, openedCard, gameStatus };
    updateUserState(data);
  };

  const updateGameState = () => {
    //to update game state on every user action
    if (user?.deck?.length < 5 && user?.deck?.length > 0) {
      setDeck(user?.deck);
      setDefuseCards(user.defuseCards);
      setOpenedCard(user?.openedCard);
    } else if (user?.deck.length === 5) {
      setDeck(user?.deck);
      setDefuseCards([]);
      setOpenedCard("");
    } else {
      setDeck(generateRandomDeck());
      setDefuseCards([]);
      setOpenedCard("");
    }
  };

  const generateRandomDeck = () => {
    //to generate 5 random numbers from 0 to 3
    const c1 = Math.floor(Math.random() * 4);
    const c2 = Math.floor(Math.random() * 4);
     const c3 = Math.floor(Math.random() * 4);
     const c4 = Math.floor(Math.random() * 4);
    const c5 = Math.floor(Math.random() * 4);

    //making random array by putting random numbers
    let randromDeck = [cards[c1], cards[c2], cards[c3], cards[c4], cards[c5]];

    
    let shuffleCount = 0;
    randromDeck = randromDeck.map((card) => {        // filtering shuffle cards if it is more than 1
      if (card === "SHUFFLE") {
        shuffleCount++;
        if (shuffleCount > 1) {
          card = "CAT";
        }
      }
      return card;
    });
    return randromDeck;
  };

  
  const showMessageAndReset = (msg, btnText) => {    //display popover after shuffle ,game over, game won
    setPopupVisible(true);
    setPopupData({ message: msg, btnText });
  };

  //to reveal cards after click card deck
  const revealCard = () => {
    if (!processComplete) return;
    processComplete = false;

    //removing openedCard card from deck
    let cards = [...deck];
    const poppedCard = cards.pop();
    setOpenedCard(poppedCard);
    //updating deck
    setDeck([...cards]);

    //if poppedcard is shuffle card then reset deck
    if (poppedCard === "SHUFFLE") {
      setTimeout(() => {
        sendDataToUpdate(generateRandomDeck(), [], "", "none");
      }, 700);
      showMessageAndReset("Game Shuffled", "Continue");
      //if popped card is cat card then just continues game
    } else if (poppedCard === "CAT") {
      if (!cards.length) {
        //if there is no cards left then reseting deck and firing message
        //user wons
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "won");
        }, 700);
        showMessageAndReset("You won", "Play Again");
      } else {
        sendDataToUpdate(cards, defuseCards, poppedCard, "none");
      }
      //if card is defuse card then it will be stored in defuse cards
    } else if (poppedCard === "DEFUSE") {
      if (!cards.length) {
        //if there is no cards left then reseting deck and firing message
        //user wons
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "won");
        }, 700);
        showMessageAndReset("You won", "Play Again");
      } else {
        let updatedDefusedCard = [...defuseCards];
        updatedDefusedCard.push(poppedCard);
        setDefuseCards(updatedDefusedCard);
        sendDataToUpdate(cards, updatedDefusedCard, poppedCard, "none");
      }
      //if card is explode
    } else if (poppedCard === "EXPLODE") {
      //checking there is defuse card or not
      if (defuseCards.length) {
        if (!cards.length) {
          //if there no cards left then reseting deck and firing message
          //user wons
          setTimeout(() => {
            sendDataToUpdate(generateRandomDeck(), [], "", "won");
          }, 700);
          showMessageAndReset("You won", "Play Again");
        } else {
          //if there is defuse card  //
          let updatedDefuseCards = [...defuseCards];
          updatedDefuseCards.pop();
          setDefuseCards(updatedDefuseCards);
          sendDataToUpdate(cards, updatedDefuseCards, poppedCard, "none");
        }
      } else {
        //if there is no defuse card left
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "lost");
        }, 700);
        showMessageAndReset("Game Over", "Play Again");
      }
    }
    processComplete = true;
  };

  //return card src acccording to their name
  const setOpenedCardSrc = () => {
    if (openedCard === "") {
      return "";
    } else if (openedCard === "SHUFFLE") {
      return shuffleCard;
    } else if (openedCard === "DEFUSE") {
      return defuseCardImg;
    } else if (openedCard === "CAT") {
      return catCard;
    } else if (openedCard === "EXPLODE") {
      return explodeCard;
    }
  };


  return (
    <main className="z-40 w-full h-[89vh] py-10 xl:pt-12 px-40">
      {popupVisible && (
        <Popover
          popupData={popupData}
          setPopupVisible={setPopupVisible}
          popupVisible={popupVisible}
        />
      )}
      <section className="flex justify-center space-x-80 z-10 relative h-[80vh]  text-white">
        <div className="z-20 absolute max-h-44  bottom-4  w-96 ">
          <div className="text-center font-semibold text-lg text-black">
            Click on the deck to open a card
          </div>
          {deck.map((card, index) => {
            let right = index * 4;
            let top = index * 9.6;
            return (
              <img
                key={card + index}
                onClick={revealCard}
                alt=""
                style={{
                  position: "relative",
                  width: "7rem",
                  left: right.toString() + "rem",
                  bottom: top.toString() + "rem",
                }}
                src={cardImage}
              ></img>
            );
          })}
        </div>

        <section className="openedCard-container relative mb-4 w-48 h-64 flex-col items-center flex ">
          <h3 className="font-semibold text-lg text-black bg-green-600">
            {openedCard ? openedCard + " CARD" : "CURRENT CARD"}
          </h3>
          <div className="relative w-48 h-64 flex justify-center items-center">
            <div className="w-full bg-black h-60  top-0 absolute opacity-30"></div>

            {openedCard && (
              <img
                className="w-40 z-20 h-52"
                src={setOpenedCardSrc()}
                alt={openedCard}
              />
            )}
          </div>
        </section>

        <section className=" flex flex-col items-center">
          <h3 className="font-semibold text-lg  text-black bg-green-600">DEFUSE CARDS</h3>
          <div className=" max-h-60 h-60 min-w-[12rem]   relative ">
            <div className="w-full bg-black h-full top-0 absolute opacity-30"></div>

            {defuseCards.map((defuseCard, index) => {
              let right = index * 2;
              let top = index * 12.7;
              return (
                <div
                  key={defuseCard + index}
                  className=" ml-4  mt-3 defuseCard"
                >
                  <img
                    style={{
                      position: "relative",
                      width: "10rem",
                      left: right.toString() + "rem",
                      bottom: top.toString() + "rem",
                      height: "13rem",
                    }}
                    src={defuseCardImg}
                    alt="defuse-card"
                  />
                </div>
              );
            })}
            {!defuseCards?.length && (
              <div className={`openedCard ${"card-zeroState"}`}></div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default GamePlayArea;
