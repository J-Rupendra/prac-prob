function handleInput(event){
    if(event?.target?.value){
        debouncedFetchSuggestions(event.target.value)
    } else {
        populateSuggestions([]);
    }
}

async function fetchSuggestions(searchTerm){
    const resp = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=100`);
    const jsonData = await resp.json();
    const suggestions = jsonData.products;
    populateSuggestions(suggestions)
}

function populateSuggestions(suggestions){
    const suggestionsContainerEle = document.querySelector(".suggestions-container");
    const suggestionItemsFragment = document.createDocumentFragment();
    suggestions.forEach(element => {
        const suggestionItemEle = document.createElement("li");
        suggestionItemEle.classList.add("suggestion-item");
        suggestionItemEle.textContent = element?.title ?? "Error";
        suggestionItemsFragment.appendChild(suggestionItemEle)
    });
    suggestionsContainerEle.replaceChildren(suggestionItemsFragment);

}

function debounceFunction(func, delay) {
    let timerRef = null;
    return function(...args){
        clearTimeout(timerRef);
        timerRef = setTimeout(()=>{
            func(...args);
        },delay);
    }
}

const debouncedFetchSuggestions = debounceFunction(fetchSuggestions,500);