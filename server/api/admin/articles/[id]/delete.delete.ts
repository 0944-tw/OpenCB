import { removeArticle } from "../../../../../libs/db"
export default defineEventHandler(async (event) => {
    const { id } = event.context.params as { id: string };
    if (!id) return {}
    await removeArticle(id)
    return {
        success: true,
        message: "Article deleted successfully",
    }
})