// Credit: owenliu0924
// /libs/db.ts Inspired from owenliu0924/vercel-cms
// 其實有點完全借鑒了。不過還是要感謝owen0924 the pro

import { PrismaClient } from "@prisma/client";
import { Article, Status } from "@/types";
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
export async function getArticle(id: string): Promise<Article> {
   const article = await prisma.articles.findUnique({
    where: {
        "id": id
    }
   })
   return article
}

export async function updateArticleStatus(id: string,status: Status) {
  const article = await prisma.articles.update({
    where: {
        "id": id
    },
    data: {
        "status": status
    }
  })
}

export async function listsArticle(type?: Status): Promise<[Article]> {
    let articles;
    if (type) {
        articles = await prisma.articles.findMany({
            where: {
                "status": type
            }
        })
    } else {
        articles = await prisma.articles.findMany({})
    }
    return articles.map((article: Article) => ({
        ...article,
        createdAt: article.createdAt.toISOString(),
    }));

}

export async function createArticle(Article: Omit<Article, "id" | "createdAt">): Promise<Article> {
    const newArticle = await prisma.articles.create({
        data: Article
    })
    return {
        ...newArticle,
        createdDate: newArticle.createdAt.toISOString()
    }
}

