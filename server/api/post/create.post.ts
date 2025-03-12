import { createClient } from "redis";
import { v7 } from 'uuid';

export default defineEventHandler(async (event) => {
  // get request body
  const data = await readBody(event);
  if(!data.title || !data.content) {
    setResponseStatus(event, 400);
    return { status: "error", message: "Title and content are required" };
  }
  //
  const posts_storage = await useStorage("posts");
  var last_post_id = await posts_storage.get("id") as number;
  if(!last_post_id) {
    posts_storage.set("id", 0); 
    last_post_id = 0;
  }
  //
  const key = v7();
  //
  posts_storage.setItem(last_post_id,{
    id: last_post_id,
    title: data.title,
    content: data.content,
    delete_key: key
  })
  return {
    status: "ok",
    id: last_post_id + 1,
    delete_key: key
  };
});
