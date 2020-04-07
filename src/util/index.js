
import { useEffect, useRef } from 'react';

const makeTile = ({ x, y, w, h, src, id }) => ({
  x,
  y,
  src,
  w,
  h,
  id
})

export const tileify = ({ width, height, tileHeight, tileWidth, src }) => {
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


export const shuffle = (array) => {
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

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
