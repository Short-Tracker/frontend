import { useState, ChangeEvent, FormEvent } from 'react';

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string | null;
}

interface UseFormProps {
  initialValues: FormValues;
  validationFunction: (name: string, value: string) => string | null;
  onSubmit: (values: FormValues) => void;
}

export const useForm = ({
  initialValues,
  validationFunction,
  onSubmit,
}: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validationFunction(name, value);

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {};

    Object.entries(values).forEach(([name, value]) => {
      const error = validationFunction(name, value);
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
    handleChange,
    handleSubmit,
  };
};
