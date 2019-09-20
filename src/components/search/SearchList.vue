<template>
  <div class="search-list-wrapper">
   <SearchItem 
   icon="apps-o"
   :title="category"
   sub-title='分类'
   v-if="category"
   @onClick="showList(category,'category')"
   />
  <SearchItem
  icon="user-o"
  :title="author"
  sub-title="作者"
  v-if="author"
  @onClick="showList(author,'author')"
  
  />
  <SearchItem
  icon="newspaper-o"
  :title="publisher"
  sub-title="出版社"
  @onClick="showList(publisher,'publisher')"
  v-if="publisher"
  
  
  />
  
  <SearchTable :data="data.book"  v-if="data.book.length > 0"/>
  <div v-if="!category&&!publisher&&!author&&data.book.length==0" class="noresult" >没有查询结果</div>

  </div>
</template>

<script>
import SearchItem from './SearchItem'
import SearchTable from './SearchTable'
export default {
    name: "SearchList",
    components: {
      SearchItem,
      SearchTable
    },
    props :{
      data: Object
    },
    computed: {
      category() {
        if(this.data&& this.data.category&&this.data.category.length>0) {
          return this.data.category[0].categoryText
        } else {
          return null
        }
      },
      author() {
        if(this.data&& this.data.author&&this.data.author.length>0) {
          return this.data.author[0].author
        }else {
          return null
        }
      },
      publisher() {
        if(this.data&& this.data.publisher&& this.data.publisher.length>0) {
          return this.data.publisher[0].publisher
        } else {
          return null
        }
      }
    },
    methods :{
      showList(text,key) {
        this.$router.push({
          path: "/pages/list/main",
          query: {
            text,key,title:text
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.noresult{
  padding: 15px 15.5px;
  font-size:20px;
  font-weight:500;
}
</style>