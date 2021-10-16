<template>
  <div style="padding:20px;">
    酒店分类
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/vuex4/index12-16'
import { RootState } from '@/store/rootstate'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()
    let hotelSortList = {}
    return {
      hotelSortList,
    }
  },
})
</script>
