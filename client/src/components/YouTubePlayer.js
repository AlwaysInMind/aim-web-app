import React from 'react'

const PLAYER_OPTIONS =
  'cc_load_policy=1&controls=0&disablekb=1&rel=0&modestbranding=1&fs=0&iv_load_policy=3' +
  '&autoplay=0&loop=1' +
  `&enablejsapi=1&domain=https://${document.domain}`

export class YouTubePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.loadYouTubeAPI()
  }

  loadYouTubeAPI = () => {
    window.onYouTubeIframeAPIReady = e => {
      this.player = new window['YT'].Player('video-iframe', {
        events: {
          onReady: e => this.setPlayState(e.target),
          onStateChange: this.onStateChange,
        },
      })
    }

    // async on-demand load of script
    if (!document.getElementById('youtube-iframe-api')) {
      var tag = document.createElement('script')
      tag.id = 'youtube-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      var firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      setTimeout(window.onYouTubeIframeAPIReady, 0)
    }
  }

  onStateChange = event => {
    this.props.onPlayStateChanged(event.data === 1)
  }

  setPlayState = (player = this.player) => {
    if (this.props.playlistId) {
      if (this.props.playing) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    }
  }

  next = () => {
    if (this.props.playlistId) {
      this.player.nextVideo()
    }
  }

  componentDidUpdate() {
    this.setPlayState()
  }

  render() {
    const {
      playlistId,
      playing,
      onPlayStateChanged,
      ...passThroughProps
    } = this.props

    return (
      <iframe
        id="video-iframe"
        type="text/html"
        frameBorder="0"
        className="videos"
        width="100%"
        height="100%"
        title="YouTube video player"
        src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&${PLAYER_OPTIONS}`}
        {...passThroughProps}
      />
    )
  }
}
