<template>
  <div>
  <DetailBook :book="book"/>
  <DetailStat
  :readers="book.readers"
  :readerNum="book.readerNum"
  :rankNum="book.rankNum"
  :rankAvg="book.rankAvg"
  />
  <DetailRate :rankAvg="book.rankAvg"  @onRateChange="onRateChange" />
  <DetailContents :contents="contents" />
  
  <detail-bottom :inShelf="inShelf"  @handleShelf="handleShelfs" ></detail-bottom>
  </div>
</template>

<script>
  import { bookDetail, bookRankSave, bookContents, bookShelf, bookShelfSave, bookShelfRemove } from '../../api'
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailContents from '../../components/detail/DetailContent'
  import DetailBottom from '../../components/detail/DetailBottom'
  import { getStorageSync,setStorageSync } from '../../api/wechat'
  export default {
     components: {DetailBook,DetailStat,DetailRate,DetailContents,DetailBottom},
     data() {
       return {
         book: {},
         contents: [],
         inShelf: false
         
       
       }
     },
     methods: {
      //  将书放入书架或者移出书架
      handleShelfs() {
        console.log('111')
        
        const openId = getStorageSync('openId')
        const {fileName} =this.$route.query
        if(!this.inShelf) {
          this.inShelf = true
          bookShelfSave({openId,fileName}).then(this.getBookIsInShelf())
        } else {
          let that = this
          this.inShelf = false
          mpvue.showModal({
            title:'提示',
            content:`是否确认将${this.book.title}移出书架`,
            success(res) {
              if(res.confirm) {
                bookShelfRemove({openId,fileName}).then(that.getBookIsInShelf())
              }
            }
          })
        }
      }, 
      //  获取书籍详情
       getBookDetail() {
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          console.log(fileName)
          if(openId&&fileName) {
            bookDetail({openId,fileName}).then(res=> {
              console.log(res)
              this.book = res.data.data
            })
          }
       },

      //  评分
       onRateChange(value) {
         console.log('change.....')
         const openId = getStorageSync('openId')
         const fileName = this.$route.query.fileName
         console.log(fileName,'000')
        //  let obj = {}
        
        //  if(!this.rates.includes(fileName)) {
        //    obj[fileName] =value
        //    this.rates.push(obj)
        //    setStorageSync('rates',this.rates)
        //  } 
         bookRankSave({openId,fileName,rank:value}).then(res=> {
           this.getBookDetail()
         })
         
       },
      //  获取书籍目录
       getBookContents() {
         const {fileName}  =this.$route.query
         if(fileName) {
           bookContents({fileName}).then(res=> {
             console.log(res)
             this.contents = res.data.data
           })
         }
       },
      
       
      //  获取书籍是否在书架中
      getBookIsInShelf() {
        const openId = getStorageSync('openId')
        const {fileName} = this.$route.query
        if(openId&& fileName) {
          bookShelf({openId,fileName}).then(res=> {
            console.log(res)
            const {data} = res.data
            data.length === 0 ?this.inShelf=false : this.inShelf=true
          })
        }
      }
     },
     mounted() {
       this.getBookDetail()
       this.getBookContents()
       this.getBookIsInShelf()
     }
  }
</script>

<style lang="scss" scoped>

</style>