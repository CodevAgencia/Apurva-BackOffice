// eslint-disable-next-line import/prefer-default-export
export const TruncateString = (source, size = 60) => {
  return source.length > size ? `${source.slice(0, size - 1)}...` : source;
};
