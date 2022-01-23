import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import registerFormStyles from './register-form.module.css';

const RegisterForm = ({
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

RegisterForm.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  onSubmit: PropTypes.func
};

export default RegisterForm;
