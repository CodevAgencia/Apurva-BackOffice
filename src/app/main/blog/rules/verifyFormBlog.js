const verifyFormBlog = (values) => {
  const errors = {};

  if (!values.title_en) {
    errors.title_en = 'Ingrese un titulo en ingles.';
  }

  if (!values.title_es) {
    errors.title_es = 'Ingrese un titulo en español.';
  }

  if (!values.description_en) {
    errors.description_en = 'Ingrese una descripción en ingles.';
  }

  if (!values.description_es) {
    errors.description_es = 'Ingrese una descripción en español.';
  }

  if (!values.knowledge_category_id) {
    errors.knowledge_category_id = 'Seleccione una categoria.';
  }

  if (!values.image) {
    errors.image = 'Debe subir alguna imagen.';
  }

  return errors;
};

export default verifyFormBlog;
