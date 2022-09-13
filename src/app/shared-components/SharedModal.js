import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import { closeDialog } from '../store/fuse/dialogSlice';
import { SelectModalContent } from '../utils/modulesNameList';

const SharedModal = () => {
  const dispatch = useDispatch();
  const isOpenDialog = useSelector(({ fuse }) => fuse.dialog.state);
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  // const infoUser = useSelector(({ users }) => users.infoUser);

  const closeSharedDialog = () => {
    dispatch(closeDialog());
    // dispatch(reset);
  };

  const handleUploadChange = (e) => {};

  return (
    <Dialog
      classes={{
        paper: 'm-0',
      }}
      open={isOpenDialog}
      maxWidth="sm"
      fullWidth
      onClose={() => closeSharedDialog()}
    >
      <AppBar elevation={1} position="static">
        <Toolbar className="flex justify-between w-full">
          <div className="flex items-center space-x-16 ¿">
            <div className="w-full flex items-center space-x-8">
              <Typography color="inherit" variant="subtitle1">
                {optionsDialog?.title}
              </Typography>
            </div>
          </div>
          <IconButton
            className="cursor-pointer text-white"
            size="medium"
            onClick={() => closeSharedDialog()}
          >
            <MdClose />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="mx-16">{SelectModalContent[optionsDialog.modal]}</div>
    </Dialog>
  );
};

export default SharedModal;
