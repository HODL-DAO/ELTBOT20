import { AddressService } from "../services";

export async function addressBadge(ctx, next) {

    console.dir(ctx.queryAddr);

    return next();
}

export default addressBadge;
