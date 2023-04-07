export const uppercaseFL = (arr, startIndex) => {
    for (let i = startIndex; i < arr.length; i++) {
      if (arr[i].length > 0) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }
    return arr;
  };