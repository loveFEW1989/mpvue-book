<template>
  <div>
    <div class="home" v-if="isAuth">
      <search-bar disabled  :hotSearch="hotSearch" @onClick="searchBarClick"></search-bar>
      <home-card :data="homeCardData"
      :num="this.shelfList.length"
      :hasSign="hasSign"
      :signDay="continueSignDay"
      @onBookClick="gotoBookDetail"
      @onSignClick="onSignClick"
      
      >

      </home-card>
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
        <home-book @onMoreClick="gotoCategory" @onBookClick="onCategoryClick" title="分类" mode="category" btnText="查看全部" :row="3" :col="2" :data="category"></home-book>
      </div>
    </div>
    <Auth v-else @getUserInfo="init" />
    <HomePreload v-if="loading" />
  </div>
</template>

<script>
import SearchBar from "@/components/home/SearchBar";
import HomeCard from "@/components/home/HomeCard";
import HomeBook from "@/components/home/HomeBook";
import HomePreload from '@/components/preload/HomePreload'
import Auth from "@/components/base/Auth";
import {  getShelf,getHomeData,recommend,freeRead,hotBook,register,hasSignToday,
    sign } from "../../api";
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
      isAuth: false,
      cardList: [],
      userInfo: null,
      shelfCount: 0,
      hasSign: false,
      continueSignDay: 0,
      shelfList: [],
      loading:true
    };
  },
  computed: {
    homeCardData() {
      return {
        bookList: this.cardList,
        userInfo:this.userInfo
      }
    }
  },
  methods: {
    gotoBookDetail(book) {
        this.$router.push({ path: '/pages/detail/main', query: { fileName: book.fileName } })
    },
    gotoCategory() {
      this.$router.push({
        path: '/pages/categoryList/main'
      })
    },
    onSignClick() {
        Dialog.confirm({
          title: '立即签到',
          message: '连续签到30天，将有机会获得神秘礼物，敬请期待！',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.sign()
        }).catch(() => {
        })
      },
      sign() {
        sign(this.openId).then(response => {
          
            showToast('签到成功', true)
            this.hasSign = true
            this.continueSignDay++
            this.getSignState(this.openId)
          
        })
      },
      getSignState(openId) {
        const vue = this
        hasSignToday(openId).then(response => {
         
            vue.hasSign = response.data.data.hasSignToday
            vue.continueSignDay = response.data.data.continueSignDay
          
        })
      },
    onHomeBookClick(book) {
      this.$router.push({
        path:'/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    onCategoryClick(data) {
      console.log(data)
      const {category,text} = data
      const query = {categoryId:category,title:text}
      this.$router.push({
        path: "/pages/list/main",
        query
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
    
    init() {
      this.getSetting()
      
      },
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
      const vue =this
      const onOpenIdComplate = (vue, openId, userInfo) => {
       
        this.getHomeData(openId,userInfo)
        register(openId,userInfo)
        this.getSignState(openId)
      }
      getUserInfo(
        (userInfo)=> {
          
          this.userInfo = userInfo
           console.log(userInfo,'*******')
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
          this.loading = false
          const data = res.data.data || {}
          const {
            
              hotSearch,
              shelf,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            
          } = data;
          this.cardList = shelf
          this.hotSearch = hotSearch.keyword
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.category.forEach(c => {
            c.text = CATEGORY[c.categoryText.toLowerCase()]
          })
          this.shelfCount = shelfCount
          
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
  components: { SearchBar, HomeCard, HomeBook, Auth ,HomePreload},
  onShow() {
    console.log('...onshow...')
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openId')
      if(openId) {
        getShelf(openId).then(res=> {
          console.log(res,'***-书架信息 -**')
          this.shelfList = res.data.data
         
        })}
  },
  onLaunch() {
    console.log('....launch....')
  }
};
</script>

<style lang="scss" scoped>
.msg {
  font-size: 20px;
  color: red;
}
</style>
