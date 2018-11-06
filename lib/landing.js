// const baseUrl = 'https://whereto-staging.herokuapp.com'
const baseUrl = 'http://www.localhost:3000'

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
  window.location.href = 'index.html';
}

$('#login-button').click(login)
