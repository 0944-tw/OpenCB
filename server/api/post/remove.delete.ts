import { createClient } from "redis";

export default defineEventHandler(async (event) => {
  // get query id
  const query = getQuery(event);
  const redis = await createClient({
    url: process.env.REDIS_URL ?? process.env.KV_URL,
  }).connect();
  // get post by id
  const post = await redis.get("posts:" + query.id);
  if (!post) {
    setResponseStatus(event, 404);
    return { status: "error", message: "Post not found" };
  }
  if (query.key != JSON.parse(post).delete_key){
    setResponseStatus(event, 403);
    return { status: "error", message: "Key mismatch" };
  }
  // delete
  await redis.del("posts:" + query.id);
    return {
        status: "ok",
        message: "Post deleted"
    };
});
