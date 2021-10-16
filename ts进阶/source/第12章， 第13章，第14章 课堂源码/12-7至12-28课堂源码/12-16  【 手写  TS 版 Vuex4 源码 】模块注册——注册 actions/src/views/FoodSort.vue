<template>
  <div style="padding: 20px">
    美食分类
    <div>
      {{ foodSortList }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from '@/vuex4/index12-16'
import { RootState } from '@/store/rootstate'
import getFoodSortModuleGetters from '@/store/foodsort/gettersincrease'
export default defineComponent({
  setup() {
    const store = useStore<RootState>()
    onMounted(() => {
      console.log('onMounted')
      store.dispatch('foodSortModule/FindFoodSortList')
    })

    return {
      foodSortList: computed(() => {
        console.log('computed')
        return getFoodSortModuleGetters['foodSortModule/getFoodSortList']
      }),
    }
  },
})
</script>
