<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle, eventType, TOUCH_EVENT} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newVal) {
        if (newVal > 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const width = this.percent * barWidth
          this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
          this.$refs.progress.style.width = `${width}px`
        }
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        let _eventType = eventType[e.type]
        if (_eventType !== TOUCH_EVENT) {
          if (e.button !== 0) {
            return
          }
        }
        this.touch.initiated = _eventType
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (eventType[e.type] !== this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const width = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
        this.$refs.progress.style.width = `${width}px`
      },
      progressTouchEnd(e) {
        if (eventType[e.type] !== this.touch.initiated) {
          return
        }
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const deltaX = e.pageX - rect.left - this.$refs.progress.clientWidth
        const width = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.$refs.progress.clientWidth + deltaX))
        this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
        this.$refs.progress.style.width = `${width}px`
        this._triggerPercent()
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>