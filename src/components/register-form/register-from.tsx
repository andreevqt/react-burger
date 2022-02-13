import React from 'react';
import classNames from 'classnames';
import registerFormStyles from './register-form.module.css';

type TRegisterFormProps = {
  className?: string;
  onSubmit: (e: React.FormEvent) => void;
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

const RegisterForm: React.FC<TRegisterFormProps> = ({
  className,
  onSubmit,
  header,
  body,
  footer
}) => {
  const classes = classNames(registerFormStyles['form'], 'mt-30', className);

  return (
    <form onSubmit={onSubmit} className={classes}>
      {
        header && (
          <div className={registerFormStyles['header']}>
            {header}
          </div>
        )
      }
      {
        body && (
          <div className={registerFormStyles['body']}>
            {body}
          </div>
        )
      }
      {
        footer && (
          <div className={registerFormStyles['footer']}>
            {footer}
          </div>
        )
      }
    </form>
  );
};

export default RegisterForm;
