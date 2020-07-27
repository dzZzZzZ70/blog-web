import axios from 'axios'


const config = {
    // `url` is the server URL that will be used for the request  
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: 'https://some-domain.com/api/',
  
  }

  const instance = axios.create(config)