<template>
  <div>
   <SearchTable :data="data"/>
  </div>
</template>

<script>
  import SearchTable from '@/components/search/SearchTable'
  import {searchList} from '../../api'
  import {setNavigationBarTitle, showToast} from '../../api/wechat'
  export default {
     components: {SearchTable},
     data() {
       return {
         data:[],
         page: 1,
         isLock: false
       }
     },
     methods: {
       getSearchList() {
         const {key, text} = this.$route.query
         const params = {}
         if(key&& text) {
           params[key] = text
         }
         params.page = this.page
         if(!this.isLock) {
           searchList(params).then(reponse=> {
           console.log(reponse)
           const {data} = reponse.data
           if(data.length>0) {
             this.data.push(...data)
           } else {
             showToast('没有更多数据了')
             this.isLock = true
           }
         })
         } else {
           showToast('没有更多数据了')
         }
         


       }
     },
     mounted() {
       this.page = 1
       this.getSearchList()
       const {title} = this.$route.query
       setNavigationBarTitle(title)
     },
     onReachBottom() {
       this.page++
       this.getSearchList()
     },
    
     onUnload: function () {
    console.log('监听页面卸载')
    this.data = []
  },

  }
</script>

<style lang="scss" scoped>

</style>