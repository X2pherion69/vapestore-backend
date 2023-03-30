export const checkImageName = (input: string) => {
  const regex = /[^a-zA-Z0-9_.]+/;
  return regex.test(input);
};
