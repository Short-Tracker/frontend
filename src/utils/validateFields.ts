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
    case 'name':
      if (!/^[а-яА-ЯёЁ\s-]{2,30}$/.test(value)) {
        return 'Используйте кириллицу, дефисы и пробелы';
      }
      break;
    case 'lastName':
      if (!/^[а-яА-ЯёЁ\s-]{2,30}$/.test(value)) {
        return 'Используйте кириллицу, дефисы и пробелы';
      }
      break;
    case 'nickname':
      if (!/^@[a-zA-Z0-9_]{5,33}$/.test(value)) {
        return 'Неверный формат ника telegram';
      }
      break;
    default:
      return '';
  }

  return '';
};
