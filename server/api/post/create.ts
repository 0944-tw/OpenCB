export default defineEventHandler(async (event) => {
  // get request body
  const data = await readBody(event);
  await fetch("https://discord.com/api/webhooks/1348640210618941440/gkaNtY5brW3TxNCWtDFNZntLLg8N1TOfxMnlCA4nqV4lBOaH3kDihOcuIteec4YCsdGh",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
         embeds: [
            {
                title: "新的文章出現了！",
                description: `文章標題：${data.title} \n  \`\`\`${data.content}\`\`\``,
            }
         ]
    })
  })
});