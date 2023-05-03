import "./style.css";

const API_KEY = 'ELtXBB8q5PBuRTOIqBWwFJ50UTJqkOd6';
const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weather = 'http://dataservice.accuweather.com/currentconditions/v1/'

//http://dataservice.accuweather.com/currentconditions/v1/{locationKey}?apikey={API_KEY}
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const content = document.querySelector('#content');




form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const searchQuery = input.value.trim();
  
  if (!searchQuery) {
    content.innerHTML = '<p>Please enter a search query.</p>';
    return;
  }

  fetch(`${endpoint}?apikey=${API_KEY}&q=${encodeURIComponent(searchQuery)}`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      // Extract the location key from the first result in the array
      const locationKey = data[0].Key;
      // console.table(data);
      content.innerHTML = `<p>Search results for "${searchQuery}":</p>`;
      const list = document.createElement('ul');
      content.appendChild(list);
      data.forEach(result => {
        const item = document.createElement('li');
        item.textContent = `${result.LocalizedName}, ${result.AdministrativeArea.ID}, ${result.Country.ID}`;
        list.appendChild(item);
      });
      const weatherForecast = document.createElement('div');
weatherForecast.id = 'weatherForecast';
content.appendChild(weatherForecast);
      fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);

    data.forEach(result => {
      const item =document.createElement('p');
      item.textContent = `${result.LocalObservationDateTime}, ${result.Temperature.Imperial.Value}`;
      console.log(result.LocalObservationDateTime);
      weatherForecast.style.border = '1px solid black';
      weatherForecast.appendChild(item);
    })
  })
  .catch(error => console.error(error));
}else {
  resultsContainer.innerHTML = `<p>No results found for "${searchQuery}".</p>`;
}})
  .catch(error => console.error(error));


});
