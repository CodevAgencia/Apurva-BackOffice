import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';

const initialData = {
  id: 0,
  cedula: '',
  tarjeta: '',
};

const DocumentosAdjuntosModal = () => {
  const dispatch = useDispatch();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts()
  );

  const handleSubmitProducts = () => {
    if (optionsDialog?.type === 'new') {
      // GUARDAR
      // dispatch(saveProduct({ idCommerce, dataProduct: form }));
      console.log('FORM GUARDAR', form);
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
              <div>
                <TextField
                  error={!!errors?.cedula}
                  helperText={errors?.cedula && errors?.cedula}
                  id="cedula"
                  label="Cedula"
                  name="cedula"
                  value={form.cedula}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.tarjeta}
                  helperText={errors?.tarjeta && errors?.tarjeta}
                  id="tarjeta"
                  label="Tarjeta profesional"
                  name="tarjeta"
                  value={form.tarjeta}
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

export default DocumentosAdjuntosModal;
