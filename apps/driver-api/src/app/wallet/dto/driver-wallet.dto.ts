import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { UserContext } from '../../auth/authenticated-user';

@ObjectType('DriverWallet')
@Authorize({
  authorize: (context: UserContext) => ({
    driverId: { eq: context.req.user.id },
  }),
})
export class DriverWalletDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => Float, { nullable: false })
  balance!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @FilterableField(() => ID, { filterOnly: true })
  @Field(() => ID)
  driverId!: number;
}
