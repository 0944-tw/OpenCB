import { ipAddress } from "@vercel/edge";
import { createArticle } from "../../../libs/db"
export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const clientAddress = event.node.req.socket.remoteAddress
  var ip;
  if (process.env.VERCEL) {
    ip = ipAddress(event);
  } else {
    ip = clientAddress
  }
  
  if (!ip) {
    return {
      "success": false,
      "message": "Failed to get your IP Address",
      "message_i18n": "article.create.error.failed_ip"
    }
  }
  createArticle({
     content: data.content,
     ip: ip,
     status: "pending",
     imageUrl: data.imageUrl || null,
     rejectedReason: ""
  })
  return {
    "success": "true",
    "message": "Successfully to create article",
    "message_i18n": "article.create.success"
  }
});
