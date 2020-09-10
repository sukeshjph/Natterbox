const axios = require("axios")
const qs = require("qs")

const data = {
  grant_type: "password",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
}

const url = "https://sapien.redmatter-qa01.pub/auth/token"

const options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(data),
  url,
}

axios(options)
  .then(function after(response) {
    // eslint-disable-next-line
    console.log(response.data)
  })
  .catch(err => console.log(err))
