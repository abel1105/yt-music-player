<template>
  <div class="content">
    <LeftPanel />
    <MiddlePanel />
    <RightPanel />
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel';
import MiddlePanel from '@/components/MiddlePanel';
import RightPanel from '@/components/RightPanel';
export default {
  name: 'content',
  components: { RightPanel, MiddlePanel, LeftPanel }
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  width: 100vw;
  height: calc(100vh - 135px);
  grid-template-columns: 280px auto 280px;
}
</style>
