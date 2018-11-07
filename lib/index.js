const baseUrl = 'https://where-to-1.herokuapp.com'

const login = () => {
  const email = $('#login-email').val()
  const password = $('#login-password').val()
  fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        email: email,
        password: password
      }
    })
  })
  window.location.href = 'cities.html';
}

$('#login-button').click(login)
