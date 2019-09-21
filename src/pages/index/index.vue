<template>
  <div>
    <div class="home" v-if="isAuth">
      <search-bar disabled  :hotSearch="hotSearch" @onClick="searchBarClick"></search-bar>
      <home-card :data="homeCard"></home-card>
      <div :style="{marginTop:'23px'}">
        <home-book
          linearBg
          mode="col"
          title="为您推荐"
          btnText="换一批"
          :row="1"
          :col="3"
          :data="recommend"
          @onMoreClick="recommendChange('recommend')"
          @onBookClick="onHomeBookClick"
        ></home-book>
      </div>
      <div :style="{marginTop: '23px'}">
        <home-book @onBookClick="onHomeBookClick" @onMoreClick="recommendChange('freeRead')" mode="row" title="免费阅读" btnText="换一批" :row="2" :col="2" :data="freeRead"></home-book>
      </div>
      <div :style="{marginTop:'23px'}">
        <home-book @onBookClick="onHomeBookClick"  @onMoreClick="recommendChange('hotBook')" linearBg title="当前最热" :row="1" :col="4" :data="hotBook" mode="col" btnText="换一批"></home-book>
      </div>
      <div :style="{marginTop: '23px'}">
        <home-book @onBookClick="onCategoryClick" title="分类" mode="category" btnText="查看全部" :row="3" :col="2" :data="category"></home-book>
      </div>
    </div>
    <Auth v-else @getUserInfo="init" />
  </div>
</template>

<script>
import SearchBar from "@/components/home/SearchBar";
import HomeCard from "@/components/home/HomeCard";
import HomeBook from "@/components/home/HomeBook";
import Auth from "@/components/base/Auth";
import { getHomeData,recommend,freeRead,hotBook,register } from "../../api";
import {getSetting,getUserInfo,setStorageSync,getStorageSync,getUserOpenId,showLoading,hideLoading} from '../../api/wechat'
export default {
  data() {
    return {
      hotSearch: "",
      homeCard: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      isAuth: false
    };
  },
  methods: {
    onHomeBookClick(book) {
      this.$router.push({
        path:'/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    onCategoryClick(category) {
      this.$router.push({
        path: "/pages/list/main",
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText
        }
      })
    },
    recommendChange(key) {
      switch(key) {
        case 'recommend':
          recommend().then(res => {
            this.recommend = res.data.data
          })
          break;
        case 'freeRead':
          freeRead().then(res=> {
            this.freeRead = res.data.data
          })  
          break;
        case 'hotBook':
          hotBook().then(res=> {
            this.hotBook = res.data.data
          })  
          break;
      }
    },
    searchBarClick() {
      console.log('111')
      this.$router.push({
        path: "/pages/search/main",
        query: {
          hotSearch:this.hotSearch
        }
      })
    },
    jump() {},
    init() {this.getSetting()},
    getSetting() {
      getSetting('userInfo',()=>{
         this.isAuth = true
         showLoading('加载中')
         this.getUserInfo()
      },()=>{
        this.isAuth = false
      })
    },
    getUserInfo(){
      const onOpenIdComplate = (openId, userInfo) => {
        this.getHomeData(openId,userInfo)
        register(openId,userInfo)
      }
      getUserInfo(
        (userInfo)=> {
          console.log(userInfo)
          setStorageSync('userInfo',userInfo)
          const openId = getStorageSync('openId')
          if(!openId || openId.length===0) {
            getUserOpenId(openId=>onOpenIdComplate(openId,userInfo))
          } else {
            onOpenIdComplate(openId,userInfo)
          }
        },
        ()=>{
          console.log('出错了...')
        }
      ) 
    },
    getHomeData(openId,userInfo) {
      getHomeData({ openId })
        .then(res => {
          console.log(res.data.data);
          const {
            data: {
              hotSearch: { keyword },
              shelf,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            }
          } = res.data;
          this.hotSearch = keyword;
          this.recommend = recommend;
          this.freeRead = freeRead;
          this.hotBook = hotBook;
          this.category = category;
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          };
          console.log(this.homeCard)
          hideLoading()
        })
        .catch(() => {
          hideLoading()
        });
    }
  },
  mounted() {
    this.init()
  },
  components: { SearchBar, HomeCard, HomeBook, Auth }
};
</script>

<style lang="scss" scoped>
.msg {
  font-size: 20px;
  color: red;
}
</style>
