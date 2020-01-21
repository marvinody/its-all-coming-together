import React, { useState } from 'react';
import './App.css';
import Sorter from './Components/Sorter'
import useInterval from './useInterval';
function* bubble_sort(arr, { swap, cmp }) {
  const n = arr.length;
  let swapped = false;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {

      if (cmp(arr[i - 1], arr[i]) > 0) {
        arr = swap(i - 1, i);
        yield;
        swapped = true;
      }
    }
  } while (swapped)
}

const makeTile = (x, y, w, h) => ({
  x,
  y,
  src: `/blob/${x}-${y}.png`,
  w,
  h,
})

const array = []
const size = 3;
for (let i = size - 1; i >= 0; i--) {
  for (let j = size - 1; j >= 0; j--) {
    array.push(makeTile(i, j, 85, 85))
  }
}

const cmp = (a, b) => (a.x - b.x) + (a.y - b.y) * size

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
          initialArray={array}
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
