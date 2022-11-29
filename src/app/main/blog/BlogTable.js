import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from 'lodash';
import { withStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
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
import BlogTableHead from './BlogTableHead';
import { skyBlue } from '../../../@fuse/colors';
import { TruncateString } from '../../utils/TruncateString';
import { setInfoBlog, updateStateBlog } from '../../store/app/blogSlice';
import { openDialog } from '../../store/fuse/dialogSlice';

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Id Blog',
    sort: true,
  },
  // {
  //   id: 'fecha',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Fecha',
  //   sort: true,
  // },
  {
    id: 'categoria',
    align: 'left',
    disablePadding: false,
    label: 'Categoría',
    sort: true,
  },
  {
    id: 'titulo',
    align: 'left',
    disablePadding: false,
    label: 'Título',
    sort: true,
  },
  {
    id: 'descripción',
    align: 'left',
    disablePadding: false,
    label: 'Descripción',
    sort: true,
  },
  {
    id: 'imagen',
    align: 'center',
    disablePadding: false,
    label: 'Imagen',
    sort: true,
  },
  // {
  //   id: 'video',
  //   align: 'center',
  //   disablePadding: false,
  //   label: 'Video',
  //   sort: true,
  // },
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

function BlogTable({ blogs: dataBlogs }) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ blogs }) => blogs.searchText);
  const filterCode = useSelector(({ blogs }) => blogs.filter);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(dataBlogs, (item) =>
          item?.title_es?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(dataBlogs);
    }
  }, [dataBlogs, searchText]);

  useEffect(() => {
    if (filterCode !== 0) {
      // eslint-disable-next-line no-unused-expressions
      filterCode === 1
        ? setData(_.filter(dataBlogs, (item) => item?.state === true))
        : setData(_.filter(dataBlogs, (item) => item?.state === false));
      setPage(0);
    } else {
      setData(dataBlogs);
    }
  }, [dataBlogs, filterCode]);

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
          No existen Blogs!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <BlogTableHead rows={rows} />
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
                    style={{ width: '2em' }}
                    component="th"
                    scope="row"
                  >
                    {n.id}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n?.category?.category || 'Sin categoría'}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.title_es}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {TruncateString(n?.description_es)}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    style={{ width: '7em' }}
                    component="th"
                    scope="row"
                  >
                    <div className="w-full flex justify-center rounded-full overflow-hidden">
                      <img
                        src={
                          `${process.env.REACT_APP_APURVA_API}${n.image}` ||
                          'assets/images/avatars/ApurvaLogo.jpg'
                        }
                        alt="imagen"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    style={{ width: '1em' }}
                  >
                    <Tooltip title={n.state ? 'Inabilitar' : 'Habiltiar'}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={n.state}
                              onChange={(event) => {
                                dispatch(updateStateBlog(n.id));
                              }}
                              name="estado"
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                    <Tooltip title="Editar">
                      <Button
                        className="whitespace-no-wrap"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          dispatch(setInfoBlog(n));
                          dispatch(
                            openDialog({
                              title: 'Editar Blog',
                              type: 'edit',
                              modal: 'blogModalContent',
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

export default withRouter(BlogTable);
// export default BlogTable;
