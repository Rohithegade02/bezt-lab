import * as yup from 'yup'
import { GenderEnum } from '../types/type'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const profileSchema = yup
  .object({
    username: yup.string().min(4).required(),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10)
      .max(10)
      .required(),
    gender: yup
      .mixed<GenderEnum>()
      .oneOf(Object.values(GenderEnum).map(e => e as GenderEnum))
      .required(),
    email: yup.string().email().required(),
    address: yup.string().min(10).required(),
    pincode: yup.string().min(6).max(6).required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
  })
  .required()
