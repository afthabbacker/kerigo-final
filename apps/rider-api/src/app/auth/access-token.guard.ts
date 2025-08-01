import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from '@nestjs/apollo';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    //const { req, connection } = ctx.getContext();
    return ctx.req ? ctx.req : { user: ctx };
  }

  canActivate(context: ExecutionContext) {
    if (context.getArgs()[2].id != null) {
      return true;
    }
    /*const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();*/
    //const req = this.getRequest(context);
    return super.canActivate(context);
  }

  // canActivate(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   const { req } = ctx.getContext();

  //   return super.canActivate(
  //     new ExecutionContextHost([req]),
  //   );
  // }

  handleRequest<AuthenticatedUser>(err: Error, user: AuthenticatedUser) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
