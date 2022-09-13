import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { closeDialog } from '../../../store/fuse/dialogSlice';
import { useForm } from '../../../../@fuse/hooks';

const initialData = {
  name_en: '',
  description_en: '',
  name_es: '',
  description_es: '',
  price: '',
  period: '',
  active: '',
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SuscripcionModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const { types, levels } = useSelector(({ suscripciones }) => suscripciones);
  const [nameLevel, setNameLevel] = useState('');
  const [nameType, setNameType] = useState('');
  const [periodSelect, setPeriodSelect] = useState([]);
  const [personName, setPersonName] = React.useState([]);

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

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      <DialogContent className="p-8">
        <div className="my-14">
          <form>
            <div>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
