export interface User {
  id?: number
  username: string
  phone: string
  profiles?: Profile[]
}
export enum GenderEnum {
  female = 'FEMALE',
  male = 'MALE',
  other = 'OTHER',
}

export interface Profile {
  id?: number
  username: string
  phone: string
  email: string
  gender: GenderEnum
  address: string
  pincode: string
  city: string
  state: string
  country: string
}
