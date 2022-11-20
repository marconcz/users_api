import { z } from 'zod';
import Rol from '@src/model/Rol';

const RegisterSchema = z.object({
  body: z.object({
    credential: z.object({
      id: z.string(),
      rol: z.nativeEnum(Rol),
    }),
    email: z.string().min(1).email(),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  }),
}).refine((register) => register.body.password === register.body.passwordConfirmation, {
  path: ['body', 'passwordConfirmation'],
  message: 'Passwords do not match',
});

const LoginSchema = z.object({
  body: z.object({
    email: z.string().min(1).email(),
    password: z.string(),
  }),
});

const AdminSchema = {
  RegisterSchema,
  LoginSchema,
};

type RegisterType = z.infer<typeof RegisterSchema>['body'];
type LoginType = z.infer<typeof LoginSchema>['body'];

export { RegisterType, LoginType };
export default AdminSchema;
