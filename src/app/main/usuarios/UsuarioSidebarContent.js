import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListSubheader,
  Radio,
  RadioGroup,
} from '@mui/material';
import { setFilter } from '../../store/app/usuarioSlice';
import { openDialog } from '../../store/fuse/dialogSlice';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: '100%',
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 4,
    '&.active': {
      backgroundColor:
        theme.palette.type === 'light'
          ? 'rgba(0, 0, 0, .05)!important'
          : 'rgba(255, 255, 255, .1)!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '& .list-item-icon': {
      fontSize: 16,
      width: 16,
      height: 16,
      marginRight: 16,
    },
  },
  listSubheader: {
    paddingLeft: 12,
  },
}));

const categoriasFake = [
  {
    id: 1,
    nombre: 'Cervezas',
  },
  {
    id: 2,
    nombre: 'Hambuerguesas',
  },
  {
    id: 3,
    nombre: 'Comida Japonesa',
  },
];

function UsuariosSidebarContent(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  // TODO: RECUPERAR LAS CATEGORIAS DEL STORE PARA LISTARLAS

  const handleSelectCategoryFilter = (id) => {
    dispatch(setFilter(id));
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      className="flex-auto border-l-1 border-solid"
    >
      <div className="p-24 pb-16 space-y-8">
        <Button
          onClick={() => dispatch(openDialog({ title: 'Nuevo Usuraio', type: 'new' }))}
          variant="contained"
          color="secondary"
          className="w-full"
        >
          Nuevo Usuario
        </Button>
        <Button
          onClick={() => console.log('exportar')}
          variant="outlined"
          color="secondary"
          className="w-full"
        >
          Exportar CSV
        </Button>
      </div>
      <div className="px-12">
        <List>
          {props?.categories && (
            <>
              <ListSubheader className={classes.listSubheader} disableSticky>
                CATEGORIAS
              </ListSubheader>

              <FormControl component="fieldset">
                <RadioGroup aria-label="categoria" defaultValue="all" name="radio-buttons-group">
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="Todos"
                    onClick={(event) => handleSelectCategoryFilter(0)}
                  />
                  {props.categories.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item?.id?.toString()}
                      control={<Radio />}
                      label={item?.category}
                      onClick={(event) => handleSelectCategoryFilter(item?.id)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          )}
        </List>
      </div>
    </motion.div>
  );
}

export default UsuariosSidebarContent;
