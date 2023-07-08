const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.querySelector('.search');
const list = document.querySelector('.suggestions');

// console.log(input.outerHTML);
// console.log(list.outerHTML);

const data = [];

async function getData() {
    let fetched = await fetch(endpoint);
    fetched = await fetched.json();
    data.push(...fetched);
}

function getMatched(word, data) {
    return data.filter((elem) => {
        const reg = new RegExp(word, 'gi');
        return elem.city.match(reg) || elem.state.match(reg);
    });
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function display() {
    const matchArray = getMatched(this.value, data);
    console.log(matchArray);
    let html = ``;
    matchArray.forEach(element => {
        const reg = new RegExp(this.value, 'gi');
        let cityName = element.city.replace(reg, `<span class = 'hl'>${this.value}</span>`)
        let stateName = element.state.replace(reg, `<span class = 'hl'>${this.value}</span>`)
        let population = numberWithCommas(element.population);
        html += `
        <li>
        <span>${cityName}, ${stateName}</span>
        <span>${population}</span>
        </li>
        `
    });
    list.innerHTML = html;
}

getData();

input.addEventListener('change', display);
input.addEventListener('keyup', display);




// ###############################################
// another code

// const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// const cities = [];
// fetch(endpoint)
//   .then(blob => blob.json())
//   .then(data => cities.push(...data));

// function findMatches(wordToMatch, cities) {
//   return cities.filter(place => {
//     // here we need to figure out if the city or state matches what was searched
//     const regex = new RegExp(wordToMatch, 'gi');
//     return place.city.match(regex) || place.state.match(regex)
//   });
// }

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

// function displayMatches() {
//   const matchArray = findMatches(this.value, cities);
//   const html = matchArray.map(place => {
//     const regex = new RegExp(this.value, 'gi');
//     const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
//     const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
//     return `
//       <li>
//         <span class="name">${cityName}, ${stateName}</span>
//         <span class="population">${numberWithCommas(place.population)}</span>
//       </li>
//     `;
//   }).join('');
//   suggestions.innerHTML = html;
// }

// const searchInput = document.querySelector('.search');
// const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);