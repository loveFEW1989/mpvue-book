<template>
  <div class="detail-contents-wrapper" >
    <div class="detail-contents-title">目录:</div>
    <div class="detail-contents"
    v-for="(item,index) in contents"
    :key="index"
    >
    <div
     :style="{marginLeft:(15*item.level)+'px'}"
     class="detail-contents-label">
      {{item.label}} 
    </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailContents',
    props: {
      contents: Array
    }
  }
</script>

<style lang="scss" scoped>
.detail-contents-wrapper{
  padding: 0 0 60px 15px;
  margin-top:15px;
  .detail-contents-title{
    font-size: 22px;
    line-height: 31px;
    color: #333;
  }
  .detail-contents{
    padding: 20px 15px 20px 0;
    border-bottom: 1px solid #ebebeb;
    &:last-child{
      border-bottom: none;
    }
    .detail-contents-label{
      font-size: 15px;
      line-height: 18px;
      color: #868686;
      max-height: 18px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>