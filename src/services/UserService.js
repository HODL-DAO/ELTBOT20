import User from "../models/user";

// Get or create User
const incrementUserUsage = async (ctx) => {
  try {
    const sender = ctx.from;
    let user = await User.findOne({ chatId: ctx.chat.id });
    if (!user) {
      const userModel = new User({
        firstName: sender.first_name,
        lastName: sender.last_name,
        username: sender.username,
        isBot: sender.is_bot,
        chatId: ctx.chat.id,
      });
      user = await new User(userModel).save();
    } else {
      await user.updateOne({ $inc: { usage: 1 } });
    }
    return user;
  } catch (error) {
    console.log('WRONG! ERR: ', error)
  }
}

export default incrementUserUsage;