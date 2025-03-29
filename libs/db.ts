// Credit: owenliu0924
// /libs/db.ts Inspired from owenliu0924/vercel-cms
// 其實有點完全借鑒了。不過還是要感謝owen0924 the pro

import { PrismaClient } from "@prisma/client";
import { Article } from "@/types";
import path from "path";

declare global {
    var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    if (!global.prisma) {
        global.prisma = prisma;
    }
}
export async function getArticle(id: string): Promise<Article | void> {

    const article = await prisma.article.findUnique({
        where: {
            "id": id
        }
    })
    if (!article) return;
    return article
}

export async function updateArticleStatus(id: string, status: string) {
    const article = await prisma.article.update({
        where: {
            "id": id
        },
        data: {
            "status": status
        }
    })
}

export async function listsArticles(type?: string): Promise<Article[]> {
    let articles;
    if (type) {
        articles = await prisma.article.findMany({
            where: {
                "status": type
            }
        })
    } else {
        articles = await prisma.article.findMany({})
    }
    return articles.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
    }));

}

export async function createArticle(Article: Omit<Article, "id" | "createdAt">): Promise<string> {
    const newArticle = await prisma.article.create({
        data: Article,

    })
    return newArticle.id
}
export async function submitArticle(content: string, imageUrl: string, ip: string): Promise<string> {
    const article = await prisma.article.create({
        data: {
            content,
            imageUrl: imageUrl || null,
            status: "pending",
            ip: ip
        },
    });
    return article.id;
}

export async function removeArticle(id: string) {
    await prisma.article.delete({
        where: {
            id: id
        }
    })
}