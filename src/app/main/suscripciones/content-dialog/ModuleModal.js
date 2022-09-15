import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { Cancel } from '@mui/icons-material';
import { closeDialog } from '../../../store/fuse/dialogSlice';
import { useForm } from '../../../../@fuse/hooks';
import {
  getModulesList,
  saveModulesSuscriptions,
  selectModules,
} from '../../../store/app/moduleSubscriptionSlice';

const initialData = {
  modules: '',
  subscription_id: '',
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// modules.module.name
const StructureListModulesSelect = (modules) => {
  return modules.map((module) => {
    return module.name;
  });
};

const extractNameModulesSuscription = (modules) => {
  return modules.map((item) => {
    return item.module.name;
  });
};

const ModuleModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const { infoModule } = useSelector(({ modules }) => modules);
  const modulesList = useSelector(selectModules);
  const [personName, setPersonName] = useState([]);
  const [modulesListNames, setModulesListNames] = useState([]);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts()
  );

  useEffect(() => {
    dispatch(getModulesList());
  }, [dispatch]);

  useEffect(() => {
    if (modulesList.length > 1) {
      setModulesListNames(StructureListModulesSelect(modulesList));
    }
  }, [modulesList]);

  useEffect(() => {
    if (infoModule) {
      setPersonName(personName.concat(extractNameModulesSuscription(infoModule.modules)));
    }
  }, [infoModule]);

  const handleSubmitProducts = () => {
    // si [infoModule?.modules.length] esta agregando nuevos modulos
    // caso contraio la suscripcion ya tiene modulos entonces pasa a editar si
    // da click al boton guardar
    if (infoModule?.modules.length < 1) {
      // GUARDAR
      // dispatch(saveProduct({ idCommerce, dataProduct: form }));
      dispatch(
        saveModulesSuscriptions({
          modules: modulesList,
          data: personName,
          idSuscription: infoModule.id,
          action: 'new',
        })
      );
    } else {
      // ELIMINAR
      dispatch(
        saveModulesSuscriptions({
          modules: modulesList,
          formModulesSelected: personName,
          suscriptionModules: extractNameModulesSuscription(infoModule?.modules),
          idSuscription: infoModule.id,
          action: 'edit',
        })
      );
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

  const handleDelete = (e, value) => {
    e.preventDefault();
    // TODO: ELIMINAR EL MODULO DE LA SUSCRIPCIÓN BUSCANDO EL NOMBRE
    // ACTUALIZAR LA INFO DE LA SUSCRIPCIÓN SELECCIONADA
    // Y ACTUALIZAR LA SUSCRIPCION EN SU PROPIO STORE
    console.log('clicked delete: ', value);
  };

  return (
    <>
      <DialogContent className="p-8">
        <div className="my-14">
          <form>
            <div>
              {modulesList.length > 1 && (
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-multiple-chip-label">Módulos</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    name="modules"
                    multiple
                    value={personName}
                    onChange={handleChangeSelect}
                    input={<OutlinedInput id="select-multiple-chip" name="modules" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            deleteIcon={<Cancel onMouseDown={(event) => event.stopPropagation()} />}
                            onDelete={(e) => handleDelete(e, value)}
                            onClick={() => console.log('clicked chip')}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {modulesListNames.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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

export default ModuleModal;
