import React, { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash.isequal';

const validateRequired = (value: any) => !!value;

const validateEmail = (email: string) => email
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export type TValidatorOptions = { msg: string };

export type TSchema = {
  required?: TValidatorOptions | boolean;
  email?: TValidatorOptions | boolean;
}

export type TSchemas<T> = {
  [name in keyof T]: TSchema;
};

export type TTouched<T> = {
  [name in keyof T]?: boolean;
};

export type TError<T> = {
  [name in keyof T]?: string;
};

export type TFields = {
  [name: string]: string;
};

const useForm = ({ initialValues }: { initialValues: TFields }) => {
  const [fields, setFields] = useState<TFields>({ ...initialValues });
  const [schemas, setSchemas] = useState<TSchemas<TFields>>({});
  const [touched, setTouched] = useState<TTouched<TFields>>({});
  const [errors, setErrors] = useState<TError<TFields>>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = useCallback((validateTouched = true) => {
    const errs: TError<TFields> = {};

    (Object.keys(schemas) as Array<keyof TFields>).forEach((key) => {
      const isTouched = touched[key];
      if (validateTouched && !isTouched) {
        return;
      }
      const value = fields[key];
      const schema = schemas[key];
      if (!schema) {
        return;
      }
      if (typeof schema.required !== 'undefined') {
        const result = validateRequired(value);
        if (!result) {
          errs[key] = typeof schema.required === 'boolean' ? 'Требуемое поле' : schema.required.msg;
          return;
        }
      }
      if (typeof schema.email !== 'undefined') {
        const result = validateEmail(value);
        if (!result) {
          errs[key] = typeof schema.email === 'boolean' ? 'Введите корректный e-mail' : schema.email.msg;
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

  const register = (name: keyof TFields, schema?: TSchema) => {
    if (schema && !schemas[name]) {
      setSchemas({ ...schemas, [name]: schema });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({ ...fields, [name]: e.target.value });
    };

    const onBlur = () => {
      if (!touched[name]) {
        setTouched({ ...touched, [name]: true });
      }
    };

    return {
      name: name as string,
      onChange,
      onBlur,
      value: fields[name]
    };
  };

  const handleSubmit = (onSubmit: (values: TFields) => void) => (e: React.FormEvent) => {
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
