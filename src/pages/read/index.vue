<template>
  <div class="read">
    <web-view :src="readUrl"></web-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileName: null,
        opf:null,
        navigation: null
      }
    },
    computed: {
      readUrl() {
         if(this.fileName && this.opf) {
           let base = `https://www.youbaobao.xyz/book/#/ebook/${this.fileName}?opf=${this.opf}`
           if(this.navigation) {
             base=`${base}&navigation=${this.navigation}`
           }
           base = `${base}&isMp=true`
           console.log('url',base)
           return base
         }else {
           return ''
         }
      }
    },
    mounted() {
      this.fileName = this.$route.query.fileName || ''
      this.opf = this.$route.query.opf || ''
      this.navigation = this.$route.query.navigation 
    }
  }
</script>

<style lang="scss" scoped>

</style>