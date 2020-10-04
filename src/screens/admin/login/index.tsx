import React from 'react';
import {
  Button,
  Container,
  Card,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import {
  AdminLoginForm,
} from './types';
import * as Yup from 'yup';
import {
  TextField,
} from 'formik-material-ui';
import AuthStore from '../../../stores/Auth';
import {
  useHistory,
} from 'react-router';

const AdminLogin: React.FC = () => {
  const initialValues: AdminLoginForm = {
    email: '',
    password: '',
  };
  const history = useHistory();
  return (
    < Container
      style={{
        width: '100vw ',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required().min(8),
        })}
        onSubmit={async (values) => {
          try {
            await AuthStore.login(values.email, values.password);
            history.push('/admin/');
          } catch (error) {
            alert('Sorry coudn\'t log you in!');
          }
        }}
      >
        {
          (formikBag) => {
            return (
              <Form
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: 560,
                    padding: 24,
                  }}
                >
                  <Field
                    name="email"
                    component={TextField}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <Field
                    name="password"
                    component={TextField}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <Button
                    style={{
                      marginTop: 24,
                      marginBottom: 24,
                    }}
                    onClick={formikBag.submitForm}
                  >
                    {'Login'}
                  </Button>
                </Card>
              </Form>
            );
          }
        }
      </Formik>
    </Container >
  );
}

export default AdminLogin;