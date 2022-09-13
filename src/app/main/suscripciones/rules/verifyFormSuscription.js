const verifyFormSuscription = (values) => {
  const errors = {};

  if (!values.name_en) {
    errors.name_en = 'Ingrese un nombre en ingles.';
  }

  if (!values.name_es) {
    errors.name_es = 'Ingrese un nombre en español.';
  }

  if (!values.description_en) {
    errors.description_en = 'Ingrese una descripción en ingles.';
  }

  if (!values.description_es) {
    errors.description_es = 'Ingrese una descripción en español.';
  }

  if (!values.price) {
    errors.price = 'Ingrese un precio';
  }

  if (!values.period) {
    errors.period = 'Ingrese un periodo';
  }

  if (!values.level_id) {
    errors.level_id = 'Ingrese un nivel';
  }

  if (!values.type_id) {
    errors.type_id = 'Ingrese un tipo';
  }

  return errors;
};

export default verifyFormSuscription;
