const autoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

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
    const searchButton1 = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    let summary;

    if (root.id === 'left-autocomplete') {
        summary = document.querySelector('#left-summary');
    } else {
        summary = document.querySelector('#right-summary')
    }


    const onInput = async (event) => {

        const items = await fetchData(event.target.value);

        if (!items.length) {
            dropdown.classList.remove('is-active');
            summary.innerHTML = '';
            console.log(summary);
            return;
        }
        resultsWrapper.innerHTML = '';

        dropdown.classList.add('is-active');

        for (let item of items) {

            const option = document.createElement('a');                                 // creating anchor tag to display items in the dropdown list

            option.classList.add('dropdown-item');

            option.innerHTML = renderOption(item);                                                                      //display images and title in the dropdown list

            option.addEventListener('click', () => {                                  //When Clicked on a item from dropdownList
                dropdown.classList.remove('is-active');
                searchButton1.value = inputValue(item);
                onOptionSelect(item)
            });
            resultsWrapper.append(option);
        }
    };

    searchButton1.addEventListener('input', debounce(onInput, 500));                  //Debounce funtion to limit the request sent to server while searching the item

    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
        if (!dropdown.classList.value.includes('is-active') && searchButton1.value != '' && searchButton1.contains(event.target)) {
            dropdown.classList.add('is-active');
        };
    });

    searchButton1.addEventListener('input', debounce(onInput, 500));                  //Debounce funtion to limit the request sent to server while searching the item

    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
        if (!dropdown.classList.value.includes('is-active') && searchButton1.value != '' && searchButton1.contains(event.target)) {
            dropdown.classList.add('is-active');
        };
    });
};