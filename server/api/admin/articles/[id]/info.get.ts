import { getArticle } from "../../../../../libs/db"

export default defineEventHandler(async (event) => {
    const params = event.context.params;
    if (!params?.id) return { success: false, message: "ID is missing" };
    const ArticleData = await getArticle(params.id)
    if (!ArticleData) {
        return {
            success: false,
            message: "Article Not Found"
        }
    }
    return ArticleData
});
