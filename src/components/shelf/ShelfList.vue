<template>
  <div class="shelf-list-wrapper">
    <div class="shelf-list-inner">
      <div
        class="shelf-book"
        v-for="book in shelfList"
        :key="book.fileName"
      >
        <div
          class="shelf-book-cover"
          v-if="book && book.cover"
          @click="() => gotoBookDetail(book)"
        >
          <ImageView :src="book.cover"></ImageView>
        </div>
        <div class="shelf-book-title" v-if="book && book.title">{{book.title}}</div>
        <div class="shelf-book-add" v-if="!book.title" @click="goCategory">
          <div class="shelf-book-add-wrapper">
            <div class="shelf-book-add-x"></div>
            <div class="shelf-book-add-y"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  export default {
    components: { ImageView },
    props: {
      shelfList: Array
    },
    methods: {
      goCategory() {
        this.$router.push('/pages/categoryList/main')
      },
      gotoBookDetail(book) {
        this.$router.push({ path: '/pages/detail/main', query: { fileName: book.fileName } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shelf-list-wrapper {
    padding: 0 12.5px 20px 12.5px;

    .shelf-list-inner {
      display: flex;
      flex-flow: row wrap;

      .shelf-book {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 20px 12.5px 0 12.5px;
        box-sizing: border-box;

        .shelf-book-cover {
          width: 100%;
          height: 130px;
        }

        .shelf-book-title {
          width: 100%;
          font-size: 12px;
          color: #333;
          overflow: hidden;
          text-overflow: clip;
          line-height: 14px;
          max-height: 28px;
          margin-top: 10px;
        }

        .shelf-book-add {
          width: 100%;
          height: 130px;
          border: 1px solid #CBCBCB;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;

          .shelf-book-add-wrapper {
            position: relative;
            width: 30px;
            height: 30px;

            .shelf-book-add-x {
              position: absolute;
              top: 50%;
              width: 30px;
              height: 2px;
              margin-top: -1px;
              background: #CACACA;
            }

            .shelf-book-add-y {
              position: absolute;
              left: 50%;
              width: 2px;
              height: 30px;
              background: #CACACA;
            }
          }
        }
      }
    }
  }
</style>
