export default function determineWeight(streak) {
  let newWeight;
  if (streak < 4) {
    newWeight = 1;
  } else if (streak < 8) {
    newWeight = 2;
  } else if (streak < 12) {
    newWeight = 3;
  } else if (streak < 16) {
    newWeight = 4;
  } else if (streak < 20) {
    newWeight = 5;
  } else if (streak < 24) {
    newWeight = 6;
  } else if (streak < 28) {
    newWeight = 7;
  } else {
    newWeight = 8;
  }

  return newWeight;
}