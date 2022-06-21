// import {Dimensions} from 'react-native';

// export const {width, height} = Dimensions.get('window');

// const guidelineBaseWidth = 380;
// const guidelineBaseHeight = 800;

// export const dw = (size: number) => (width / guidelineBaseWidth) * size;
// export const dh = (size: number) => (height / guidelineBaseHeight) * size;

import {Dimensions, PixelRatio} from 'react-native';

export const roundPixel = (size: number): number =>
  PixelRatio.roundToNearestPixel(size);

export const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth = 380;
const guidelineBaseHeight = 800;

export const dh = (size: number) => {
  const sizePercent = (size / guidelineBaseHeight) * 100;
  const sizeForDiviceHeight = (sizePercent * height) / 100;

  return roundPixel(sizeForDiviceHeight);
};

export const dw = (size: number) => {
  const sizePercent = (size / guidelineBaseWidth) * 100;
  const sizeForDiviceWidth = (sizePercent * width) / 100;

  return roundPixel(sizeForDiviceWidth);
};
