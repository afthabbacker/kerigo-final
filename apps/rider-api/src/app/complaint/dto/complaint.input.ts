import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
@BeforeCreateOne((input: CreateOneInputType<ComplaintInput>) => {
  input.input.requestedByDriver = false;
  return input;
})
export class ComplaintInput {
  @Field(() => ID)
  requestId!: number;
  @Field(() => String, { nullable: false })
  subject!: string;
  @Field(() => String, { nullable: true })
  content?: string;
  @Field(() => Boolean, { nullable: true })
  requestedByDriver?: boolean;
}
