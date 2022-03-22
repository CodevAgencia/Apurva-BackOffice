import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { TableCell, TableHead, TableRow } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function SuscripcionesTableHead({ rows }) {
  const classes = useStyles();
  return (
    <TableHead className={clsx('', classes.subHeader)}>
      <TableRow className={clsx('h-64', classes.subHeader)}>
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align={row.align || 'left'}
              className={clsx('whitespace-nowrap', classes.subHeader)}
              padding={row.disablePadding ? 'none' : 'normal'}
            >
              {row.label}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default SuscripcionesTableHead;
