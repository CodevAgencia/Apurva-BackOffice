import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { Hidden, Icon, IconButton, Input, Paper } from '@mui/material';
import { setUsersSearchText } from '../../store/app/usuarioSlice';

function SuscripcionesHeader(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ users }) => users.searchText);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1 items-center">
        <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
          <Hidden lgUp>
            <IconButton
              onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
              size="large"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            // placeholder={t('SEARCH_PLACEHOLDER')}
            className="px-16"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setUsersSearchText(ev))}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default SuscripcionesHeader;
