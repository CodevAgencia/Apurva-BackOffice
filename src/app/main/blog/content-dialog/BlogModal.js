import { Autocomplete, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';
import { getBlogsCategories, selectCategories } from '../../../store/app/blogCategoriesSlice';
import { restarInfoBlog, saveBlog, updateBlog } from '../../../store/app/blogSlice';
import verifyFormBlog from '../rules/verifyFormBlog';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const initialData = {
  id: 0,
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
  const isOpenDialog = useSelector(({ fuse }) => fuse.dialog.state);
  const editBlogData = useSelector(({ blogs }) => blogs.infoBlog);
  const allCategories = useSelector(selectCategories);
  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts(),
    verifyFormBlog
  );

  useEffect(() => {
    dispatch(getBlogsCategories()).then((res) => {
      if (optionsDialog.type === 'new') {
        const firtsCategory = res.payload[0];
        setInForm('knowledge_category_id', firtsCategory.id);
        setNameCategory(firtsCategory);
      } else if (optionsDialog.type == 'edit') {
        setNameCategory(editBlogData?.category);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (optionsDialog.type === 'edit') {
      setForm({ ...form, ...editBlogData, knowledge_category_id: editBlogData.category.id });
    } else {
      setForm({ ...initialData });
    }
  }, [dispatch]);

  const handleSubmitProducts = () => {
    if (optionsDialog?.type === 'new') {
      // GUARDAR
      dispatch(saveBlog(form));
    } else {

      if (!form?.image || typeof form?.image == 'string')
        delete form.image;
      // ACTUALIZAR
      // console.log('FOR ACTUALIZAR', form);
      dispatch(updateBlog(form));
      dispatch(restarInfoBlog());
    }
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (!isOpenDialog) {
      dispatch(restarInfoBlog());
    }
  }, [isOpenDialog]);

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
                  multiline
                  minRows={3}
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
                  multiline
                  minRows={3}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={nameCategory}
                  options={allCategories}
                  getOptionLabel={(option) => option.category}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorias"
                      error={!!errors?.knowledge_category_id}
                      helperText={errors?.knowledge_category_id && errors?.knowledge_category_id}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('knowledge_category_id', newValue?.id);
                    setNameCategory(allCategories.find((item) => item.id === newValue?.id));
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <div className="w-full flex flex-col" style={{ marginRight: '0.5rem' }}>
                  <span className="inline-block justify-start font-bold mb-4">Imagen</span>
                  <FilePond
                    allowMultiple={false}
                    credits=""
                    labelIdle="<span>SUBE UNA IMAGEN</span>"
                    name="files"
                    maxFiles={1}
                    onupdatefiles={(files) => {
                      setInForm('image', files[0]?.file);
                    }}
                  />
                  {errors?.image && (
                    <span
                      className="inline-block justify-start font-bold mb-4"
                      style={{
                        color: '#f44336',
                        fontWeight: '400',
                        marginLeft: '14px',
                        fontSize: '1.114rem',
                      }}
                    >
                      {errors?.image}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions className="justify-between px-8 py-16">
        <div className="px-16">
          <Button
            onClick={() => {
              dispatch(closeDialog());
              dispatch(restarInfoBlog());
            }}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>
        </div>
        <div className="px-16">
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Guardar
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default BlogModal;
