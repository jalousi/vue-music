export const singer = state => state.singer

export const fullScreen = state => state.fullScreen

export const sequenceList = state => state.sequenceList

export const playlist = state => state.playlist

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const playing = state => state.playing

export const mode = state => state.mode

