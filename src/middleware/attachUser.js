import { UserService } from "../services";

export async function attachUser(ctx, next) {
  console.log('???????????????', UserService)
  if (ctx.from) {
    const user = await UserService(ctx);

    ctx.user = user;
  }
  return next();
}
