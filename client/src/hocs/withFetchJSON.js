import React from 'react'
import { callAPI } from '../drivers/api'

// simple tagged template string function to apply a dict to a string
export function pathTemplate(strings, ...keys) {
  return function(dict) {
    var result = [strings[0]]
    keys.forEach(function(key, i) {
      result.push(dict[key], strings[i + 1])
    })
    return result.join('')
  }
}

// Gets JSON from an optionally authenticated API if auth prop is passed
// The wrapped component is passed properties for error, loading, fetch data and auth
export function withFetchJSON(WrappedComponent, url) {
  return class extends React.Component {
    state = {
      error: null,
      isLoaded: false,
      data: undefined,
    }

    async componentDidMount() {
      try {
        const endpoint = `${
          typeof url === 'function' ? url(this.props.fetchURLProps) : url
        }`
        const { auth: { accessToken } } = this.props
        const data = await callAPI(accessToken, 'GET', endpoint)
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
