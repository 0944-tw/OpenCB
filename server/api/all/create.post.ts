import { ipAddress } from "@vercel/edge";
import { createArticle, submitArticle } from "../../../libs/db"
export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log(data)
  const clientAddress = event.node.req.connection.remoteAddress || event.node.req.socket.remoteAddress || "127.0.0.1"
  var ip;
  if (process.env.VERCEL) {
    ip = ipAddress(event);
  } else {
    ip = clientAddress
  }
  console.log(ip)
  if (!ip) {
    return {
      "success": false,
      "message": "Failed to get your IP Address",
      "message_i18n": "article.create.error.failed_ip"
    }
  }
  try {
    await submitArticle(data.content,data.imageUrl,ip)
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: "Something went wrong",
      message_i18n: "article.create.error.unknown "
    }
  }
  return {
    "success": "true",
    "message": "Successfully to create article",
    "message_i18n": "article.create.success"
  }
});
