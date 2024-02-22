

document.addEventListener('DOMContentLoaded', () => {
    createHeading(); // This will add the heading first.
    createSearchInput(); // Now, this will add the search input below the heading.
    fetchAndDisplayBreweries(); // Corrected to fetch and then display breweries.
});

function createHeading() {
    const heading = document.createElement('h1');
    heading.textContent = 'Open Brewery API';
    document.body.prepend(heading);
}

function createSearchInput() {
    const searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('placeholder', 'Search breweries...');
    searchInput.onkeyup = () => filterBreweries();

    // Insert the search box after the heading.
    const heading = document.querySelector('h1'); // Assuming there's only one <h1> element.
    insertAfter(searchInput, heading);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

async function fetchAndDisplayBreweries() {
    const url = 'https://api.openbrewerydb.org/breweries';
    try {
        const response = await fetch(url);
        const breweries = await response.json();
        displayBreweries(breweries);
    } catch (error) {
        console.error('Failed to fetch breweries:', error);
    }
}

function displayBreweries(breweries) {
    const container = document.getElementById('breweriesContainer') || document.createElement('div');
    container.innerHTML = ''; // Clear previous content
    container.setAttribute('id', 'breweriesContainer');
    
    breweries.forEach(brewery => {
        const { name, brewery_type, street, city, state, postal_code, website_url, phone } = brewery;
        const breweryEl = document.createElement('div');
        breweryEl.innerHTML = `
            <h2>${name} (${brewery_type})</h2>
            <p>Address: ${street}, ${city}, ${state} ${postal_code}</p>
            <p>Website: <a href="${website_url}" target="_blank">${website_url}</a></p>
            <p>Phone: ${phone}</p>
        `;
        container.appendChild(breweryEl);
    });

    if (!document.getElementById('breweriesContainer')) {
        document.body.appendChild(container);
    }
}

async function filterBreweries() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredUrl = `https://api.openbrewerydb.org/breweries?by_name=${searchText}`;
    try {
        const response = await fetch(filteredUrl);
        const filteredBreweries = await response.json();
        displayBreweries(filteredBreweries);
    } catch (error) {
        console.error('Error filtering breweries:', error);
    }
}
