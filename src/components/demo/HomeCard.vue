<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="info-avatar">
          <img
            style="width:100%;height:100%;"
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            alt
          />
        </div>
        <div class="nickname">米老鼠</div>
        <div class="shelf-text">书架共有3本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-info-wrapper">
          <div class="item">
            <img
              class="item-img"
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              alt
            />
          </div>
          <div class="item">
            <img
              class="item-img"
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              alt
            />
          </div>
          <div class="item">
            <img
              class="item-img"
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              alt
            />
          </div>
        </div>

        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper"></div>
      <div class="feedback-text">反馈</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard"
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
        border-radius: 50%;
      }
      .nickname {
        margin-left: 8.5px;
      }
      .shelf-text {
        margin-left: 8.5px;
      }
    }
    .book-info {
     
      margin-top: 16px;
      .book-info-wrapper {
        width:273px;
        flex: 1;
        display: flex;
        justify-content: space-around;

        .item {
          width: 72px;
          height: 101px;
          .item-img {
            width: 100%;
            height: 100%;
          }
        }
        
      }
      .shelf-wrapper {
          width: 30px;
          height: 40px;
          display: flex;
          align-items: center;
          position: absolute;
          top:93.5px;
          right:13.5px;
          color: #fff;
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