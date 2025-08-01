import { ObjectType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OrderDTO } from './order.dto';

@ObjectType()
export class CurrentOrder {
  @Field(() => OrderDTO, { nullable: false })
  order!: OrderDTO;
  @Field(() => Point, { nullable: true })
  driverLocation?: Point;
}
