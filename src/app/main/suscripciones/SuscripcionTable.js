import FuseScrollbars from '@fuse/core/FuseScrollbars';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import withRouter from '@fuse/core/withRouter';
import _ from 'lodash';
import { red } from '@mui/material/colors';
import { withStyles } from '@mui/styles';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import SuscripcionesTableHead from './SuscripcionesTableHead';
import { skyBlue } from '../../../@fuse/colors';
import { findSuscriptionLevel, findSuscriptionType } from '../../utils/levelAndTypeSuscription';
import { findPeriodidad } from '../../utils/perioridadSuscriptions';
import { TruncateString } from '../../utils/TruncateString';
import { mergeModulesNames } from '../../utils/modulesNameList';
import { openDialog } from '../../store/fuse/dialogSlice';
import { setInfoSuscription, updateSuscription } from '../../store/app/suscriptionSlice';
import { setModuleInfo } from '../../store/app/moduleSubscriptionSlice';

const rows = [
  {
    id: 'codigo',
    align: 'left',
    disablePadding: false,
    label: 'Código',
    sort: true,
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'nivel',
    align: 'left',
    disablePadding: false,
    label: 'Nivel',
    sort: true,
  },
  {
    id: 'tipo',
    align: 'left',
    disablePadding: false,
    label: 'Tipo',
    sort: true,
  },
  {
    id: 'periodo',
    align: 'left',
    disablePadding: false,
    label: 'Periodidad',
    sort: true,
  },
  {
    id: 'descripcion',
    align: 'left',
    disablePadding: false,
    label: 'Descripción',
    sort: true,
  },
  {
    id: 'valor',
    align: 'left',
    disablePadding: false,
    label: 'Valor',
    sort: true,
  },
  {
    id: 'modulo',
    align: 'left',
    disablePadding: false,
    label: 'Módulos',
    sort: true,
  },
  {
    id: 'estados',
    align: 'center',
    disablePadding: false,
    label: 'Estados',
    sort: true,
  },
  {
    id: 'actions',
    align: 'center',
    disablePadding: false,
    label: 'Acciones',
    sort: true,
  },
];

const CustomSwitch = withStyles({
  switchBase: {
    color: red[300],
    '&$checked': {
      color: skyBlue[500],
    },
    '&$checked + $track': {
      backgroundColor: skyBlue[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: red[300],
  },
})(Switch);

function UsuariosTable({ dataFilter }) {
  const dispatch = useDispatch();
  const searchTextSuscriptions = useSelector(({ suscripciones }) => suscripciones.searchText);
  const { types, levels } = useSelector(({ suscripciones }) => suscripciones);
  const [loading, setLoading] = useState(false);
  const filterCode = useSelector(({ suscripciones }) => suscripciones.filter);

  const [data, setData] = useState(dataFilter);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchTextSuscriptions.length !== 0) {
      setData(
        _.filter(dataFilter, (item) =>
          item?.name_es?.toLowerCase().includes(searchTextSuscriptions.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(dataFilter);
    }
  }, [dataFilter, searchTextSuscriptions]);

  useEffect(() => {
    if (filterCode !== 0) {
      // eslint-disable-next-line no-unused-expressions
      filterCode === 1
        ? setData(_.filter(dataFilter, (item) => item?.active === 1))
        : setData(_.filter(dataFilter, (item) => item?.active === 0));
      setPage(0);
    } else {
      setData(dataFilter);
    }
  }, [dataFilter, filterCode]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          No existen Productos!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <SuscripcionesTableHead rows={rows} />
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  // role="checkbox"
                  // aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  // selected={isSelected}
                  // onClick={(event) => handleClick(n)}
                >
                  <TableCell
                    className="p-4 md:p-16 truncate"
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {n.id}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.name_es}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {findSuscriptionLevel(n.level_id, levels)}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {findSuscriptionType(n.type_id, types)}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {findPeriodidad(n.period)}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {TruncateString(n?.description_es, 25)}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.price}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {mergeModulesNames(n?.modules)}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    style={{ width: 'auto' }}
                  >
                    <Tooltip title={n.active === 1 ? 'Inabilitar' : 'Habiltiar'}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={n.active === 1}
                              onChange={(event) => {
                                dispatch(
                                  updateSuscription({ ...n, active: n.active === 1 ? 0 : 1 })
                                );
                              }}
                              name="estado"
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </Tooltip>
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 flex justify-center items-center space-x-8"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Tooltip title="Agregar modulo">
                      <Button
                        className="whitespace-no-wrap"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          dispatch(setModuleInfo(n));
                          dispatch(
                            openDialog({
                              title: 'Agregar módulo',
                              type: 'new',
                              modal: 'moduleModalContent',
                            })
                          );
                        }}
                      >
                        Módulo
                      </Button>
                    </Tooltip>
                    <Tooltip title="Editar Suscripción">
                      <Button
                        className="whitespace-no-wrap"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          dispatch(setInfoSuscription(n));
                          dispatch(
                            openDialog({
                              title: 'Editar Suscripción',
                              type: 'edit',
                              modal: 'suscriptionModalContent',
                            })
                          );
                        }}
                      >
                        Editar
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        /* eslint-disable-next-line react/jsx-no-bind */
        onPageChange={handleChangePage}
        /* eslint-disable-next-line react/jsx-no-bind */
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(UsuariosTable);
