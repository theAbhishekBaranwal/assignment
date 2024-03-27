import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { request } from "../api/request";
import { setItem } from "../utils/storage";
import { setToast } from "../utils/taost";

const GameLobby = (props) => {
   const [username, setUsername] = useState("");
   const { setIsLobby } = props;
   let history = useNavigate();
   const toast = useToast();

   const startGame = async () => {
     
      let button = document.getElementById("button"); 
      if (!username) {                   //if user clicks button without entering username
         setToast(toast, "warning", "Enter username to start the game");
         return;
      }

      button.value = "STARTING...";
      let response = await request("POST", "/createUser", { username });

      if (response.success) {
         setItem("user", response.data);
         setIsLobby(false);
         button.value = "START GAME";
         history("/playGame");
      }
   };

   return (
      <main className="flex w-full items-center  h-[87vh] justify-center ">
         <div
            className="z-10  flex flex-col border-2 border-l-4 border-b-4 border-[black] bg-black justify-center
         space-y-8 rounded-lg px-6 h-72 
         ">
            <p className=" text-2xl -mb-4  font-bold text-white">
               ENTER USERNAME
            </p>
            <input
               type="text"
               placeholder=""
               className="w-80 px-4 py-2  outline-none rounded-lg"
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="button"
               value="START GAME"
               id="button"
               className="bg-white rounded-lg w-full py-2 border cursor-pointer border-black "
               onClick={() => startGame()}
            />
         </div>
      </main>
   );
};

export default GameLobby;
