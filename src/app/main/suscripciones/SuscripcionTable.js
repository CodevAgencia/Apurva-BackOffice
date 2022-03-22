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

const rows = [
  {
    id: 'codigo',
    align: 'left',
    disablePadding: false,
    label: 'Codigo Suscripción',
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
    id: 'periodo',
    align: 'left',
    disablePadding: false,
    label: 'Periodidad',
    sort: true,
  },
  {
    id: 'foto',
    align: 'center',
    disablePadding: false,
    label: 'Foto',
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
  const searchText = useSelector(({ users }) => users.searchText);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(dataFilter);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(data, (item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(dataFilter);
    }
  }, [dataFilter, searchText]);

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
                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.codigo}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.nombre}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.periodidad}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    style={{ width: '7em' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <div className="w-full flex justify-center rounded-full overflow-hidden">
                      <img src={n.foto} alt="imagen" />
                    </div>
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.descripcion}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.valor}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.modulos}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    style={{ width: '2em' }}
                  >
                    <Tooltip title={n.status === 1 ? 'Inabilitar' : 'Habiltiar'}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={n.status === 1}
                              onChange={(event) => {
                                console.log('evento');
                              }}
                              name="estado"
                            />
                          }
                          label=""
                        />
                      </FormGroup>
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
