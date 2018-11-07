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
  cities.forEach((city, index) => {
    appendCity(city, index)
  })
}

const appendCity = (city, index) => {
  $('tbody').append(`
    <tr>
      <td>${index + 1}</td>
      <td class="city-name" id=${city.name}>${city.name}</td>
      <td>${city.state}</td>
      <td>${city.growth}%</td>
      <td>${city.population.toLocaleString()}</td>
      <td id=${city.id}><i class="fas fa-check ${city.name}-favorite" id="favorite-table-icon"></td>
      <td id=${city.id}><i class="fas fa-times" id="reject-table-icon"></td>
    </tr>
    `)
}

const getFavorites = () => {
  fetch(`${baseUrl}/api/v1/favorites`)
    .then(response => response.json())
    .then(favorites => appendFavorites(favorites))
    .catch(error => console.log({ error }))
}

const appendFavorites = (favorites) => {
  favorites.forEach((favorite) => {
    appendFavorite(favorite)
  })
}

const appendFavorite = (favorite) => {
  $('.recently-favorited-cities').append(`
    <div class="recently-favorited-city">
      <p>${favorite.name}</p>
      <h5>${favorite.state}</h5>
    </div>
    `)
}

const getRejections = () => {
  fetch(`${baseUrl}/api/v1/rejections`)
    .then(response => response.json())
    .then(rejections => appendRejections(rejections))
    .catch(error => console.log({ error }))
}

const appendRejections = (rejections) => {
  rejections.forEach((rejection) => {
    appendRejection(rejection)
  })
}

const appendRejection = (rejection) => {
  $('.recently-rejected-cities').append(`
    <div class="recently-rejected-city">
      <p>${rejection.name}</p>
      <h5>${rejection.state}</h5>
    </div>
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
  const cityId = event.target.parentElement.id
  var newFavorite = `<div class="recently-favorited-city">
                       <p>${city}</p>
                       <h5>${state}</h5>
                     </div>`
  $(newFavorite).hide(50).prependTo('.recently-favorited-cities').fadeIn(750)
  $('.recently-favorited-cities').animate({ scrollTop: 0 }, 'fast')
  event.target.parentElement.parentElement.style.color = 'rgb(27, 176, 74)'
  postCityToFavorites(cityId)
}

const postCityToFavorites = (cityId) => {
  fetch(`${baseUrl}/api/v1/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({city_id: cityId})
  })
}

const addCityToRejections = () => {
  const selectedData = event.target.parentElement.parentElement.querySelectorAll('td')
  const city = selectedData[1].innerText
  const state = selectedData[2].innerText
  var newRejection = `<div class='recently-favorited-city'>
                        <p>${city}</p>
                        <h5>${state}</h5>
                      </div>`
  $(newRejection).hide(50).prependTo('.recently-rejected-cities').fadeIn(750)
  $('.recently-rejected-cities').animate({ scrollTop: 0 }, 'fast')
  event.target.parentElement.parentElement.style.color = 'red'
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
  $('#state-dropdown').val('')
  getCityData()
}

const sortCities = (attribute) => {
  fetch(`${baseUrl}/api/v1/cities?sort=${attribute}`)
    .then(response => response.json())
    .then(cities => appendCities(cities))
    .catch(error => console.log({ error }))
}

$(document).on('click', '#favorite-table-icon', addCityToFavorites)
$(document).on('click', '#reject-table-icon', addCityToRejections)

$('#state-dropdown').on('change', filterCitiesByState)
$('#clear-button').on('click', clearFilters)

$('#city-header').on('click', function() {
  sortCities('alphabetical')
})
$('#state-header').on('click', function() {
  sortCities('state')
})
$('#population-header').on('click', function() {
  sortCities('population')
})
$('#growth-header').on('click', function() {
  sortCities('growth')
})

getCityData()
getFavorites()
getRejections()

$(document).ready(filterCities)
