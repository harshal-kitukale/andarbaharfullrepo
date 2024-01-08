import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
// let userId = localStorage.getItem("userId") || "";
// if (userId == "") {
//   userId = Math.floor(Math.random() * Date.now());
//   localStorage.setItem("userId", userId);
// }

const socket = io("https://andarbaharbacked.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
});
function App() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [andarCards, setAndarCards] = useState([]);
  // const [flag, setFlag] = useState(true);
  // const [index, setIndex] = useState(0);
  const maincard=useRef({})
  const baharcards=useRef([])
  const andarcards=useRef([])
  const count=useRef([])
  useEffect(() => {
    // Listen for game state updates from the server
    socket.on("gameUpdate", (updatedGameState) => {
      console.log(updatedGameState);
      setGameState(updatedGameState.gamestate);
      count.current=updatedGameState.gamestate.value
      // setMainCard(updatedGameState.mainCard);
      maincard.current=updatedGameState.mainCard
      baharcards.current=updatedGameState.mainCard.baharcards
      andarcards.current=updatedGameState.mainCard.andarcards
      console.log(updatedGameState.mainCard);
    });

    socket.on("userDetails", (data) => {
      console.log(data);
      setUser(data.user);
    });

    socket.on("bait", (data) => {
      setUser(data);
      console.log(data);
      // setUser(data.user);
    });

    console.log(andarcards);
    console.log(baharcards);
    // if (gameState.value == 9) {
    //   intervalId = setInterval(() => {
    //     if (index >= 6) {
    //       clearInterval(intervalId);
    //       setIndex(0);
    //       setBaharCards([]);
    //       setAndarCards([]);
    //     }
    //     if (flag) {
    //       setBaharCards([...baharCards, mainCard?.baharcards[index]]);
    //       setFlag(!flag);
    //     } else {
    //       setAndarCards([...andarCards, mainCard?.baharcards[index]]);
    //       setIndex(index + 1);
    //       console.log(index);
    //       setFlag(!flag);
    //     }
    //   }, 1000);
    // }
    // setBaharCards([]);
    // setAndarCards([]);

    return () => {
      // Clean up socket connection on component unmount
      // clearInterval(intervalId);
      socket.disconnect();
    };
  }, []);
  // var intervalId;

  useEffect(() => {
    if(count.current == 9){

      interval()
    }
    return (()=>{
      // clearInterval(id);
    })
  },[count.current == 9])

  if(gameState?.value ==0){
    setAndarCards([])
    setBaharCards([])
  }
function interval(){
  let baharCardsArr=[]
  let andarCardsArr=[]
  let flag=true
   let index= 0
   const intervalId = setInterval(() => {
    if (index >=5) {
      clearInterval(intervalId);
      // return
    }
    if (flag) {
      baharCardsArr.push( baharcards.current[index])
      setBaharCards([...baharCardsArr]);
      flag=!flag;
    } else {
      andarCardsArr.push( andarcards.current[index])
      setAndarCards([...andarCardsArr]);
      index=index+1
      
      console.log(baharCards);
      flag=!flag;
    }
    // return intervalId;
  }, 700);
}
  console.log("andarCards", andarCards);

  // if (gameState.value == 10) {
  // }
  // if(gameState.value<=2){
  //   clearInterval(intervalId);
  // }
  // console.log(index, andarCards);
  console.log(socket);

  const handleBait = (baitType) => {
    const bait = {
      baitType,
      coins,
      cardId: mainCard._id,
    };
    socket.emit("bait", bait);
  };

  // if (gameState?.value == 10) {
  //   socket.emit("gameCards", mainCard._id);
  //   console.log("bhaisahab", mainCard._id);
  // }

  return (
    <>
      <h3>{gameState?.value < 5 ? maincard.current?.winstatus : ""}</h3>
      <h2 className="count">{count.current }</h2>
      <h2>{maincard.current?.main_card}</h2>
      <div >
        {andarCards?.map((card, ind) => (
          <div
            key={`baharCard-${ind}`}
            className="card"
            id={`baharCard${ind}`}
          >
            andar-{card}
          </div>
        ))}
        <h1>-----------------</h1>
        {baharCards?.map((card, ind) => (
          <div
            key={`andarCard-${ind}`}
            className="card"
            id={`andarCard${ind}`}
          >
            bahar-{card}
          </div>
        ))}
      </div>
      <h3 className="state">{gameState?.value <= 10 ? "Freeze" : "Waiting"}</h3>

      <button
        onClick={() => handleBait("andar")}
        disabled={gameState?.value <= 10}
      >
        Andar
      </button>
      <button
        onClick={() => handleBait("bahar")}
        disabled={gameState?.value <= 10}
      >
        Bahar
      </button>
      {/* <button onClick={handleClick}>click</button> */}
      <h2>user</h2>
      <select
        onChange={(e) => {
          setCoins(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="250">250</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
      <p>coins- {user?.coins}</p>
      <p>id-{user?._id}</p>
      <p>user id-{user?.userId}</p>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./App.css";

// const socket = io("https://andarbaharbacked.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
// });

// function App() {
//   const [gameState, setGameState] = useState({ value: "waiting" });
//   const [user, setUser] = useState(null);
//   const [coins, setCoins] = useState(50);
//   const [mainCard, setMainCard] = useState([]);
//   const [baharCards, setBaharCards] = useState([]);
//   const [andarCards, setAndarCards] = useState([]);
//   const [flag, setFlag] = useState(true);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     socket.on("gameUpdate", (updatedGameState) => {
//       setGameState(updatedGameState.gamestate);
//       setMainCard(updatedGameState.mainCard);
//       console.log(mainCard);
//     });

//     socket.on("userDetails", (data) => {
//       setUser(data.user);
//     });

//     socket.on("bait", (data) => {
//       setUser(data);
//     });

//     return () => {
//       // clearInterval(intervalId);
//       socket.disconnect();
//     };
//   }, []); // Added mainCard to the dependency array
//   let intervalId;
//   if (gameState.value == 10) {
//     intervalId = setInterval(() => {
//       if (flag) {
//         setBaharCards([...baharCards, mainCard?.baharcards[index]]);
//         setFlag(!flag);
//       } else {
//         setAndarCards([...andarCards, mainCard?.baharcards[index]]);
//         setIndex((prev) => prev + 1);
//         setFlag(!flag);
//       }
//     }, 800);
//   }
//   if(gameState.value == 0){
//     clearInterval(intervalId)
//   }
//   const handleBait = (baitType) => {
//     const bait = {
//       baitType,
//       coins,
//       cardId: mainCard._id,
//     };
//     socket.emit("bait", bait);
//   };

//   return (
//     <>
//       <h1>{gameState?.value < 5 ? mainCard?.winstatus : ""}</h1>
//       <h2 className="count">{gameState?.value}</h2>
//       <h2>{mainCard?.main_card}</h2>
//       <div className="card-container">
//         <div>
//           {andarCards?.map((card, index) => (
//             <div className="card">{card}</div>
//           ))}
//         </div>
//         <div className="card">
//           {baharCards?.map((card, index) => (
//             <div>{card}</div>
//           ))}
//         </div>
//       </div>
//       <h3 className="state">{gameState?.value <= 10 ? "Freeze" : "Waiting"}</h3>

//       <button
//         onClick={() => handleBait("andar")}
//         disabled={gameState?.value <= 10}
//       >
//         Andar
//       </button>
//       <button
//         onClick={() => handleBait("bahar")}
//         disabled={gameState?.value <= 10}
//       >
//         Bahar
//       </button>

//       <h2>user</h2>
//       <select
//         onChange={(e) => {
//           setCoins(e.target.value);
//         }}
//       >
//         <option value="50">50</option>
//         <option value="100">100</option>
//         <option value="250">250</option>
//         <option value="500">500</option>
//         <option value="1000">1000</option>
//       </select>
//       <p>coins- {user?.coins}</p>
//       <p>id-{user?._id}</p>
//       <p>user id-{user?.userId}</p>
//     </>
//   );
// }

export default App;
