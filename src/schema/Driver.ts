import { z } from 'zod';
import Rol from '@src/model/Rol';

const RegisterSchema = z.object({
  body: z.object({
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

const UpdateSchema = z.object({
  body: z.object({
    credential: z.object({
      id: z.string(),
      rol: z.nativeEnum(Rol),
    }),
    firstname: z.string().min(1).trim(),
    lastname: z.string().min(1).trim(),
    phoneNumber: z.string(),
    age: z.number(),
    license: z.string(),
    vehicle: z.object({
      vin: z.string(),
      model: z.string(),
      year: z.string(),
    }),
  }),
});

const BlockSchema = z.object({
  body: z.object({
    credential: z.object({
      id: z.string(),
      rol: z.nativeEnum(Rol),
    }),
    isBlocked: z.boolean(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

const DriverSchema = {
  RegisterSchema,
  LoginSchema,
  UpdateSchema,
  BlockSchema,
};

type RegisterType = z.infer<typeof RegisterSchema>['body'];
type LoginType = z.infer<typeof LoginSchema>['body'];
type UpdateType = z.infer<typeof UpdateSchema>['body'];
type BlockBodyType = z.infer<typeof BlockSchema>['body'];
type BlockParamsType = z.infer<typeof BlockSchema>['params'];

export {
  RegisterType, LoginType, UpdateType, BlockBodyType, BlockParamsType,
};
export default DriverSchema;