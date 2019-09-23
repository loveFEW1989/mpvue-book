<template>
  <div class="categorylist">
<home-book  
  mode="category" 
  :row="(list&&list.length/2)|| 0" 
  :col="2" 
  :data="list"
  :showTitle="false"
  :showBtn="false"
  @onBookClick="gotoCategoryList"
  >
  
  </home-book>
      
  </div>
</template>

<script>
import HomeBook from '../../components/home/HomeBook'
import {categoryList} from '../../api/index'
 export default {
    name: "categoryList",
    components: {HomeBook},
    data() {
      return {
        list: []
      }
    },
    mounted() {
      categoryList().then(res=> {
        console.log(res)
        this.list = res.data.data
      })
    },
    methods: {
      gotoCategoryList(data) {
        console.log(data)
        const {category, text} = data
        const query ={categoryId: category,title: text}
        this.$router.push({path:'/pages/list/main',query})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>