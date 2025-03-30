import { listsArticles } from "../../../../libs/db"
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
     
        const articles = await listsArticles(query.type as string || undefined)
        return articles
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: err
        }
    }

 });
