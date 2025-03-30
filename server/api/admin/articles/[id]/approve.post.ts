import { updateArticleStatus } from "../../../../../libs/db";

export default defineEventHandler(async (event) => {
    const params = event.context.params;
    const body = await readBody(event);
    if (!params?.id) return { success: false, message: "ID or status is missing" };
    console.log("Approving Post for " + params.id)
    const data = await updateArticleStatus(params.id as string, "approved");
    return {
        success: true
    }
});