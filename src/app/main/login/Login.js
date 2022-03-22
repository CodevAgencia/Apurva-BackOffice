import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';

import clsx from 'clsx';
import * as yup from 'yup';
import _ from '@lodash';
import { useDispatch } from 'react-redux';
import { Button, Card, CardContent, darken, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { submitLogin } from '../../auth/store/loginSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F4F5FA',
  },
  leftSection: {
    // background: `${theme.palette.primary.main}`,
  },
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('Ingrese un email valido').required('Ingrese un email'),
  password: yup.string().required('Ingrese su contraseña.'),
  // .min(8, 'La contraseña es muy corta - deberia de tener 8 caracteres como mínimo.'),
});

const defaultValues = {
  email: '',
  password: '',
};

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    dispatch(submitLogin(data));
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className={clsx(
            classes.leftSection,
            'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
          )}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320n">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img
                  className="logo-icon w-48"
                  src="assets/images/avatars/ApurvaLogo.jpg"
                  alt="logo"
                />
                <div className="border-l-1 mr-8 ml-8 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    Apurva
                  </Typography>
                </div>
              </div>
            </motion.div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16 text-white"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16 "
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                {/*  <Controller */}
                {/*    name="remember" */}
                {/*    control={control} */}
                {/*    render={({ field }) => ( */}
                {/*      <FormControl> */}
                {/*        <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} /> */}
                {/*      </FormControl> */}
                {/*    )} */}
                {/*  /> */}

                {/*
                  Restablecer contraseña
                </Link> */}
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
              >
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div
          className={clsx(
            classes.rightSection,
            'hidden md:flex flex-1 items-center justify-center p-64'
          )}
        >
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                Bienvenido a<br />
                Apurva!
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              {/* <Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
                Cambiando la forma en la que comparte su información y se conecta con los clientes
              </Typography> */}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
