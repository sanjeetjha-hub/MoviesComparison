const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve();
            }
        }, 30);

        const timeout = setTimeout(() => {
            reject();
        }, 2000);
    });
};

beforeEach(() => {
    document.querySelector('#target').innerHTML = '';
    autoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [{ Title: 'Avengers' },
            { Title: 'Not Avengers' },
            { Title: 'Some Other Avengers' }]
        },
        renderOption(movie) {
            return movie.Title;
        }
    });

})

it('Dropdown Starts Closed', () => {
    const dropdown = document.querySelector('.dropdown');
    expect(dropdown.className).not.to.include('is-active');
})

it('After Searching,dropdown opens up', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item')
    const dropdown = document.querySelector('.dropdown');
    expect(dropdown.className).to.include('is-active');
});

it('after Searching display some result', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item')

    const item = document.querySelectorAll('.dropdown-item');

    expect(item.length).to.equal(3);
});