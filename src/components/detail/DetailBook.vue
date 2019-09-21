<template>
  <div class="detail-book">
      <div class="book-info-l">
         <div class="book-img">
        <image-view :src="book&&book.cover"></image-view>
      </div>
      </div>
      
      <div class="book-info-r">
         <div class="title">{{book&&book.title|| ''}}</div>
         <div class="author">{{book&&book.author|| ''}}</div>
         <div class="desc">{{book&&book.categoryText||''}}</div>
      </div>
    
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import { CATEGORY } from '@/utils/const'
  export default {
    name: "DetailBook",
   
    props: {
      book: Object
    },
    components: {
      ImageView
    }
  }
</script>

<style lang="scss" scoped>
.detail-book{
  display: flex;
  padding: 10px 15px;
  .book-info-l{
    padding-right:10px;
    .book-img{
      width:108px;
      height:157px;
    }
  }
  
  .book-info-r{
   flex:1;
   padding: 20px 0 20px 10px;
   .title{
     font-weight:500;
     font-size: 22px;
     color: #333;
     line-height: 31px;
   }
   .author{
     font-size:16px;
     line-height: 22.5px;
     margin-top: 5px;
   }
   .desc{
     font-size:14px;
     line-height: 22px;
     color: #868686;
     margin-top:12px;
   }
  }
  
}
</style>