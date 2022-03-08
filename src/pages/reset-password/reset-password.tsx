import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from '../../components/register-form/register-from';
import Base from '../../components/layout/base/base';
import Row from '../../components/grid/row/row';
import Col from '../../components/grid/col/col';
import InputPassword from '../../components/input-password/input-password';
import useForgotPassword from '../../hooks/use-forgot-password';
import useForm, { TFields } from '../../hooks/use-form';
import useAuth from '../../hooks/use-auth';
import WithLoader from '../../components/with-loader/with-loader';
import { Step } from '../../services/action-types/forgot-password';

const ResetPassword: React.FC = () => {
  const { step, reset, isLoading } = useForgotPassword();
  const { user } = useAuth();
  const { errors, handleSubmit, register } = useForm({
    initialValues: {
      token: '',
      password: '',
    }
  });

  const onSubmit = ({ password, token }: TFields) => reset(password, token);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (step === Step.CODE) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <WithLoader isLoading={isLoading}>
      <Base>
        <Row>
          <Col mod="auto" align="center">
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
                    <InputPassword
                      placeholder="Введите новый пароль"
                      error={!!errors.password}
                      errorText={errors.password}
                      {...register('password')}
                    />
                  </div>
                  <div className="mb-6">
                    <Input
                      placeholder="Введите код из письма"
                      error={!!errors.token}
                      errorText={errors.token}
                      {...register('token')}
                    />
                  </div>
                  <Button size="large">Сохранить</Button>
                </>
              )}
              footer={(
                <p className="text text_type_main-default text_color_inactive mb-4">
                  Вспомнили пароль?&nbsp;
                  <Link className="link" to="/login">Войти</Link>
                </p>
              )}
            />
          </Col>
        </Row>
      </Base>
    </WithLoader>
  );
};

export default ResetPassword;
