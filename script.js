const apikey = '0a4374089b3b4382a164749f44b16c8b'
const blogContainer = document.getElementById("blog-container")
const serachField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('search-input').focus();
});

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles
    } catch (error) {
        console.error("Something Went Wrong!", error);
        return [];
    }
}
searchButton.addEventListener('click', async() => {
    const query = serachField.value.trim();
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Something Went Wrong!", error);
            return [];
        }
    }
});

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles
    } catch (error) {
        console.error("Something Went Wrong!", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://via.placeholder.com/600x400?text=No+Image+Available';;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ?  article.title.substring(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = article.title.length > 120 ?  article.description.substring(0, 120) + "..." : article.description;
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, '_blank');
        });
        blogContainer.appendChild(blogCard);
    });
}

(async ()=>{
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Something Went Wrong!", error);
        return [];
    }
})();