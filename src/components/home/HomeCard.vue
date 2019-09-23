<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="info-avatar">
          <image-view  mode="scaleToFill" height="100%" round :src="userInfo.avatarUrl"></image-view>
        </div>
        <div class="nickname">{{userInfo.nickName}}</div>
        <div class="shelf-text">书架共有{{num}}本书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper" v-for="(item,index) in bookList" :key="index"
           @click="onBookClick(item)"
          >
            <image-view  :src="item.cover"></image-view>
          </div>
          
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf">书架</div>
          <van-icon name="arrow" class="arrow" sizi="11px" color="#828489"></van-icon>
        </div>
      </div>
       <div class="feedback-wrapper"></div>
       <div class="feedback-text" @click="onFeedBackClick">反馈</div> 
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import imageView from '@/components/base/ImageView'
import Dialog from 'vant-weapp/dist/dialog/dialog'
export default {
  name: "HomeCard",
  components: {imageView},
  props: {
    data: Object,
    num:Number,
    hasSign:Boolean,
    signDay:Number
  },
  computed: {
    userInfo() {
      return (this.data&&this.data.userInfo) || {}
    },
    bookList() {
      return (this.data && this.data.bookList) || []
    }
  },
  methods: {
      gotoShelf() {
        this.$router.push('/pages/shelf/main')
      },
      onBookClick(book) {
        this.$emit('onBookClick', book)
      },
    onFeedBackClick() {
      Dialog.confirm({
        title:'反馈',
        message:"您是否确认提交反馈",
        confirmButtonText:"是",
        cancelButtonText:"否" 
      }).then(()=> {
        console.log('点击了 是')
      }).catch(()=> {
        console.log('点击了 否')
      })
    }
  },
  
};
</script>

<style lang="scss" scoped>
.home-card {
  background-image: linear-gradient(-90deg, #54575f 0%, #595b60 100%);
  border-radius: 15px;
  margin: 22px 20px 0;
  .home-card-inner {
    position: relative;
    padding: 21.5px 17px 20px 20px;
    box-sizing: border-box;
    .user-info {
      display: flex;
      .info-avatar {
        width: 20px;
        height: 20px;
       
      }
      .nickname {
        margin-left: 8.5px;
        color: #ffff;
      }
      .shelf-text {
        margin-left: 6px;
        color: #fff;
        opacity: .7;
      }
      .round-item{
        width:4px;
        height:4px;
        background:#a2a2a2;
        border-radius:50%;
        margin: 10px 6px 
      }
    }
    .book-info {
      display: flex;
      margin-top: 16.5px;
      .book-wrapper {
       
        flex: 1;
        display: flex;
        justify-content: space-around;

        .book-img-wrapper {
          width: 72px;
          height: 101px;
          
        }
        
      }
      .shelf-wrapper {
          display: flex;
          align-items: center;
          .shelf{
           width: 11px;
           font-size:11px;
           word-break: break-word;
           color: #fff;
           opacity:.8;
          }
      }
    }
    .feedback-wrapper{
     
        position: absolute;
        right: 0;
        top: 19.5px;
        width: 44.5px;
        height: 23.5px;
        background: #D8D8D8;
        opacity: .3;
        border-radius: 100px 0 0 100px;
      
        
    }
    .feedback-text{
          position: absolute;
          right:15px;
          top:25px;
          color: #fff;
          font-size:11px;

    }
  }
}
</style>