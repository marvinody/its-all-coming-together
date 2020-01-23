import React, { useState } from 'react';
import './App.css';
import Sorter from './Components/Sorter'
import useInterval from './useInterval';
import bubble_sort from './sorts/bubble_sort'

const makeTile = ({ x, y, w, h, src, id }) => ({
  x,
  y,
  src,
  w,
  h,
  id
})

const tileify = ({ width, height, tileHeight, tileWidth, src }) => {
  const tiles = []
  let count = 0;
  for (let y = 0; y < height; y += tileHeight) {
    for (let x = 0; x < width; x += tileWidth) {
      tiles.push(makeTile({
        x,
        y,
        src,
        w: tileWidth,
        h: tileHeight,
        id: count++,
      }))
    }
  }
  return tiles
}

// const tiles = tileify({
//   width: 480,
//   height: 288,
//   tileWidth: 12,
//   tileHeight: 12,
//   src: '/kronk_still.png'
// })

const tiles = tileify({
  width: 256,
  height: 256,
  tileWidth: 64,
  tileHeight: 64,
  src: '/blob_wat.png'
})

console.log(tiles)

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
shuffle(tiles)

const cmp = (a, b) => (a.x - b.x) + (a.y - b.y) * 100000

function App() {
  const [step, setStep] = useState(0)
  const [numSortsWorking, setNumSortsWorking] = useState(0)
  const doneCB = () => {
    if (numSortsWorking > 0) {
      setNumSortsWorking(numSortsWorking - 1)
    }
  }
  useInterval(() => {
    setStep(step + 1)
    console.log({ step })
  }, numSortsWorking > 0 ? 100 : null)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {
          setNumSortsWorking(1)
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
        >
        </Sorter>
      </header>
    </div >
  );
}

export default App;
