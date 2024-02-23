import toast from 'react-hot-toast';

const catchErrors = (error: any) => {
  console.error(error);
  const throwErr = (throwErrText: string = 'Ошибка.') => {
    toast.error(throwErrText, {
      duration: 3000,
      position: 'top-center',
      style: { fontSize: '18px', fontFamily: 'Onest, sans-serif' },
    });
  };

  if (typeof error === 'string') {
    throwErr(error);
  } else if (error instanceof Error) {
    throwErr(`Ошибка: ${error.message}`);
  } else if (typeof error === 'object') {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in error) {
      const keyToUpperCase = key.charAt(0).toUpperCase() + key.slice(1);
      if (typeof error[key] === 'string') {
        throwErr(`${keyToUpperCase}: ${error[key]}`);
      }
      if (Array.isArray(error[key])) {
        throwErr(`${keyToUpperCase}: ${error[key][0]}`);
      }
    }
  } else {
    throwErr();
  }
};

export default catchErrors;
