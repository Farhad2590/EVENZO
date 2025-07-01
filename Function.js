//Write a function that takes an array of numbers as a parameter and return the second largest number.

function secondLargestNumber(arr) {
  let firstlargest = 0;
  let secondlargest = 0;

  for (let i = 0; i < arr.length; i++) {
    let currentNumber = arr[i];
    
    if (currentNumber > firstlargest) {
        secondlargest = firstlargest;
        firstlargest = currentNumber;
    } else if (currentNumber > secondlargest && currentNumber !== firstlargest) {
        secondlargest = currentNumber;
    }
  }

  return secondlargest;
}


console.log(secondLargestNumber([4, 2, 7, 1, 9]));
