import { object, string } from 'yup';

export const updateUserDataSchema = object()
  .shape({
    username: string()
      .min(8, 'Минимальная длина никнейма - 8 символов')
      .max(255, 'Максимальная длина никнейма - 255 символов')
      .required('Никнейм обязателен для заполнения'),
    firstName: string()
      .max(20, 'Максимальная длина имени - 20 символов')
      .required('Имя обязательно для заполнения'),
    lastName: string()
      .max(20, 'Максимальная длина фамилии - 20 символов')
      .required('Фамилия обязательна для заполнения'),
    middleName: string().max(20, 'Максимальная длина отчества - 20 символов'),
  })
  .required();
