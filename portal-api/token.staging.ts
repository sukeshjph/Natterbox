const axios = require("axios")
const qs = require("qs")

const data = {
  grant_type: "password",
  client_id: "6_m54bi2qe2lcgwwc4kkkoc0os48kcks0sc4goo48484cwkcsso",
  client_secret: "1ht5lrl9x56sc08okc84k8c8ko8goscgk04os80gw0sss084kg",
  username: "jack.prior1@admin.com",
  password: "HgjXXSd7uQ1yaO!",
}

const url = "https://sapien.stage.redmatter.com/auth/token"

const options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(data),
  url,
}

axios(options).then(function after(response) {
  // eslint-disable-next-line
  console.log(response.data)
})
