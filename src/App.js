import React, { useState, useCallback } from 'react';
import './App.css';
import Sorter from './Components/Sorter'
import { shuffle, tileify, useInterval } from './util';
import bubble_sort from './sorts/bubble_sort'
import insertion_sort from './sorts/insertion_sort';


// const tiles = tileify({
//   width: 480,
//   height: 288,
//   tileWidth: 12,
//   tileHeight: 12,
//   src: '/kronk_still.png'
// })
const imageData = {
  width: 256,
  height: 256,
  tileWidth: 64,
  tileHeight: 64,
  src: '/blob_wat.png'
}

const tiles = tileify(imageData)

console.log(tiles)

shuffle(tiles)

const cmp = (a, b) => (a.x - b.x) + (a.y - b.y) * 100000

function App() {
  const [step, setStep] = useState(0)
  const [numSortsWorking, setNumSortsWorking] = useState(0)
  const doneCB = useCallback(
    () => {
      console.log(numSortsWorking)
      if (numSortsWorking > 0) {
        setNumSortsWorking(numSortsWorking - 1)
      }
    },
    [numSortsWorking],
  )
  useInterval(() => {
    setStep(step + 1)
    console.log({ step })
  }, numSortsWorking > 0 ? 100 : null)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {
          setNumSortsWorking(2)
        }}>
          Play
        </button>
        <button onClick={() => {
          // if we stop, then nothing is working anymore!
          setNumSortsWorking(0)
        }}>
          Pause
        </button>
        <Sorter
          sorter={bubble_sort}
          initialArray={tiles}
          step={step}
          cmp={cmp}
          weDone={doneCB}
          numHorizTiles={imageData.width / imageData.tileWidth}
        >
        </Sorter>
        <hr></hr>
        <Sorter
          sorter={insertion_sort}
          initialArray={tiles}
          step={step}
          cmp={cmp}
          weDone={doneCB}
          numHorizTiles={imageData.width / imageData.tileWidth}
        >
        </Sorter>
      </header>
    </div >
  );
}

export default App;
