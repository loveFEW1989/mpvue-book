<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tag">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: "Tag",
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
.tag-wrapper{
  background-color: #f7f7f9;
  border-radius:16px;
  padding: 5.5px  16.5px 6.5px 17px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;

  .tag{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #272e37;
    font-size: 14px;
    line-height:20px;
  }
}
</style>