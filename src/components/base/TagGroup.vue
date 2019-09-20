<template>
  <div class="tag-group-wrapper">
   <div class="tag-group-header">
    <div class="header-text">{{headerText}}</div>
    <div class="header-btn" @click="onBtnClick">{{btnText}}</div>
   </div>
   <div class="tag-group">
     <div
      v-for="(text,index) in value"
      :key="index"
      class="tag-group-inner">
        <Tag :text="text"  @onClick="onTagClick(text,index)" />
     </div>
   </div>
     
  </div>
</template>

<script>
import Tag from '@/components/base/Tag'
  export default {
    props: {
      headerText: {type:String},
      btnText: {type:String},
      value: {type:Array,default: []}
    },
    components: {Tag},
    methods: {
      onBtnClick() {
        this.$emit('onBtnClick')
      },
      onTagClick(text, index) {
        this.$emit('onTagClick', text, index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.tag-group-wrapper {
 margin-top:35px; 
 padding-bottom:10px;
 width: 100%;
 .tag-group-header{
   display: flex;
   justify-content: space-between;
   font-size: 14px;
   padding: 0 16px;
   line-height: 20px;
   .header-text{
     color: #333;
   }
   .header-btn{  
     color: #3696ef;
   }
 }
 .tag-group{
   width: 100%;
   box-sizing: border-box;
   display: flex;
   flex-flow: row wrap;
   padding: 4px 10px 0 10px; 
   .tag-group-inner{
    max-width: 100%;
    box-sizing: border-box;
    padding: 12px 6px 0 6px;
   }
 }
}
  
</style>