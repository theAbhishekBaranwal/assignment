import React from "react";
import gameLogo from "../assets/img/gameLogo.png";
import { useSelector } from "react-redux";

const Header = (props) => {
   const user = useSelector((state) => state.user);

   const { setIsLobby, isLobby } = props;

   return (
      <section className="flex relative z-10 text-white items-center justify-between">
         {!isLobby ? (
            <div className="flex items-center">
               <img alt="" className="w-20 m-2 p-1" src={gameLogo} />
               <p className="text-xl font-bold text-green-500 m-2 p-1">Exploding Kitten Game</p>
            </div>
         ) : (
            <div></div>
         )}
         {!isLobby && user?.username && (
            <div className="flex space-x-2  pl-6">
               <div className="flex bg-white px-4 py-1 text-xl rounded-md space-x-3">
                  <p className=" text-black font-bold">NAME : </p>
                  <p className="font-bold  text-black">
                     {user.username}
                  </p>
               </div>
               <div className="flex bg-white px-4 py-1 text-xl rounded-md space-x-3">
                  <p className=" text-black  font-bold">POINTS :</p>
                  <p className="font-bold   text-black">
                     {user.matchesWon}
                  </p>
               </div>
            </div>
         )}
         <div className="flex text-xl px-14 py-4 space-x-8 items-center">
         </div>
      </section>
   );
};

export default Header;
