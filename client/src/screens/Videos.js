import React from 'react'

import {
  Button,
  HomeButton,
  BackButton,
  PauseButton,
} from '../components/Button.js'
import { Screen } from '../components/Screen'
import { YouTubePlayer } from '../components/YouTubePlayer'
import { preferences } from '../drivers/preferences'

import './Videos.css'

export class VideosScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldPlay: true,
      isPlaying: false,
    }
    this.player = React.createRef()
  }

  onNext = () => {
    this.player.current.next()
  }

  render() {
    const { playlistId, ...props } = this.props
    const { complexity } = preferences

    return (
      <Screen
        screen="videos"
        title="View Videos"
        loadingText="Loading your videos..."
        errorText="Unable to get videos"
        screenHelpText="Watch the videos. Use the Pause button to stop the video. Use the Play button to start again."
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            <YouTubePlayer
              style={{ pointerEvents: 'none' }}
              playlistId={playlistId}
              playing={this.state.shouldPlay}
              onPlayStateChanged={isPlaying => {
                if (isPlaying !== this.state.isPlaying)
                  // Somewhate surprised that no change in state still causes update
                  this.setState({ isPlaying })
              }}
              ref={this.player}
            />
            {complexity === 0 && (
              <HomeButton
                style={{ gridArea: 'home' }}
                className="button-router"
                label="Go Back"
                helpFn={helpFn}
                helpText="Go back to the home screen"
              />
            )}
            {complexity > 0 && (
              <React.Fragment>
                <BackButton
                  style={{ gridArea: 'back' }}
                  className="button-router"
                  label="More Videos"
                  helpFn={helpFn}
                  helpText="Choose another video playlist"
                />
                <PauseButton
                  style={{ gridArea: 'pause' }}
                  className="button-pause"
                  isPlaying={this.state.isPlaying}
                  playFn={play => {
                    this.setState({ shouldPlay: play })
                  }}
                  helpFn={helpFn}
                  helpText="Pause or restart the video"
                />
              </React.Fragment>
            )}
            {complexity === 2 && (
              <Button
                style={{ gridColumn: 'span 2', gridArea: 'next' }}
                className="button"
                label="Next Video"
                actionFn={this.onNext}
                helpFn={helpFn}
                helpText="Play next video in playlist"
              />
            )}
          </React.Fragment>
        )}
      </Screen>
    )
  }
}
