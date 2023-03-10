import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';

const initialData = {
  id: 0,
  cedula: '',
  tarjeta: '',
};

const SubscriptionDialog = () => {
  const dispatch = useDispatch();
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const subscription = optionsDialog?.data?.current_subscription;

  const textStyle = {fontSize: 15 , marginLeft: 10, color: 'gray'};
  const labelStyle = {fontSize: 15, fontWeight: 'bold', color: '#000'};
  const contentStyle = {width: '100%', display: 'flex', padding: 7, justifyContent: 'left'};

  return (
    <>
      <DialogContent className="p-8">
        <div className="my-14">
          {!subscription && 
            <h1
              style={{ fontSize: 18, color: "gray", textAlign: "center" }}
            >
              Este usuario no cuenta con una subscripción activa
            </h1>
          }

          {
            subscription &&
            <div>
              <div style={contentStyle}>
                <span style={labelStyle}>Nombre:</span>
                <span style={textStyle}>{subscription.name_es}</span>
              </div>

              <div style={contentStyle}>
                <span style={labelStyle}>Tipo:</span>
                <span style={textStyle}>{subscription.type?.name_es}</span>
              </div>

              <div style={contentStyle}>
                <span style={labelStyle}>Periodidad:</span>
                <span style={textStyle}>{subscription.period_name?.es}</span>
              </div>

              <div style={contentStyle}>
                <span style={labelStyle}>Fecha ultima renovación:</span>
                <span style={textStyle}>{subscription.renewal_date}</span>
              </div>

              <div style={contentStyle}>
                <span style={labelStyle}>Fecha de expiración:</span>
                <span style={textStyle}>{subscription.date_end}</span>
              </div>

              <div style={contentStyle}>
                <span style={labelStyle}>Autorenovación:</span>
                <span style={textStyle}>{subscription.auto_renewing ? 'Activada' : 'Desactivada'}</span>
              </div>
            </div>
          }
        </div>
      </DialogContent>
      <DialogActions className="flex-end px-8 py-16">
        <div className="px-16">
          <Button onClick={() => dispatch(closeDialog())} variant="contained" color="primary">
            Cerrar
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default SubscriptionDialog;
