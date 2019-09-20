<template>
  <div class="search-bar" @click="onSearchBarClick">
    <div class="search-bar-wrapper">
      <van-icon class="search" name="search" size="16px" color="#858c96"></van-icon>
      <input 
      :focus="focus"
      :disabled="disabled"
      :maxlength="limit"
      :placeholder="hotSearch.length===0?'搜索书籍名':hotSearch"
      v-model="searchWord"
      @input="onChange"
      @confirm="onConfirm"
      confirm-type="search"
      placeholder-style="color:#adb4be;font-size:15px"
      
      
      class="search-bar-input" type="text"  />
      <van-icon @click="onClearClick" v-if="searchWord.length>0" class="close" name="close" size="16px" color="#858c96"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default:false
    },
    limit: { type: Number, default: 50 },
    hotSearch: {type: String,default:''}
  },
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    // 搜索框点击事件
    onSearchBarClick() {
      this.$emit('onClick')
    },
    // 点击清空事件
    onClearClick() {
      this.searchWord = ''
      this.$emit('onClear')
    },
    // 输入监听事件
    onChange(e) {
      const {value} =e.mp.detail
      this.$emit('onChange',value) 
    },
    // 点击虚拟键盘搜索事件
    onConfirm(e) {
       const {value} = e.mp.detail
       this.$emit('onConfirm',value)
    },
    // 获取输入框的关键字
    getValue() {
      return this.searchWord
    },
    // 对输入框的关键字赋值
    setValue(val) {
      this.searchWord = val
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
 padding: 15px 15.5px;  
 .search-bar-wrapper{
   background: #f5f7f9;
   box-sizing:border-box;
   padding: 12px 13px;
   display: flex;
   flex-direction: row;
   height:40px;
   border-radius: 20px;
   align-items: center;
   .search-bar-input{
    flex: 1;
    margin-left:3px;
   }
   .close{
     width:30px;
     height:20px;
     text-align: center;
    

   }
   .search{
     width:30px;
     height:17.5px;
     text-align: center;
    
   }
 }
}
</style>