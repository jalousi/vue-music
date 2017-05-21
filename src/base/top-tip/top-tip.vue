<template>
  <transition name="fade">
    <div class="top-tip" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showFlag = false
        }, 2000)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .top-tip
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background

  .fade-enter-active, .fade-leave-active
    transition: all 0.3s

  .fade-enter, .fade-leave-to
    transform: translate3d(0, -100%, 0)
</style>