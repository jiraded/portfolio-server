import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string

  @Field()
  @prop({ required: true, trim: true })
  firstname: string

  @Field()
  @prop({ required: true, trim: true })
  lastname: string

  @Field()
  @prop({ required: true, trim: true })
  nickname: string

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const ProfileModel = getModelForClass(Profile, { schemaOptions: { timestamps: true } })
