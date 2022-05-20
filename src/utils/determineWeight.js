export default function determineWeight(streak) {
  const newWeight = {
    value: "",
    minValue: "",
    maxValue: ""
  }

  if (streak <= 12) {
    newWeight.value = 1;
    newWeight.minValue=0;
    newWeight.maxValue=12;
  } else if (streak <= 24) {
    newWeight.value = 2;
    newWeight.minValue=12;
    newWeight.maxValue=24;
  } else if (streak <= 36) {
    newWeight.value = 3;
    newWeight.minValue=24;
    newWeight.maxValue=36;
  } else if (streak <= 48) {
    newWeight.value = 4;
    newWeight.minValue=36;
    newWeight.maxValue=48;
  } else if (streak <= 60) {
    newWeight.value = 5;
    newWeight.minValue=48;
    newWeight.maxValue=60;
  } else if (streak <= 72) {
    newWeight.value = 6;
    newWeight.minValue=60;
    newWeight.maxValue=72;
  } else if (streak <= 84) {
    newWeight.value = 7;
    newWeight.minValue=72;
    newWeight.maxValue=84;
  } else {
    newWeight.value = 8;
    newWeight.minValue=84;
    newWeight.maxValue=96;
  }

  return newWeight;
}