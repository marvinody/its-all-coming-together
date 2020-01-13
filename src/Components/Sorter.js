import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

// get() {
//   return this.state.values;
// }
// set(idx, val) {
//   const arr = Array.from(this.state.values);
//   const newArr = arr.slice(0, idx).concat(val, arr.slice(idx + 1));
//   this.setState({
//     values: newArr,
//   })
//   return newArr;
// }
// swap(idxA, idxB) {
//   const arr = this.state.values.slice();
//   let a = arr[idxA];
//   arr[idxA] = arr[idxB];
//   arr[idxB] = a;
//   this.setState({
//     values: arr,
//   })
//   return arr;
// }

const expandArrayOps = (array, setArrayForState) => {
  // because this fn is called once, we need to manually update it
  // with the new array since we're copying and not mutating it directly
  // using setArrayForState instead of mutating so react knows to rerender
  // I think that this makes it less buggy for the future!
  const setArr = (newArr) => {
    setArrayForState(newArr)
    array = newArr;
  }
  return {
    get: () => array,
    set: (idx, val) => {
      const newArray = array.map((n, i) => i === idx ? val : n)
      setArr(newArray)
      return newArray;
    },
    swap: (idxA, idxB) => {
      const newArr = array.slice()
      let a = newArr[idxA];
      newArr[idxA] = newArr[idxB];
      newArr[idxB] = a;
      setArr(newArr)
      return newArr
    }
  }
}

function Sorter({ sorter, initialArray, step }) {
  const [isDone, setIsDone] = useState(false)
  const [array, setArray] = useState([...initialArray])
  const arrayOps = expandArrayOps(array, setArray)
  const [sorterItr, _] = useState(sorter(array, arrayOps))
  useEffect(() => {
    // handle stepping forward in time
    if (isDone || step === 0) return

    const result = sorterItr.next()
    // we done yet?
    setIsDone(result.done)
  }, [step, isDone, sorterItr])

  return <div>{array.map(n => <p>{n}</p>)}</div>
}

Sorter.propTypes = {
  sorter: PropTypes.func, // generator function
  initialArray: PropTypes.array, // what are we sorting
  step: PropTypes.number, // when it changes, indicates we should step
}

export default Sorter
