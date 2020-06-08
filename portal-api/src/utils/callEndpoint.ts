export async function getEndpoint(_self, stub, url, params = "") {
  if (process.env.STUBS === "true") {
    return stub
  }
  return _self.get(
    `${url}${params}`,
    {},
    { timeout: _self.context.getRemainingTimeInMillis },
  )
}

export async function postEndpoint(_self, stub, url, data) {
  return _self.post(url, data, {
    timeout: _self.context.getRemainingTimeInMillis,
  })
}

export async function patchEndpoint(_self, stub, url, data) {
  if (process.env.STUBS === "true") {
    return stub
  }
  return _self.patch(url, data, {
    timeout: _self.context.getRemainingTimeInMillis,
  })
}

export async function deleteEndpoint(_self, stub, url) {
  if (process.env.STUBS === "true") {
    return stub
  }
  return _self.delete(
    url,
    {},
    { timeout: _self.context.getRemainingTimeInMillis },
  )
}
