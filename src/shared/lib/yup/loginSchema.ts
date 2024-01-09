import { object, boolean, string } from 'yup';

export const loginSchema = object()
  .shape({
    email: string()
      .email('Почта имеет некорректный формат')
      .required('Почта обязательна для заполнения'),
    password: string()
      .min(8, 'Минимальная длина пароля - 8 символов')
      .max(72, 'Максимальная длина пароля - 72 символа')
      .required('Пароль обязателен для заполнения'),
    remember: boolean().required(),
  })
  .required();
