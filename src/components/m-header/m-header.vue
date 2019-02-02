<template>
  <div class='m-header'>
    <div class='icon'></div>
    <div class='text'>music</div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .m-header
    position relative
    color $color-theme
    height 44px
    text-align center
    font-size 0
    .icon
      display inline-block
      bg-image('logo')
      vertical-align top
      width 30px
      height 32px
      background-size 30px 32px
      margin-top 6px
      margin-right 9px
    .text
      display inline-block
      font-size $font-size-large-x
      line-height 44px
</style>