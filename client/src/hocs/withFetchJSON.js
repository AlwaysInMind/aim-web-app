import React from 'react'

const APIDOMAIN =
  process.env.NODE_ENV === 'production' ? 'https://alwaysinmindapi.now.sh' : ''
console.log('zzz', process.env.NODE_ENV, `api: ${APIDOMAIN}`)

// simple tagged template string function to apply a dict to a string
export function template(strings, ...keys) {
  return function(dict) {
    var result = [strings[0]]
    keys.forEach(function(key, i) {
      result.push(dict[key], strings[i + 1])
    })
    return result.join('')
  }
}

async function fetchJSON(url, accessToken = undefined) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`, // better to exclude it if undefined
    },
  })
  return await res.json()
}

// Gets JSON from an optionally authenticated API if auth prop is passed
// The wrapped component is passed properties for error, loading, fetch data and auth
export default function withFetchJSON(WrappedComponent, url) {
  return class extends React.Component {
    state = {
      error: null,
      isLoaded: false,
      data: undefined,
    }

    async componentDidMount() {
      try {
        const endpoint = `${APIDOMAIN}${
          typeof url === 'function' ? url(this.props.fetchURLProps) : url
        }`
        const auth = this.props.auth
        const token = auth && auth.accessToken
        const data = await fetchJSON(endpoint, token)
        this.setState({
          isLoaded: true,
          data,
        })
      } catch (error) {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    }
    render() {
      return (
        <WrappedComponent
          error={this.state.error}
          isLoaded={this.state.isLoaded}
          data={this.state.data}
          {...this.props}
        />
      )
    }
  }
}
