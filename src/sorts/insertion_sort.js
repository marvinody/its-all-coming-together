export default function* insertion_sort(arr, { swap, cmp }) {
  let i = 1;
  while (i < arr.length) {
    let j = i;
    while (j > 0 && cmp(arr[j - 1], arr[j]) > 0) {
      arr = swap(j, j - 1);
      yield;
      j = j - 1;
    }
    i = i + 1;
  }
}
