import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from '../../components/register-form/register-from';
import Base from '../../components/layout/base/base';
import useForm, { TFields } from '../../hooks/use-form';
import useAuth from '../../hooks/use-auth';
import useForgotPassword from '../../hooks/use-forgot-password';
import WithLoader from '../../components/with-loader/with-loader';
import { Step } from '../../services/actions/forgot-password';

const ForgotPassword: React.FC = () => {
  const { register, errors, handleSubmit } = useForm({
    initialValues: {
      email: '',
    }
  });

  const { getCode, step, isLoading } = useForgotPassword();
  const { user } = useAuth();

  const onSubmit = ({ email }: TFields) => getCode(email);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (step === Step.RESET) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }

  return (
    <WithLoader isLoading={isLoading}>
      <Base>
        <RegisterForm
          onSubmit={handleSubmit(onSubmit)}
          header={(
            <h5 className="text text_type_main-medium mb-6">
              Восстановление пароля
            </h5>
          )}
          body={(
            <>
              <div className="mb-6">
                <Input
                  placeholder="Укажите e-mail"
                  {...register('email', { required: true, email: true })}
                  error={!!errors.email}
                  errorText={errors.email}
                />
              </div>
              <Button size="large">Восстановить</Button>
            </>
          )}
          footer={(
            <p className="text text_type_main-default text_color_inactive mb-4">
              Вспомнили пароль?&nbsp;
              <Link className="link" to="/login">Войти</Link>
            </p>
          )}
        />
      </Base>
    </WithLoader>
  );
};

export default ForgotPassword;
