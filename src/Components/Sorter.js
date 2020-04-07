import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import chunk from 'lodash/chunk'


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
const defaultCmp = (a, b) => a - b
// cmp should look like this
// function compare(a, b) {
//   if (a is less than b by some ordering criterion) {
//     return -1;
//   }
//   if (a is greater than b by the ordering criterion) {
//     return 1;
//   }
//   // a must be equal to b
//   return 0;
// }

function Sorter({ sorter, initialArray, step, cmp = defaultCmp, weDone, numHorizTiles }) {
  const [isDone, setIsDone] = useState(false)
  const [array, setArray] = useState([...initialArray])
  const arrayOps = { // contain everything that the generator can do to the arr
    ...expandArrayOps(array, setArray),
    cmp,
  }
  const [sorterItr, _] = useState(sorter(array, arrayOps))
  useEffect(() => {
    // handle stepping forward in time
    if (isDone || step === 0) return

    const result = sorterItr.next()
    // we done yet?
    setIsDone(result.done)
  }, [step, isDone, sorterItr])

  useEffect(() => {
    if (isDone) {
      weDone()
    }
  }, [isDone, weDone])

  const grid = chunk(array, numHorizTiles)

  return (
    <div className='grid'>
      {grid.map(row => (
        <div className='row'>
          {row.map(tile => (
            <div key={tile.id} style={{
              backgroundImage: `url(${tile.src})`,
              backgroundRepeat: 'no-repeat',
              width: tile.w,
              height: tile.h,
              backgroundPositionX: -1 * tile.x,
              backgroundPositionY: -1 * tile.y,
              // flexBasis: `${1 / numHorizTiles * 100}%`,
            }}></div>
          ))}
        </div>
      ))}
    </div>
  )
}

Sorter.propTypes = {
  sorter: PropTypes.func, // generator function
  initialArray: PropTypes.array, // what are we sorting
  step: PropTypes.number, // when it changes, indicates we should step
  cmp: PropTypes.func, // special comparator if needed
}

export default Sorter
