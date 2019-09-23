<template>
  <div>
    <SearchTable :data="data" />
  </div>
</template>

<script>
import SearchTable from "@/components/search/SearchTable";
import { searchBook } from "../../api";
import { setNavigationBarTitle, showToast } from "../../api/wechat";
export default {
  components: { SearchTable },
  data() {
    return {
      data: [],
      page: 1,
      isLock: false
    };
  },
  methods: {
    searchBook(params) {
      params.page = this.page;
      searchBook(params).then(res => {
        if (res && res.data && res.data.error_code === 0) {
          this.data = res.data.data;
          this.page++;
        }
      });
    }
  },
  mounted() {
    console.log("query...", this.$route.query);
    this.isLock = false
    this.page = 1;
    const query = this.$route.query;
    if (query) {
      const keys = Object.keys(query);
      let title = query.title;
      if (!title) {
        title = keys.length > 0 ? query[keys[0]] : "";
      }
      setNavigationBarTitle(title);
      this.searchBook(query);
    }
  },
  onReachBottom() {
    const query = this.$route.query;
    if (query && this.data) {
      query.page = this.page;
      if(!this.isLock) {
        searchBook(query).then(res => {
        if (res && res.data && res.data.error_code === 0) {
          const book = res.data.data;
          if (book && book.length > 0) {
            this.data.push(...book);
            this.page++;
          } else {
            showToast("没有更多数据了");
            this.isLock = true
          }
        }
      });
      }
      


    }
  },

  onUnload: function() {
    console.log("监听页面卸载");
    this.data = [];
  }
};
</script>

<style lang="scss" scoped>
</style>