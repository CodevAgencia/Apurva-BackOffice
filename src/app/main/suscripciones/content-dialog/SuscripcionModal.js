import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';

const initialData = {
  id: 0,
  nombre: '',
  periodidad: '',
  foto: '',
  descripcion: '',
  valor: '',
  modulos: '',
  nivel: '',
  tipo: '',
};

const SuscripcionModal = () => {
  const dispatch = useDispatch();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const { types, levels } = useSelector(({ suscripciones }) => suscripciones);
  const [nameLevel, setNameLevel] = useState('');
  const [nameType, setNameType] = useState('');

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts()
  );

  useEffect(() => {
    setNameLevel(levels?.[0]);
    setNameType(types?.[0]);
  }, [types, levels]);

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
                  error={!!errors?.nombre}
                  helperText={errors?.nombre && errors?.nombre}
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-12">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={nameLevel}
                  options={levels}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nivel"
                      error={!!errors?.nivel}
                      helperText={errors?.nivel && errors?.nivel}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('nivel', newValue?.id);
                    setNameLevel(levels.find((item) => item.id === newValue?.id));
                  }}
                />
              </div>

              <div className="flex flex-col w-full space-y-12">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={nameType}
                  options={types}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo"
                      error={!!errors?.tipo}
                      helperText={errors?.tipo && errors?.tipo}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('tipo', newValue?.id);
                    setNameType(types.find((item) => item.id === newValue?.id));
                  }}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.periodidad}
                  helperText={errors?.periodidad && errors?.periodidad}
                  id="periodidad"
                  label="Periodidad"
                  name="periodidad"
                  value={form.periodidad}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.foto}
                  helperText={errors?.foto && errors?.foto}
                  id="foto"
                  label="Foto"
                  name="foto"
                  value={form.foto}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.descripcion}
                  helperText={errors?.descripcion && errors?.descripcion}
                  id="descripcion"
                  label="Descripción"
                  name="descripcion"
                  value={form.descripcion}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.valor}
                  helperText={errors?.valor && errors?.valor}
                  id="valor"
                  label="Valor"
                  name="valor"
                  value={form.valor}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  error={!!errors?.modulos}
                  helperText={errors?.modulos && errors?.modulos}
                  id="modulos"
                  label="Modulos"
                  name="modulos"
                  value={form.modulos}
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

export default SuscripcionModal;
