/* eslint-disable import/no-extraneous-dependencies */
const axios = require("axios")
const qs = require("qs")
const colors = require("colors")

const inputData = {
  grant_type: "password",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
}

const sapienUrl = "https://sapien.redmatter-qa01.pub/auth/token"
const gatekeeperUrl =
  "https://gatekeeper.redmatter-qa01.pub/token/sapien/organisation/431711/user/2037722?scope=portal:admin"

const lassoTokenUrl = "http://lasso.qa01.redmatter.com/auth/token/coreapi"

const sapienConfig = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(inputData),
  url: sapienUrl,
}

axios(sapienConfig)
  .then(function after(response) {
    // eslint-disable-next-line
    // console.log(response.data)

    return axios({
      method: "GET",
      url: gatekeeperUrl,
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    })
  })
  .then(gateResponse => {
    // console.log(gateResponse.data.jwt)
    return axios({
      method: "GET",
      url: lassoTokenUrl,
      headers: {
        Authorization: `Bearer ${gateResponse.data.jwt}`,
      },
    })
  })
  .then(lassoResponse => {
    console.log(`LassoToken:${lassoResponse.data.access_token}`.magenta)
  })
  .catch(err => console.log(err))
