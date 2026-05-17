export const authMiddleware = async (c, next) => {
    const cookie = c.req.header("Cookie");
    const match = cookie?.match(/userId=(\d+)/);

    const userId = match ? Number(match[1]) : null;

    c.set("userId", userId);

    await next();
};