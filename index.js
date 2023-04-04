const fetchData = async (searchItem) => {                                       //fetching the data from server, using are using the search endpoint to serch movies
    const response = await axios.get('http://www.omdbapi.com/', {                                                                       
        params: {
            apikey: '1f06565f',
            s: searchItem
        }
    });
    if (response.data.Error) {                                                //THIS is a edge case we have handled when there is error or no data present then the api return a string and       
        return [];                                                            //we get error while iterating over the reponse below, we are returning empty array 
    }
    return response.data.Search;
};

const root = document.querySelector('.autoComplete');
const searchButton1 = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class= "input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;




const onInput = async (event) => {

    const movies = await fetchData(event.target.value);

    if(!movies.length)
    {
        dropdown.classList.remove('is-active');
        return;
    }
    resultsWrapper.innerHTML = '';

    dropdown.classList.add('is-active');

    for (let movie of movies) {

        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.classList.add('dropdown-item');

        option.innerHTML = `          
            <img src="${imgSrc}"/>
            ${movie.Title}
            `;
        
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            searchButton1.value = movie.Title;
        });
        resultsWrapper.append(option);
    }
};

searchButton1.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
    if (!dropdown.classList.value.includes('is-active') && searchButton1.value != '' && searchButton1.contains(event.target)) {
        dropdown.classList.add('is-active');
    };
});