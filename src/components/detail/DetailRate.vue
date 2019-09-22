<template>
  <div class="detail-rate">
     <div class="rate-left">轻点右侧星星评分</div>
     <div class="rate-right">
      <van-rate
         :value="rateValue"
         :size="25"
         color="#1d89ee"
         void-color="#dee0e2"
         void-icon="star"
         @change="onRateChange"
         >

         </van-rate>
     </div>
  </div>
</template>

<script>
  export default {
    props: {rateValue:Number},
    methods: {
    onRateChange(e) {
      console.log(e.mp.detail)
      this.$emit('onRateChange', e.mp.detail)
    }
  }
  }
</script>

<style lang="scss" scoped>
.detail-rate{
  display: flex;
  padding: 10px 15px;
  margin-top:5px;
  border-bottom: 1px solid #ebebeb;
  align-items: center;
  justify-content: space-between;
  .detail-rate-left{
    
    font-size: 12.5px;
    line-height: 14px;
    color:#99a0aa;
    
    

  }
  
}
</style>