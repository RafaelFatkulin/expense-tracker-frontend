import { object, string } from 'yup';

export const updateWalletSchema = object().shape({
  name: string()
    .min(4, 'Минимальная длина названия кошелька - 4 символа')
    .max(48, 'МАксимальная длина названия кошелька - 48 символов')
    .required('Название обязательно для названия'),
});
