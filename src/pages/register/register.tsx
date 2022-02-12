import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from '../../components/register-form/register-from';
import Base from '../../components/layout/base/base';
import InputPassword from '../../components/input-password/input-password';
import useForm from '../../hooks/use-form';
import useAuth from '../../hooks/use-auth';

const Register: React.FC = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    errors
  } = useForm({
    initialValues: {
      name: '',
      password: '',
      email: ''
    }
  });

  const onSubmit = ({ email, password, name }: { [name: string]: string }) => auth.register(email, password, name);

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <Base>
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        header={(
          <h5 className="text text_type_main-medium mb-6">
            Регистрация
          </h5>
        )}
        body={(
          <>
            <div className="mb-6">
              <Input
                {...register('name', { required: true })}
                placeholder="Имя"
                error={!!errors.name}
                errorText={errors.name}
              />
            </div>
            <div className="mb-6">
              <Input
                {...register('email', { required: true, email: true })}
                placeholder="E-mail"
                error={!!errors.email}
                errorText={errors.email}
              />
            </div>
            <div className="mb-6">
              <InputPassword
                {...register('password', { required: true })}
                placeholder="Введите новый пароль"
                error={!!errors.password}
                errorText={errors.password}
              />
            </div>
            <Button size="large">Зарегистрироваться</Button>
          </>
        )}
        footer={(
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегистрированы?&nbsp;
            <Link className="link" to="/login">Войти</Link>
          </p>
        )}
      />
    </Base>
  );
};

export default Register;
