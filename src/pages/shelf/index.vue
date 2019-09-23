<template>
  <div class="shelf">
    <ShelfUserInfo 
    :num="shelfList.length>0 ? shelfList.length-1 : 0"
    :user-info="userInfo"
    :read-day="readDay"
    
    />

    <ShelfList :shelfList="shelfList"/>
  </div>
</template>

<script>
import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
import ShelfList from '../../components/shelf/ShelfList'
import {getShelf, day} from '@/api'
import {getStorageSync} from '../../api/wechat'
export default {
    components: {ShelfUserInfo,ShelfList},
    data() {
     return {
       userInfo: {},
       shelfList: [],
       readDay :1
     }
    },
    mounted() {
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openId')
      if(openId) {
        getShelf(openId).then(res=> {
          this.shelfList = res.data.data
          this.shelfList.push({})
        })
        day(openId).then(res=> {
          this.readDay = res.data.data.day
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>