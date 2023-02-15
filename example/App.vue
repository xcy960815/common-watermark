<template>
  <div class="common-watermark">common-watermark</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { watermark } from 'common-watermark';
export default defineComponent({
  mounted() {
    const app = document.body;
    watermark.setWatermark('我是水印,我是水印,我是水印,我是水印,我是水印,我是水印', app);
  },
});
</script>
<style lang="less" scoped>
.common-watermark {
  position: relative;
}
</style>
