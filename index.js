const fetchData = async (searchItem)=> {
     const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey : '1f06565f',
            s : searchItem
        }
     });
     return response.data.Search;
};

const searchButton1 = document.querySelector('input');

const onInput = async (event) => {   
    const movies = await fetchData(event.target.value);
    console.log(movies);
};

searchButton1.addEventListener('input', debounce(onInput,500));