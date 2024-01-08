import { useState, useEffect } from 'react';

const useCardInterval = (baharCards, andarCards,value) => {
  const [modifiedBaharCards, setModifiedBaharCards] = useState([]);
  const [modifiedAndarCards, setModifiedAndarCards] = useState([]);

  useEffect(() => {
    let baharCardsArr = [];
    let andarCardsArr = [];
    let flag = true;
    let index = 0;
if(value==9){
  const intervalId = setInterval(() => {
    if (index >= 4) {
      clearInterval(intervalId);
      setModifiedAndarCards([]);
      setModifiedBaharCards([]);
      return;
    }

    if (flag) {
      baharCardsArr.push(baharCards[index]);
      setModifiedBaharCards([...baharCardsArr]);
      flag = !flag;
      return [ modifiedBaharCards, modifiedAndarCards ]
    } else {
      andarCardsArr.push(andarCards[index]);
      setModifiedAndarCards([...andarCardsArr]);
      index = index + 1;
      flag = !flag;
      return [modifiedBaharCards, modifiedAndarCards ]
    }
  }, 700);

}

    // Clean up the interval when the component unmounts or when the dependency arrays change
    return () => clearInterval(intervalId);
  }, [baharCards, andarCards]);


};

export default useCardInterval;
