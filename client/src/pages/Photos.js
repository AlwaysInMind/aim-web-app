import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { BackButton, PauseButton } from '../components/Button.js'
import Page from '../components/Page'
import mkSlideShow from '../components/SlideShow'

const options = { slideshowRate: 5000 }

class Photos extends React.Component {
  constructor(props) {
    super(props)
    this.slideShow = mkSlideShow(options.slideshowRate)
  }

  componentWillUnmount() {
    this.slideShow.kill()
  }

  render() {
    const { data, ...props } = this.props
    return (
      <Page
        title="View Photos"
        loadingText="Loading your photos..."
        errorText="Unable to get photos"
        {...props}
      >
        {() => (
          <React.Fragment>
            <div className="slides-container">
              <ul style={{ display: 'block' }} className="slides">
                {data.length
                  ? data.map(item => (
                      <li className="slide" key={item.id}>
                        <img
                          style={{ display: 'block' }}
                          src={item.src}
                          alt=""
                        />
                      </li>
                    ))
                  : 'No photos'}
              </ul>
            </div>,
            <BackButton className="button-goback" label="More Photos" />,
            <PauseButton className="button-pause" pausable={this.slideShow} />,
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
