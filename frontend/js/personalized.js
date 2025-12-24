import { loadHTML } from "./include.js";

async function initHomePage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");
}

initHomePage();
