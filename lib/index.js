// const baseUrl = 'https://whereto-staging.herokuapp.com'
const baseUrl = 'http://www.localhost:3000'

const getCityData = () => {
  fetch(`${baseUrl}/api/v1/cities`)
    .then(response => response.json())
    .then(cities => appendCities(cities))
    .catch(error => console.log({ error }))
}

const appendCities = (cities) => {
  $('tbody').empty()
  cities.forEach(city => {
    appendCity(city)
  })
}

const appendCity = (city) => {
  $('tbody').append(`
    <tr>
      <td>${city.rank}</td>
      <td class="city-name" id=${city.name}>${city.name}</td>
      <td>${city.state}</td>
      <td>${city.growth}%</td>
      <td>${city.population.toLocaleString()}</td>
      <td><i class="fas fa-check ${city.name}-favorite" id="favorite-table-icon"></td>
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

const addCityToFavorites = () => {
  const selectedData = event.target.parentElement.parentElement.querySelectorAll('td')
  const city = selectedData[1].innerText
  const state = selectedData[2].innerText
  var newFavorite = `<div class="recently-favorited-city">
                       <p>${city}</p>
                       <h5>${state}</h5>
                       </div>`
  $(newFavorite).hide(50).prependTo('.recently-favorited-cities').fadeIn(750)
}

const addCityToRejections = () => {
  console.log('Added city to rejections')
}

const filterCitiesByState = () => {
  const selectedState = event.target.value
  fetch(`${baseUrl}/api/v1/cities?state=${selectedState}`)
    .then(response => response.json())
    .then(cities => appendCities(cities))
    .catch(error => console.log({ error }))
}

const clearFilters = () => {
  $('.search-field').val('')
  getCityData()
}

$(document).on('click', '#favorite-table-icon', addCityToFavorites)
$(document).on('click', '#reject-table-icon', addCityToRejections)
$('#state-dropdown').on('change', filterCitiesByState)
$('#clear-button').on('click', clearFilters)

getCityData()
$(document).ready(filterCities)
