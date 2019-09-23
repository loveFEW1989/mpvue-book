<template>
  <div>
    <div v-if="!loading">
  <DetailBook :book="book"/>
  <DetailStat
  :readers="readers"
  :readerNum="readerNum"
  :rankNum="rankNum"
  :rankAvg="rankAvg"
  />
  <DetailRate :rate-value="rateValue"  @onRateChange="onRateChange" />
  <DetailContents :contents="contents" />
  
  <detail-bottom :is-in-shelf="isInShelf"  @handleShelf="handleShelf"  @readBook="readBook" ></detail-bottom>
  
    </div>
  <DetailPreload v-if="loading" />
  </div>
</template>

<script>
  import { getDetailData, rank, getDetailContents, getShelf, saveShelf,removeShelf } from '../../api'
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailContents from '../../components/detail/DetailContent'
  import DetailBottom from '../../components/detail/DetailBottom'
  import DetailPreload from '../../components/preload/DetailPreload'
  import { getStorageSync,setStorageSync, showToast, showModal } from '../../api/wechat'
  export default {
     components: {DetailBook,DetailStat,DetailRate,DetailContents,DetailBottom,DetailPreload},
     data() {
       return {
         book: null,
         contents: null,
         isInShelf: false,
         rateValue:0,
         readers: [],
         readerNum:0,
         rankAvg:0,
         rankNum:0,
         loading:true
       
       }
     },
     methods: {
      //  将书放入书架或者移出书架
      handleShelf() {
       if (this.isInShelf) {
          const vue = this
          showModal({
            title: '移出书架',
            content: `是否将《${this.book.title}》移出书架`,
            callback() {
              vue.removeFromShelf()
            }
          })
       }else {
         console.log('加入书架')
         this.saveToShelf()
       }
      }, 
      removeFromShelf() {
         const openId =getStorageSync('openId')
         if(!openId) {
           showToast('请登录后重试')
         } else {
           removeShelf({
             fileName:this.book.fileName,
             openId
           }).then(res=>{
             if(res.data.error_code ===0) {
               showToast(res.data.msg,true)
               this.isInShelf = false
             }else {
               showToast(res.data.msg)
             }
           })
         }
      },
      saveToShelf() {
        const openId = getStorageSync('openId')
        if(!openId) {
          showToast('请登录后重试')
        } else {
          saveShelf({
            fileName:this.book.fileName,
            openId
          }).then(res=> {
            if(res.data.error_code===0) {
              this.isInShelf = true
              showToast(res.data.msg,true)
            } else {
              showToast(res.data.msg)
            }
          })
        }

      },

      init() {
        const fileName = this.$route.query.fileName || ''
        const openId = getStorageSync('openId')
        const vue = this
        getDetailData({openId,fileName}).then(res=>{
          console.log(res)
          this.book = res.data.data
          this.readerNum = this.book.readerNum
          this.readers = this.book.readers
          this.rankAvg = this.book.rankAvg
          this.rankNum = this.book.rankNum
          this.rateValue = this.book.rank
          if(openId) {
            getShelf(openId,this.book.fileName).then(res=> {
              const data = res.data.data
              if(data.length===0) {
                this.isInShelf = false
              }else {
                this.isInShelf = true
              }
            })
          }
          vue.$nextTick(()=>{
            vue.loading = false
          })
        })
        getDetailContents(fileName).then(res=>{
          console.log(res)
          this.contents = res.data.data
        })

      },
      //  评分
       onRateChange(rankValue) {
        this.rateValue = rankValue
        const fileName = this.book.fileName
        const openId = getStorageSync('openId')
        rank({openId,fileName,rank:this.rateValue}).then(()=>{
          showToast('评分成功')
        })
         
       },
      //  阅读
      readBook(nav) {
        const params = {
          fileName: this.book.fileName,
          opf:this.book.opf
        }
        if(nav) {
          if(nav.indexOf('/')>=0) {
            nav = nav.slice(nav.indexOf('/')+1,nav.length)
          }
          params.navigation = nav
        }
        console.log(params)
        this.$router.push({
          path:'/pages/read/main',
          query:params
        })
      }
     
      
       
     
     },
     mounted() {
      this.loading = true
      this.init()
      console.log(this.$route.query)
     }
  }
</script>

<style lang="scss" scoped>

</style>