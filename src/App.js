import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Sorter from './Components/Sorter'
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
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setStep(step + 1)}>
          Step
        </button>
        <Sorter sorter={bubble_sort} initialArray={array} step={step} cmp={cmp}></Sorter>
      </header>
    </div >
  );
}

export default App;
