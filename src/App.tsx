import React, { FC, MouseEventHandler, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Grid } from './Components/Grid'
import { Keypad } from './Components/Keypad';


function App(){
  const [KeyInput, setKeyInput] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  const [rowIndex, setRowIndex] = useState<number>(0);
  const [win, setWin] = useState<boolean|null>(null);
  const [bgColors, setBgColors] = useState<string[][]>([]);

  const randomWord = 'water';

  const handleKeypadInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key  = (e.target as HTMLButtonElement).value;
    
    if(rowIndex > 4){
      setWin(false);
      return;
    }
    
    const currentWord = KeyInput[rowIndex].join('');
    if(key === 'Enter'){
      if(currentWord === randomWord && currentWord.length === 5){
        setWin(true);
        getBgColors(currentWord);
        return;
      }else if(currentWord !== randomWord && currentWord.length === 5){     
        // set styling for input   
        getBgColors(currentWord);
        setRowIndex(prev =>  prev+1);
      }
      return; 
    }

    if(key === 'Del'){
      setKeyInput(prev => {
        const word = prev[rowIndex].join('');
        const trimmedWord = word.substring(0, word.length-1);
        const arr = trimmedWord.split('');

        // adding empty str to maintain array length 🥲
        for(let i =0; i<5; i++){
          if(!arr[i]){
            arr[i] = '';
          }
        }

        prev[rowIndex] = arr;
        return [...prev];
      });
      return;
    }

    setKeyInput((prev) => {
      const emptyItemIndex = prev[rowIndex].indexOf('');
      prev[rowIndex][emptyItemIndex] = key;
      return [...prev];
    })
    
  }

  const getBgColors = (word: string) => {

    const colorsArr: string[] = [];

    for(let i = 0; i < 5; i++){
      if(word[i] === randomWord[i]){
        // letter and position correct
        colorsArr.push('correct');
      }else if(word[i] !== randomWord[i] && randomWord.includes(word[i])){
        // letter correct position wrong
        colorsArr.push('almost-correct');
      }else{
        // letter wrong 
        colorsArr.push('wrong');
      }
    }

    setBgColors((prev: any) => {
      return [...prev, colorsArr]
    });

  }

  const handleRestart = () => {
    setKeyInput([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
    setRowIndex(0);
    setWin(null);
    setBgColors([]);
  }

  return (
    <div className="App">
      <h2>Wordlie</h2>
      {win && <p><b><em>Congrats! You Win</em></b><br /> Click on restart to play again. 😈</p>}
      <Grid gridContent = {KeyInput} bgColors={bgColors}   />
      <Keypad onKeypadInput = {handleKeypadInput} rowIndex={rowIndex} restartGame={handleRestart} win = {win} />
    </div>
  )
}

export default App;
