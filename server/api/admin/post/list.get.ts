import { createClient } from "redis";

export default defineEventHandler(async (event) => {
    const redis = await createClient({
        url: process.env.REDIS_URL ?? process.env.KV_URL,
      }).connect();
      const last_post_id = await redis.get("posts_id")
      const posts = []
      if (last_post_id){
        for (let i = parseInt(last_post_id); i > Math.max(0,parseInt(last_post_id) - 100); i--){
        const post = await redis.get(`posts:${i}`)
        if (post){
            posts.push(JSON.parse(post))
        }
        }
      }
      console.log(posts)
      return posts
});
