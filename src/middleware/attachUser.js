import { UserService } from "../services";

export async function attachUser(ctx, next) {

  if (ctx.from) {
    const user = await UserService(ctx);
    ctx.user = user;
  }
  return next();
}

export default attachUser;
