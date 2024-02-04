export const validateField = (name: string, value: string): string => {
  switch (name) {
    case 'email':
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Email введен некорректно';
      }
      break;
    case 'password':
      if ((value.length !== 0 && value.length < 6) || value.length > 10) {
        return 'Минимум 6 и максимум 10 символов';
      }
      break;
    default:
      return '';
  }

  return '';
};
