const AccessKey = "jsJrXIDMvxHv1c5b78q90XbTi2W9dKcJ67o-CLocpd4"
const FormEl = document.querySelector("form")
const InputEl = document.getElementById("search-input")
const SearchResult = document.querySelector(".search-results")
const ShowMore = document.getElementById("show-more-button")
let inputData = " "
let page = 1;

async function searchImages(){
    inputData = InputEl.value;
    const url = `https://api.unplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    if(page === 1)
    {
        SearchResult.innerHTML = " "
    }

    results.map((result) =>
    {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        imageWrapper.appendChild(imageWrapper);


    });

    page++

    if(page > 1){
        ShowMore.style.display = "block";
    }
}


FormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

ShowMore.addEventListener("click", () => {
    
    searchImages();
});