import { z } from 'zod';
import Rol from '@src/model/Rol';

const RegisterSchema = z.object({
  body: z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
    name: z.string(),
    lastname: z.string(),
    birthday: z.string(),
    rol: z.string(),
    address: z.string(),
    key: z.string(),
  }),
})
// .refine((register) => register.body.password === register.body.passwordConfirmation, {
//   path: ['body', 'passwordConfirmation'],
//   message: 'Passwords do not match',
// });

const CheckSchema = z.object({
  body: z.object({
    email: z.string().min(1).email()
  }),
});


const LoginSchema = z.object({
  body: z.object({
    email: z.string().min(1).email(),
    password: z.string(),
  }),
});

const UpdateSchema = z.object({
  body: z.object({
  
    id: z.string(),
    rol: z.nativeEnum(Rol),

    name: z.string().min(1).trim(),
    lastname: z.string().min(1).trim(),
    idProfile : z.number(),
    //phoneNumber: z.string(),
    //age: z.number(),
    //address: z.object({
      //tate: z.string(),
      //city: z.string(),
      //street: z.object({
        //name: z.string(),
        //number: z.string(),
        //appartment: z.string(),
      }),
    })

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

const PassengerSchema = {
  CheckSchema,
  RegisterSchema,
  LoginSchema,
  UpdateSchema,
  BlockSchema,
};

type RegisterType = z.infer<typeof RegisterSchema>['body'];
type CheckType = z.infer<typeof CheckSchema>['body'];
type LoginType = z.infer<typeof LoginSchema>['body'];
type UpdateType = z.infer<typeof UpdateSchema>['body'];
type BlockBodyType = z.infer<typeof BlockSchema>['body'];
type BlockParamsType = z.infer<typeof BlockSchema>['params'];

export {
  RegisterType, CheckType, LoginType, UpdateType, BlockBodyType, BlockParamsType,
};
export default PassengerSchema;
