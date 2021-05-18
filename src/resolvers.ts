import { ApolloError } from 'apollo-server-errors';
import { each } from 'lodash';

export default {
  Query: {
    longestRaisingSequence(_: null, args: { sequence: number[] }) {
      try {
        if (!args.sequence.length) {
          return [];
        }
        return getLongestRaisingSequence(args.sequence);
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const getLongestRaisingSequence = (inputArr: number[]) => {
  const subSequencesArray: number[][] = [];
  let sequenceArray: number[] = [];
  let lastValue: number;
  each(inputArr, (n, i) => {
    if (sequenceArray.length === 0) {
      sequenceArray.push(n);
    } else {
      if (n > lastValue) {
        sequenceArray.push(n);
      } else {
        subSequencesArray.push([...sequenceArray]);
        sequenceArray = [n];
      }
    }
    lastValue = n;
    if (inputArr.length - 1 === i) {
      subSequencesArray.push([...sequenceArray]);
    }
  });
  const index = subSequencesArray.reduce(
    (maxI, el, i, arr) => (el.length > arr[maxI].length ? i : maxI),
    0
  );
  return subSequencesArray[index];
};
