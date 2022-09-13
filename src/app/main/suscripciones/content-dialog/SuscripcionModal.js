import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';
import verifyFormSuscription from '../rules/verifyFormSuscription';
import {
  restarInfoSuscription,
  saveSuscription,
  updateSuscription,
} from '../../../store/app/suscriptionSlice';

const initialData = {
  name_en: '',
  description_en: '',
  name_es: '',
  description_es: '',
  price: '',
  period: 1,
  active: 1,
  level_id: '',
  type_id: '',
};

const periodidadData = [
  {
    id: 1,
    name: 'Mensual',
    value: 1,
  },
  {
    id: 2,
    name: 'Trimestral',
    value: 3,
  },
  {
    id: 3,
    name: 'Anual',
    value: 12,
  },
];

const SuscripcionModal = () => {
  const dispatch = useDispatch();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const isOpenDialog = useSelector(({ fuse }) => fuse.dialog.state);
  const { types, levels } = useSelector(({ suscripciones }) => suscripciones);
  const editSuscriptionData = useSelector(({ suscripciones }) => suscripciones.infoSuscription);
  const [nameLevel, setNameLevel] = useState('');
  const [nameType, setNameType] = useState('');
  const [periodSelect, setPeriodSelect] = useState([]);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitSuscriptions(),
    verifyFormSuscription
  );

  useEffect(() => {
    if (optionsDialog.type === 'edit') {
      setForm({
        ...form,
        ...editSuscriptionData,
      });
      setPeriodSelect(periodidadData.find((i) => i.value === editSuscriptionData.period));
      setNameLevel(levels.find((i) => i.id === editSuscriptionData.level_id));
      setNameType(types.find((i) => i.id === editSuscriptionData.type_id));
    } else {
      setForm({ ...initialData });
      setPeriodSelect(periodidadData[0]);
    }
  }, [dispatch]);

  useEffect(() => {
    if (optionsDialog.type === 'new') {
      setNameLevel(levels?.[0]);
      setNameType(types?.[0]);
      setForm({
        ...form,
        level_id: handleGetIdLevelAndType(levels),
        type_id: handleGetIdLevelAndType(types),
      });
    }
  }, [types, levels]);

  const handleGetIdLevelAndType = (data) => {
    if (!data?.[0] || data.length < 1) return 0;
    return data?.[0]?.id;
  };

  const handleSubmitSuscriptions = () => {
    if (optionsDialog?.type === 'new') {
      // GUARDAR
      dispatch(saveSuscription(form));
    } else {
      // ACTUALIZAR
      dispatch(updateSuscription(form));
      dispatch(restarInfoSuscription());
    }
  };

  return (
    <>
      <DialogContent className="p-8">
        <div className="my-14">
          <form>
            <div className="flex flex-col w-full space-y-12">
              <div>
                <TextField
                  error={!!errors?.name_en}
                  helperText={errors?.name_en && errors?.name_en}
                  id="name_en"
                  label="Nombre (en)"
                  name="name_en"
                  value={form.name_en}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  error={!!errors?.name_es}
                  helperText={errors?.name_es && errors?.name_es}
                  id="name_es"
                  label="Nombre (es)"
                  name="name_es"
                  value={form.name_es}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  error={!!errors?.description_en}
                  helperText={errors?.description_en && errors?.description_en}
                  id="description_en"
                  label="Descripción (en)"
                  name="description_en"
                  value={form.description_en}
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  error={!!errors?.description_es}
                  helperText={errors?.description_es && errors?.description_es}
                  id="description_es"
                  label="Descripción (es)"
                  name="description_es"
                  value={form.description_es}
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  error={!!errors?.price}
                  helperText={errors?.price && errors?.price}
                  id="price"
                  type="number"
                  inputProps={{ min: 0 }}
                  label="Valor"
                  name="price"
                  value={form.price}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full space-y-12">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={periodSelect}
                  options={periodidadData}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Periodidad"
                      error={!!errors?.period}
                      helperText={errors?.period && errors?.period}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('period', newValue?.value);
                    setPeriodSelect(periodidadData.find((item) => item.id === newValue?.id));
                  }}
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
                      error={!!errors?.level_id}
                      helperText={errors?.level_id && errors?.level_id}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('level_id', newValue?.id);
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
                      error={!!errors?.type_id}
                      helperText={errors?.type_id && errors?.type_id}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setInForm('type_id', newValue?.id);
                    setNameType(types.find((item) => item.id === newValue?.id));
                  }}
                />
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
              dispatch(restarInfoSuscription());
            }}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>
        </div>
        <div className="px-16">
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            {/* <Button onClick={handleSubmitSuscriptions} variant="contained" color="secondary"> */}
            Guardar
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default SuscripcionModal;
