import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterForm from '../../components/register-form/register-from';
import InputEditable from '../../components/input-editable/input-editable';
import profileStyles from './profile.module.css';
import useAuth from '../../hooks/use-auth';
import useForm, { TFields } from '../../hooks/use-form';
import ProfileLayout from '../../components/layout/profile/profile';

const Profile = () => {
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

  const onSubmit = (data: TFields) => update(data);

  const clear = () => setFields(initialValues);

  const clearField = (name: string) => () => setFields({ ...fields, [name]: '' });

  return (
    <ProfileLayout
      description="В этом разделе вы можете изменить свои персональные данные"
      content={(
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
      )}
    />
  );
};

export default Profile;
