const fetchData = async (searchItem) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1f06565f',
            s: searchItem
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

const root = document.querySelector('.autoComplete');
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

const searchButton1 = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');



const onInput = async (event) => {

    const movies = await fetchData(event.target.value);

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
        resultsWrapper.append(option);
        console.log(resultsWrapper);
    }
};

searchButton1.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {

        dropdown.classList.remove('is-active');
        console.log(dropdown.classList);
    }
    // if (!dropdown.classList.value.includes('is-active') && searchButton1.value != '') {
    //     dropdown.classList.add('is-active');
    // };
});