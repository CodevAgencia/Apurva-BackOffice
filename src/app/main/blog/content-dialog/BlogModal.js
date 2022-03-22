import { Autocomplete, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';
import { getBlogsCategories, selectCategories } from '../../../store/app/blogCategoriesSlice';
import { saveBlog } from '../../../store/app/blogSlice';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

const initialData = {
  id: 10,
  title_en: '',
  title_es: '',
  description_en: '',
  description_es: '',
  knowledge_category_id: '',
  image: '',
};

const BlogModal = () => {
  const dispatch = useDispatch();
  const [categorySelect, setCategorySelect] = useState('');
  const [nameCategory, setNameCategory] = useState('');
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const allCategories = useSelector(selectCategories);
  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts()
  );

  useEffect(() => {
    dispatch(getBlogsCategories());
  }, [dispatch]);

  const handleSubmitProducts = () => {
    if (optionsDialog?.type === 'new') {
      // GUARDAR
      // dispatch(saveProduct({ idCommerce, dataProduct: form }));
      console.log('FORM GUARDAR', form);
      dispatch(saveBlog(form));
    } else {
      // ACTUALIZAR
      // dispatch(updateProduct(form));
      console.log('FOR ACTUALIZAR', form);
    }
    // setNameCategory('');
    // dispatch(saveUser(form));
  };

  return (
    <>
      <DialogContent className="p-8">
        <div className="my-14">
          <form>
            <div className="flex flex-col w-full space-y-12">
              <div className="flex flex-col w-full space-y-12">
                <TextField
                  error={!!errors?.title_en}
                  helperText={errors?.title_en && errors?.title_en}
                  id="title_en"
                  label="Título en Ingles"
                  name="title_en"
                  value={form.title_en}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  error={!!errors?.title_es}
                  helperText={errors?.title_es && errors?.title_es}
                  id="title_es"
                  label="Título en Español"
                  name="title_es"
                  value={form.title_es}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <TextField
                  error={!!errors?.description_en}
                  helperText={errors?.description_en && errors?.description_en}
                  id="description_en"
                  label="Descripción en Ingles"
                  name="description_en"
                  value={form.description_en}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  error={!!errors?.description_es}
                  helperText={errors?.description_es && errors?.description_es}
                  id="description_es"
                  label="Descripción en Español"
                  name="description_es"
                  value={form.description_es}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={nameCategory || allCategories[0]}
                  options={allCategories}
                  getOptionLabel={(option) => option.label}
                  // sx={{ width:  }}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Categorias" />}
                  onChange={(event, newValue) => {
                    setInForm('knowledge_category_id', newValue?.id);
                    setNameCategory(allCategories.find((item) => item.id === newValue?.id));
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <TextField
                  error={!!errors?.image}
                  helperText={errors?.image && errors?.image}
                  id="image"
                  label="Imagen"
                  name="image"
                  value={form.image}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions className="justify-between px-8 py-16">
        <div className="px-16">
          <Button onClick={() => dispatch(closeDialog())} variant="contained" color="primary">
            Cancelar
          </Button>
        </div>
        <div className="px-16">
          <Button onClick={handleSubmitProducts} variant="contained" color="secondary">
            Guardar
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default BlogModal;
