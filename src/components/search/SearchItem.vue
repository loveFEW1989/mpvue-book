<template>
  <div class="search-item" @click="onClick">
    <div class="item-img">
       <div class="icon-wrapper">
        <van-icon 
       :name="icon" color="rgba(0,0,0,.5)" 
       :style="{width:'20px',height:'20px'}">

       </van-icon>
       </div>
       
    </div>
    <div class="titles">
      <div class="title">{{title}}</div>
      <div class="subtitle">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchItem",
    props :{
     title: String,
     subTitle: String,
     icon: String
    },
    methods : {
      onClick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-item{
  display: flex;
  align-items: center;
  padding:15px;
  height:36.5px;
  .item-img{
    .icon-wrapper{
       display: flex;
       align-items: center;
       justify-content: center;
       width:32px;
       height:32px;
       border-radius: 50%;
       background: #f7f7f9;
    }
  }
  .titles{
    width: 80%;
    margin-left: 10px;
    .title{
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      font-size: 14px;
      line-height: 20px;
    }
    .subtitle{
      color:rgba(0,0,0,.45);
      font-size: 12px;
      line-height: 16.5px;
    }
  }
}
</style>