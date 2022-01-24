import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Base from '../../components/layout/base/base';
import Row from '../../components/grid/row/row';
import Col from '../../components/grid/col/col';
import RegisterForm from '../../components/register-form/register-from';
import InputPassword from '../../components/input-password/input-password';
import useForm from '../../hooks/use-form';
import useAuth from '../../hooks/use-auth';

const Login = () => {
  const { login, user } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    errors
  } = useForm({
    initialValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = ({ email, password }) => login(email, password);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: location.state ? location.state.from.pathname : '/',
          ...(location.state && { state: location.state.from.state })
        }}
      />
    );
  }

  return (
    <Base>
      <Row>
        <Col mod="auto" align="center">
          <RegisterForm
            onSubmit={handleSubmit(onSubmit)}
            header={(
              <h5 className="text text_type_main-medium mb-6">
                Вход
              </h5>
            )}
            body={(
              <>
                <div className="mb-6">
                  <Input
                    placeholder="E-mail"
                    error={!!errors.email}
                    errorText={errors.email}
                    {...register('email', { required: true, email: true })}
                  />
                </div>
                <div className="mb-6">
                  <InputPassword
                    placeholder="Пароль"
                    error={!!errors.password}
                    errorText={errors.password}
                    {...register('password', { required: true })}
                  />
                </div>
                <Button size="large">
                  Войти
                </Button>
              </>
            )}
            footer={(
              <>
                <p className="text text_type_main-default text_color_inactive mb-4">
                  Вы — новый пользователь?&nbsp;
                  <Link className="link" to="/register">Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive mb-4">
                  Забыли пароль?&nbsp;
                  <Link className="link" to="/forgot-password">Восстановить пароль</Link>
                </p>
              </>
            )}
          />
        </Col>
      </Row>
    </Base>
  );
};

export default Login;
