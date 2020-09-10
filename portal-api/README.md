## Prerequisites

##### Enter Command `yarn global add serverless`

##### Enter Command `yarn install`

---

## Run Locally:

##### Enter Command: `yarn run stubs`

##### Navigate to `http://localhost:4000/playground`

---

## Run Against QA:

##### Enter Command; `yarn run qa`

##### Navigate to `http://localhost:4000/playground`

---

### Important!

##### Enter Authentication Bearer Token in HTTP HEADERS section (bottom left of graphql playground UI) before you run your query or you may have auth issues

##### Example Format:

```
{
  "Authorization": "[Enter your token]"
}
```

---

### Example Query

```
{
   callLogs {
      date
      from
      dialled
      connectedTo
      connectedToNumber
      timeRinging
      timeTalking
      direction
      type
      flags
      policy
      recording
    }
}
```

---

### Discover More

##### Use the docs tab on the right to discover the full api query options (the schema will give you a more detailed programmatic breaktown)

---

### Curl Request

##### If you need a quick simplified curl request you can use as an alternative, here is an example, where JWT is the authentication bearer token

```
curl -X POST 'http://localhost:4000/graphql' -H"Authorization: ${JWT}" -d'{"operationName": null, "variables": {}, "query": "{ callLogs { date from dialled connectedTo connectedToNumber timeRinging timeTalking direction type flags policy recording } }"}'
```

---

### The currently supported environment variables are shown below:

##### There are 2 preconfigured files in the root directory: `.env.qa` & `.env.stubs`. When running `yarn run stubs` or `yarn run qa` it will point to the appropriate .env file.

```
STUBS = BOOLEAN - Puts the api in offline stubs mode
PLAYGROUND = BOOLEAN - Allows the playground to be displayed
NODE_ENV = development | production - Allows the whole application mode to change, has a number of framework level effects
LOG_LEVEL = debug | warn | info | error - Changes the detail level of logging
LOG_FORMAT = text | json - Changes logging format
SAPIEN_URL = URL - Changes the sapient api endpoint
CORE_API_URL = URL - CHanges the Core api endpoint
CORS_ALLOWED_ORIGIN = 'http://localhost:4000/graphql, http://localhost:3000' - Whitelist connections from these sites
TRACING = BOOLEAN - Displays Response time / metrics for performance analysis
INTROSPECTION = BOOLEAN - Allows querying of the api schema (required for playground to work)
DEBUG = BOOLEAN - Shows stacktrace in response
AUTHORIZER = JSON - mocks the authorizer locally, full example in .env.qa
```

---

### Deploying the lambda using serverless commands

##### For now at least we won’t use serverless to actually deploy this Lambda, we will use `serverless package` to create a .zip and then upload it using Terraform.

##### You can run `serverless deploy` and look at what it had deployed to determine the Terraform resources required.

---

### Core API VPN Setup(MAC)

##### If you are unsable to reach Core API dns then please make sure you have following host headers added to /etc/host file

##### In mac terminal

```
sudo nano /private/etc/hosts

172.30.98.99 bitbucket.redmatter.com bitbucket
172.30.98.5 jira.redmatter.com jira
172.30.98.34 lonjmp01.redmatter.com lonjmp01
172.21.17.5  portal.coreapi.qa01.redmatter.com --> Core API
172.21.17.4 lasso.qa01.redmatter.com   --> To retrieve token

ctl+x and Save your settings

```

##### VPN IP Ranges:

##### Open file /usr/local/etc/ipsec.conf in VsCode or any editor of choice

##### Make sure above IP are available in rightsubnet

```
rightsubnet=172.30.98.5/32,172.30.98.33/32,172.30.98.99/32,172.21.17.4/32
```

##### Restart VPN

```
sudo ipsec restart
```

##### Now you should be setup for Core API
