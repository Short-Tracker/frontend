import { useState, ChangeEvent, FormEvent } from 'react';
import { validateField } from './validateFields';

export interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

export const useForm = ({ initialValues, onSubmit }: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimmedValue = event.target.value.trim();

    setValues((prevValues) => ({
      ...prevValues,
      [name]: trimmedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, trimmedValue),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {};

    Object.entries(values).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleBlur,
    handleSubmit,
  };
};
