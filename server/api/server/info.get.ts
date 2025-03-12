export default defineEventHandler(async (event) => {
     // get platform info
    var data = {
     platform: "unknown",
     region: "unknown",
    }
    if (process.env.VERCEL) data.platform = "vercel";
    if (process.env.NETLIFY) data.platform = "netlify";
    return data
  });