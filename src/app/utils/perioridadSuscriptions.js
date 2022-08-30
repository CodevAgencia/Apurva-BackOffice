// eslint-disable-next-line import/prefer-default-export
export const findPeriodidad = (idPeriodo) => {
  switch (Number(idPeriodo)) {
    case 1:
      return 'Mensual';
    case 3:
      return 'Trimestral';
    case 12:
      return 'Anual';
    default:
      return 'Sin definir';
  }
};
