import React from 'react';
import classNames from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Base from '../../components/layout/base/base';
import MenuItem from '../../components/menu/menu-item/menu-item';
import Menu from '../../components/menu/menu';
import Row from '../../components/grid/row/row';
import Col from '../../components/grid/col/col';
import RegisterForm from '../../components/register-form/register-from';
import InputEditable from '../../components/input-editable/input-editable';
import profileStyles from './profile.module.css';
import useAuth from '../../hooks/use-auth';
import useForm from '../../hooks/use-form';

const Profile = () => {
  const descriptionClasses = classNames('mt-20 text text_type_main-default text_color_inactive', profileStyles['description']);
  const { user, update } = useAuth();

  const initialValues = {
    name: user.name,
    email: user.email,
    password: ''
  };

  const {
    register,
    errors,
    handleSubmit,
    setFields,
    fields,
    isDirty
  } = useForm({
    initialValues
  });

  const onSubmit = (data) => update(data);

  const clear = () => setFields(initialValues);

  const clearField = (name) => () => setFields({ ...fields, [name]: '' });

  return (
    <Base>
      <Row>
        <Col>
          <Menu direction="column" size="big" className="mt-30">
            <MenuItem to="/profile" label="Профиль" />
            <MenuItem to="/profile/orders" label="История заказа" />
            <MenuItem to="/logout" label="Выход" />
          </Menu>
          <p className={descriptionClasses}>
            В этом разделе вы можете
            изменить свои персональные данные
          </p>
        </Col>
        <Col mod="auto">
          <RegisterForm
            onSubmit={handleSubmit(onSubmit)}
            body={(
              <>
                <div className="mb-6">
                  <InputEditable
                    placeholder="Имя"
                    {...register('name', { required: true })}
                    onDelete={clearField('name')}
                    error={!!errors.name}
                    errorText={errors.name}
                  />
                </div>
                <div className="mb-6">
                  <InputEditable
                    placeholder="Логин"
                    {...register('email', { required: true, email: true })}
                    onDelete={clearField('email')}
                    error={!!errors.email}
                    errorText={errors.email}
                  />
                </div>
                <div className="mb-6">
                  <InputEditable
                    type="password"
                    onDelete={clearField('password')}
                    placeholder="Пароль"
                    {...register('password')}
                  />
                </div>
                {isDirty && (
                  <div className={profileStyles['buttons']}>
                    <Button type="secondary" size="large" htmlType="button" onClick={clear}>
                      Отмена
                    </Button>
                    <Button size="large" htmlType="submit">
                      Сохранить
                    </Button>
                  </div>
                )}
              </>
            )}
          />
        </Col>
        <Col />
      </Row>
    </Base>
  );
};

export default Profile;
