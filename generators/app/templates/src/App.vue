<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from "ant-design-vue/es/locale/zh_CN";

export default {
  name: "app",
  data() {
    return {
      zh_CN,
    };
  },
  mounted() {},
};
</script>
<style  scoped>
</style >