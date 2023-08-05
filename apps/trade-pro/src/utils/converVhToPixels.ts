export const convertVhToPixels = (heightInVh: string) => {
  const numericValue = parseFloat(heightInVh);
  const viewportHeight = window.innerHeight;
  const heightInPixels = (numericValue * viewportHeight) / 100;
  return heightInPixels;
};
