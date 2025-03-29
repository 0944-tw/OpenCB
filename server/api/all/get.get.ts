import { getArticle } from "../../../libs/db"

export default defineEventHandler(async (event) => {
    
    const data = await getQuery(event);
    if (!data.id) {
        return {
            success: false,
            message: "ID Required"
        }
    }
    if (typeof (data.id) !== "string") {
        return {
            success: false,
            message: "Query must be string or number"
        }
    }
    const ArticleData = await getArticle(data.id)
    if (!ArticleData) {
        return {
            success: false,
            message: "Article Not Found"
        }
    }
    return {
        content: ArticleData.content,
        id: ArticleData.id,
        createdAt: ArticleData.createdAt
    }
});
