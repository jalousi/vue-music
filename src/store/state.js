import {playMode} from 'common/js/config'

const state = {
  singer: {},
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  mode: playMode.sequence,
  playing: false
}

export default state