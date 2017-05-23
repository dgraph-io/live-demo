export function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error["response"] = response;
    throw error;
  }
}

// getEndpoint returns a URL for the dgraph endpoint, optionally followed by
// path string. Do not prepend `path` with slash.
export function getEndpoint(path = "", options = { debug: true }) {
  const baseURL = getEndpointBaseURL();
  const url = `${baseURL}/${path}`;

  if (options.debug) {
    return `${url}?debug=true`;
  }

  return url;
}

export function getEndpointBaseURL() {
  if (process.env.NODE_ENV === "production") {
    // This is defined in index.html and we get it from the url.
    return window.SERVER_URL;
  }

  // For development, we just connect to the Dgraph server at http://localhost:8080.
  return "http://localhost:8080";
  // return "https://play.dgraph.io";
}

export function sortStrings(a, b) {
  var nameA = a.toLowerCase(), nameB = b.toLowerCase();
  if (
    nameA < nameB //sort string ascending
  )
    return -1;
  if (nameA > nameB) return 1;
  return 0; //default return value (no sorting)
}

export function runQuery(query) {
  const endpoint = getEndpoint("query", { debug: true });

  return timeout(
    60000,
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain"
      },
      body: query
    })
  )
    .then(checkStatus)
    .then(response => response.json())
    .then(result => {
      return result;
    });
}
