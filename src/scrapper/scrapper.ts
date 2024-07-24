import { PostEntity } from "@/models/post";
import { JSDOM } from "jsdom";
export async function getHtml(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch the page: ${response.statusText}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error("Error fetching the HTML:", error);
        throw error;
    }
}

export function parseJobListings(html: string) {
    // Parse the HTML string using jsdom
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Get the parent element of the job listings
    const vagasContainer = doc.querySelector("#vagas-api .ultimas-vagas");
    if (!vagasContainer) {
        return [];
    }

    // Get all job listings
    const jobListings: PostEntity[] = [];

    // Get each job listing element
    const vagaItems = vagasContainer.querySelectorAll(".vaga-item");

    vagaItems.forEach((vagaItem) => {
        // Extract codigo-vaga and local-vaga
        const localVaga =
            vagaItem.querySelector(".local-vaga")?.textContent?.trim() || "";
        const codigoVaga =
            vagaItem
                .querySelector(".codigo-vaga")
                ?.textContent?.trim()
                .split(" ")[1] || "";

        // Extract nome-vaga and desc-vaga from content-item
        const nomeVaga =
            vagaItem.querySelector(".nome-vaga")?.textContent?.trim() || "";
        const descVaga =
            vagaItem.querySelector(".desc-vaga")?.textContent?.trim() || "";

        // Extract data-vaga from bottom-item
        const dataVaga =
            vagaItem.querySelector(".data-vaga")?.textContent?.trim() || "";

        // Add the extracted data to the jobListings array
        jobListings.push({
            codigoVaga,
            localVaga,
            dataVaga,
            nomeVaga,
            descVaga,
        });
    });

    return jobListings;
}
