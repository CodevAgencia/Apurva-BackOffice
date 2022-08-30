// eslint-disable-next-line import/prefer-default-export
export const findSuscriptionType = (idSuscriptionType, types) => {
  const findType = types?.find((type) => type.id === idSuscriptionType);
  return findType ? findType?.name : 'Sin tipo';
};

export const findSuscriptionLevel = (idSuscriptionLevel, levels) => {
  const findLevel = levels?.find((level) => level.id === idSuscriptionLevel);
  return findLevel ? findLevel?.name : 'Sin tipo';
};
