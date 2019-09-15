<template>
  <div>
   <search-bar></search-bar>
  </div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
export default {
 methods: {
   jump() {
    
   }
 },
 components: {SearchBar}
}
</script>

<style lang="scss" scoped>
.msg{
  font-size:20px;
  color: red;
}
</style>
