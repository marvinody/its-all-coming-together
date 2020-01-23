export default function* bubble_sort(arr, { swap, cmp }) {
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
