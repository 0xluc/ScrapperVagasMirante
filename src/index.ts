import { PostEntity } from "./models/post";
import { getHtml, parseJobListings } from "./scrapper/scrapper";
import { PostService } from "./services/post.service";
import { sendMessage } from "./telegram/handler";

async function main() {
    if (!process.env.CHAT_ID) {
        throw new Error("Please provide the CHAT_ID enviroment variable");
    }
    const postService = new PostService();
    const html = await getHtml(
        "https://www.mirante.net.br/vagas/?opportunity=&state=DF"
    );
    const jobs = parseJobListings(html);
    for (const job of jobs) {
        const newPost = new PostEntity({
            dataVaga: job.dataVaga,
            descVaga: job.descVaga,
            nomeVaga: job.nomeVaga,
            localVaga: job.localVaga,
            codigoVaga: job.codigoVaga,
        });
        const searchForPost = await postService.getPost(job.codigoVaga);
        if (!searchForPost) {
            console.log("Novo post: " + job.codigoVaga)
            await postService.createPost(newPost).then(async () => {
                await sendMessage(
                    process.env.CHAT_ID!,
                    `Vaga: ${job.nomeVaga}
Descrição: ${job.descVaga}
Local: ${job.localVaga}
Data: ${job.dataVaga}
Código: ${job.codigoVaga}`
                );
            });
        } else {
            console.log("Post " + job.codigoVaga + "já registrado")
        }
    }
}
function runEvery24Hours(callback: () => void) {
    callback();

    setInterval(callback, 24 * 60 * 60 * 1000);
}

// Example usage:
runEvery24Hours(async () => {
    console.log("This function runs every 24 hours.");
    // Add your code here
    await main();
});
