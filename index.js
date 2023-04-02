const fetchData = async (searchItem)=> {
     const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey : '1f06565f',
            s : searchItem
        }
     });
     console.log(response.data);
};

const searchButton1 = document.querySelector('input');

const debounce = (func,delay = 1000) => {
    let timerOutId;
    return (...args) => {
        if(timerOutId){
            clearTimeout(timerOutId);
        }
        timerOutId = setTimeout(() => {
            func.apply(null,args);
        }, delay);
    }
}

let timerOutId;

const onInput = (event) => {   
    fetchData(event.target.value);
};

searchButton1.addEventListener('input', debounce(onInput,500));