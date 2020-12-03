import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Profile, ProfileModel } from '../entities/Profile'

@Resolver()
export class AuthResolvers {
  @Query(() => Profile, { nullable: true })
  async profile(): Promise<Profile | null> {
    try {
      const profile = ProfileModel.findOne()
      return profile
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Profile, { nullable: true })
  async updateProfile(@Arg('firstname') firstname: string, @Arg('lastname') lastname: string, @Arg('nickname') nickname: string): Promise<Profile> {
    try {
      const profileData = { firstname, lastname, nickname }
      const profile = await ProfileModel.findOne()
      if (!profile) {
        const profile = await ProfileModel.create(profileData)
        return profile
      }
      await ProfileModel.updateOne({ id: profile.id }, { $set: profileData })
      return profile
    } catch (error) {
      throw error
    }
  }
}
