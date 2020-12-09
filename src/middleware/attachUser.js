import { UserService } from "../services";

export async function attachUser(ctx, next) {

  if (ctx.from) {
    const user = await UserService(ctx);
    // console.log('???????????????', user)

    ctx.user = user;
  }
  return next();
}
