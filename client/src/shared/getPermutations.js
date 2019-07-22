// Bitmap combination
// Break down idea: http://wuchong.me/blog/2014/07/28/permutation-and-combination-realize/
const getCombinations = inputArr => {
  const result = Array.prototype.map.call(inputArr, () => []);
  // 00 doesn't mean anything, so -1 if the input length is 2
  const resultArr = Math.pow(2, inputArr.length) - 1;

  for (let i = 1; i <= resultArr; i++) {
    // Return an array:
    // 1: means we choose this number
    // 0: means we don't choose this number
    // get Bitmap means to get combination situation in terms of bit expression
    const bitmap = i
      .toString(2)
      .split('')
      .reverse();
    let combinedString = '';
    let combinedTypeIndex = -1;

    // concat bitmap into 1D array
    for (let k = 0; k < bitmap.length; k++) {
      // Convert bitmap into original array number
      // combine number which bitmap equals to 1
      // inputArr: [1, 2], [1, 2], [1, 2],
      // bitmap: ['1', '0'], ['0', '1'], ['1', '1']
      // combined string (t): ['1,'], ['2,'], ['1,2,']

      if (bitmap[k] === '1') {
        combinedString += `${inputArr[k]},`;
        // ['1', '0'], ['0', '1'], ['1', '1']
        // +1, +1, +2
        combinedTypeIndex++;
      }
    }
    result[combinedTypeIndex].push(combinedString);
  }
  return result;
};

export default getCombinations;
// Original:
// const getPermutations = arr => {
//   for (let a2 = []; a2.push([]) < arr.length; );
//   const l = Math.pow(2, arr.length) - 1;
//   for (let i = 1; i <= l; i++) {
//     const s2 = i
//       .toString(2)
//       .split('')
//       .reverse();
//     let t = '';
//     let m = -1;
//     for (let k = 0; k < s2.length; k++) {
//       if (s2[k] === '1') {
//         t += `${arr[k]},`;
//         m++;
//       }
//     }
//     a2[m].push(t);
//   }
//   return a2;
// };

// // Concat 2D array
// [['1'],['1','0'],['1','1']].forEach((ele)=>{
//   ele.forEach((ele2, index) => {
//     console.log(ele[index])
//   })
// })
