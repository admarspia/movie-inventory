export default function ensureLogin() {
    const loggedInUser = JSON.parse(localStorage.getItem("movie_current_user"));
    let res = false; 
    if (!loggedInUser ||  loggedInUser.length === 0) {
        res = confirm("Signin to continue");
        if (res)
            window.location.href = "authentication.html";
        else 
            window.location.href = "index.html";
    }
    return res;
}
