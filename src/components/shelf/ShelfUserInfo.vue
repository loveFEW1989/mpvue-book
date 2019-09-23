<template>
  <div class="shelft-info">
    <div class="user-item">
     <div class="item-top">
       <div class="top-left">
         <div class="name">{{userInfo.nickName}}</div>
         <div class="days">您已经加入mpvue读书{{readDay}}天</div>
       </div>
       <div class="top-right">
         <ImageView round :src="userInfo.avatarUrl" />
       </div>
     </div>
     <div class="item-bottom">
       <div class="user-extra-text">您的书架中共有 {{num}} 本好书</div>
     </div>
    </div>

  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  export default {
    name: 'ShelfUserInfo',
    props: {
      num:Number,
      readDay:Number,
      userInfo: Object
    },
    components: {ImageView}
  }
</script>

<style lang="scss" scoped>
.shelft-info{
  padding: 10px 25px;
  .user-item{
    width:323px;
    height:124px;
    border-radius:12px;
    background-color: #f8f9fb;
    border: 1px solid #e0e1e2;
    
    .item-top{
      padding: 14px 23.5px 24px 18.5px;
      border-bottom: 1px solid #e9e9e9;
      
      display: flex;
      justify-content: space-between;
      
      .top-left{
        .name{
          font-size:17px;
          line-height: 24px;
          color: #333;
          font-weight:500;

        }
        .days{
          font-size: 12px;
          line-height: 16.5px;
          color:#868686;
        }
      }
      .top-right{
        width:36px;
        height:36px;
       
      }
    }
    .item-bottom{
      font-size: 12px;
      line-height: 16.5px;
      margin-top:8px;
      color: #666666;
      font-weight: 500;
      padding: 10px 15px;
    }
  }
}
</style>