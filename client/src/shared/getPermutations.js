const getPermutations = (arr) => {
  for (var a2 = []; a2.push([]) < arr.length;);
  var l = Math.pow(2, arr.length)-1;
  for (var i = 1; i <= l; i++) {
    var s2 = i.toString(2).split("").reverse();
    var t = "", m = -1;
    for (var k = 0; k < s2.length; k++) {
      if (s2[k]=="1") {
        t += arr[k]+',';
        m++;
      }
    }
    a2[m].push(t);
  }
  return a2;
}

export default getPermutations;