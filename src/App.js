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

const array = [1, 2, 3, 4, 5, 0]
const cmp = (a, b) => a - b

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
