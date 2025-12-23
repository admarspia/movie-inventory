import { loadHTML } from "./include.js";

async function initHomePage() {
    await loadHTML("header-pesonalized", "partials/header.html");
    await loadHTML("footer-pesonalized", "partials/footer.html");
}

initHomePage();
