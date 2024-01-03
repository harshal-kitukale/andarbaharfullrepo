import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on("gameUpdate", (updatedGameState) => {
      setGameState(updatedGameState.gamestate);
      setMainCard(updatedGameState.mainCard);
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

    console.log(mainCard);
    // socket.on("mainCard", (data) => {
    //   localStorage.setItem('main_card',JSON.stringify(data))
    //   // socket.query.mainCardId=data._id
    //   console.log(data);

    // });
    // let cardData=JSON.parse(localStorage.getItem('main_card'));
    // setMainCard(cardData)

    return () => {
      // Clean up socket connection on component unmount

      socket.disconnect();
    };
  }, []);
  console.log(socket);
  // const handleClick = () => {
  //   socket.emit("click");
  // };

  // socket.on("clickrec", (data) => {
  //   console.log(data);
  // });

  const handleBait = (baitType) => {
    const bait = {
      baitType,
      coins,
      cardId: mainCard._id,
    };
    socket.emit("bait", bait);
  };

  if (gameState?.value == 10) {
    socket.emit("gameCards", mainCard._id);
    console.log("bhaisahab", mainCard._id);
  }

  // if (gameState?.value == 1) {
  //   alert(`${mainCard?.winstatus} win`);
  // }

  return (
    <>
      <h1>{gameState?.value < 5 ? mainCard?.winstatus : ""}</h1>
      <h2 className="count">{gameState?.value}</h2>
      <h2>{mainCard?.main_card}</h2>
      <div className="cardsgame">
        <div>
          {mainCard?.andarcards?.map((card) => (
            <h3>{card}</h3>
          ))}
        </div>
        <div>
          {mainCard?.baharcards?.map((card) => (
            <h3>{card}</h3>
          ))}
        </div>
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

export default App;
