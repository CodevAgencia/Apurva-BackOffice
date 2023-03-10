import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from 'lodash';
import { withStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Table,
  Button,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { skyBlue } from '../../../@fuse/colors';
import UsuariosTableHead from './UsuariosTableHead';
import { openDialog } from '../../store/fuse/dialogSlice';
import { updateStateUsers } from '../../store/app/usuarioSlice';

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: 'Foto',
    sort: true,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Correo',
    sort: true,
  },
  {
    id: 'subscription',
    align: 'center',
    disablePadding: false,
    label: 'Suscripción',
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

function UsuariosTable({ users: dataUsers }) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ users }) => users.searchText);
  const filterCode = useSelector(({ users }) => users.filter);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(dataUsers, (item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(dataUsers);
    }
  }, [dataUsers, searchText]);

  useEffect(() => {
    if (filterCode !== 0) {
      // eslint-disable-next-line no-unused-expressions
      filterCode === 1
        ? setData(_.filter(dataUsers, (item) => item?.state === true))
        : setData(_.filter(dataUsers, (item) => item?.state === false));
      // setData(
      //   _.filter(dataUsers, (item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()))
      // );
      setPage(0);
    } else {
      setData(dataUsers);
    }
  }, [dataUsers, filterCode]);

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
          No existen Usuarios!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <UsuariosTableHead rows={rows} />
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
                    style={{ width: '1em' }}
                    component="th"
                    scope="row"
                  >
                    <div
                      className="rounded-full overflow-hidden"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <img src={n?.photo?.url} alt={n.name} className="w-full object-cover" />
                    </div>
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.name}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.email}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Tooltip title="Ver suscripción">
                      <Button
                        className="whitespace-no-wrap"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          //dispatch(setModuleInfo(n));
                          dispatch(
                            openDialog({
                              title: 'Suscripción activa',
                              type: 'new',
                              modal: 'userSubscriptionContent',
                              data: n
                            })
                          );
                        }}
                      >
                        Suscripción
                      </Button>
                    </Tooltip>
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    style={{ width: '2em' }}
                  >
                    <Tooltip title={n.state ? 'Inabilitar' : 'Habiltiar'}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={n.state}
                              onChange={(event) => {
                                dispatch(updateStateUsers(n.id));
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
