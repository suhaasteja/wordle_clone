import React, { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';

const keypadRow_1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const keypadRow_2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const keypadRow_3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

type KeypadProps = {
  onKeypadInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rowIndex: number;
  restartGame: () => void;
  win: boolean|null;
}


export const Keypad = (props: KeypadProps): React.ReactElement => {
  const { onKeypadInput, rowIndex, restartGame, win } = props;
  return (
    <div className='keypad'>
      <div className="row_1">
      {
        keypadRow_1.map(key => <button className='key' value={key} key={key} onClick={ (e) => onKeypadInput(e)}>{key}</button>)
      }
      </div>
      <div className="row_2">
      {
        keypadRow_2.map(key => <button className='key' value={key} key={key} onClick={(e) => onKeypadInput(e)}>{key}</button>)
      }
      </div>
      <div className="row_3">
        <button className='key' value='Enter' onClick={(e) => onKeypadInput(e)}>Enter</button>
      {
        keypadRow_3.map(key => <button className='key' value={key} key={key} onClick={(e) => onKeypadInput(e)}>{key}</button>)
      }
        {rowIndex <= 4 && !win   && <button className='key' value='Del' onClick={(e) => onKeypadInput(e)}>Del</button>}
        {((rowIndex > 4 && !win) || win ) && <button className='key' id="restart-btn" value='restart' onClick={restartGame}>Restart</button>}
      </div>
      
    </div>
  )
}
