import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Sorter from './Components/Sorter'
function* bubble_sort(arr, { swap }) {
  const n = arr.length;
  let swapped = false;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (arr[i - 1] > arr[i]) {
        arr = swap(i - 1, i);
        yield;
        swapped = true;
      }
    }
  } while (swapped)
}
function App() {
  const [step, setStep] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setStep(step + 1)}>
          Step
        </button>
        <Sorter sorter={bubble_sort} initialArray={[1, 2, 3, 4, 5, 0]} step={step} ></Sorter>
      </header>
    </div >
  );
}

export default App;
