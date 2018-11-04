const getCityData = () => {
  fetch('https://whereto-staging.herokuapp.com/api/v1/cities')
    .then(response => response.json())
    .then(cities => appendCities(cities))
    .catch(error => console.log({ error }))
}

const appendCities = (cities) => {
  cities.forEach(city => {
    appendCity(city)
  })
}

const appendCity = (city) => {
  $('tbody').append(`
    <tr>
      <td>${city.rank}</td>
      <td class="city-name">${city.name}</td>
      <td>${city.state}</td>
      <td>${city.growth}%</td>
      <td>${city.population.toLocaleString()}</td>
      <td><i class="fas fa-check" id="favorite-table-icon"></td>
      <td><i class="fas fa-times" id="reject-table-icon"></td>
    </tr>
    `)
}

const filterCities = () => {
  $('.search-field').on('keyup', function () {
    var value = $(this).val().toLowerCase()
    $('#city-table tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
}

getCityData()
$(document).ready(filterCities)
