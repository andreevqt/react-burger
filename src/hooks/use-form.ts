// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash.isequal';

const validateRequired = (value: any) => !!value;

const validateEmail = (email: string) => email
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

/* react-hook-form like hook */

const useForm = <T>({ initialValues }: { initialValues: T }) => {
  const [fields, setFields] = useState<T>({ ...initialValues });
  const [schemas, setSchemas] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState<{ [name in keyof T]?: string }>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = useCallback((validateTouched = true) => {
    const errs = {};

    Object.keys(schemas).forEach((key) => {
      const isTouched = touched[key];
      if (validateTouched && !isTouched) {
        return;
      }
      const value = fields[key];
      const schema = schemas[key];
      if (typeof schema.required !== 'undefined') {
        const result = validateRequired(value);
        if (!result) {
          errs[key] = schema.required.msg || 'Требумое поле';
          return;
        }
      }
      if (typeof schema.email !== 'undefined') {
        const result = validateEmail(value);
        if (!result) {
          errs[key] = schema.email.msg || 'Введите корректный e-mail';
        }
      }
    });

    return errs;
  }, [schemas, touched, fields]);

  useEffect(() => {
    const validatonResult = validateForm();
    setErrors(validatonResult);
  }, [fields, touched, validateForm]);

  useEffect(() => {
    setIsDirty(!isEqual(initialValues, fields));
  }, [fields, initialValues]);

  const register = (name: string, schema?: any) => {
    if (schema && !schemas[name]) {
      setSchemas({ ...schemas, [name]: schema });
    }

    const onChange = (e) => {
      setFields({ ...fields, [name]: e.target.value });
    };

    const onBlur = () => {
      if (!touched[name]) {
        setTouched({ ...touched, [name]: true });
      }
    };

    return {
      onChange,
      onBlur,
      value: fields[name]
    };
  };

  const handleSubmit = (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    const validatonResult = validateForm(false);
    if (Object.keys(validatonResult).length) {
      return;
    }

    onSubmit(fields);
  };

  return {
    register,
    handleSubmit,
    errors,
    fields,
    setFields,
    isDirty
  };
};

export default useForm;
