import { loadHTML } from "./include.js";
import Movie from "./movies.js";

async function initHomePage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");
}



function personalize(){
    const status = document.getElementById("status");
    const note = document.getElementById("note");
    const presonalRating = document.getElementById("personalRating");
    const favorite = document.getElementById("favorite");
    const poster = document.getElementById("postor");




    const personalizing = localStorage.getItem("personalizing");
    if (!personalizing || personalizing.length === 0)
        console.log("Personalizing not found");

    const movie = personalize;

    let personalized = localStorage.getItem("personalized");
    if (!personalized || personalized.length === 0){
        localStorage.setItem("personalized", []);
    }

    personalized = localStorage.getItem("personalized");


    


}

initHomePage();
