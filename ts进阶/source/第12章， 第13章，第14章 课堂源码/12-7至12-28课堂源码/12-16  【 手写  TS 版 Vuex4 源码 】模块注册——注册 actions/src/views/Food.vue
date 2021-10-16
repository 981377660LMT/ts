<template>
  <div style="padding:20px;">
    美食
    <div style="margin-top:2px" v-for="(value, key) in foodList">
      <div style="border:1px solid red;display:flex;margin-left:30px">
        <div style="flex:1">{{ key }}</div>
        <div style="flex:5">
          <div style="display:flex;" v-for="(value, key) in value">
            <div style="flex:1">{{ key }}</div>
            <div style="flex:1">
              <router-link to="">{{ value }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from '@/vuex4/index12-16'
import { RootState } from '@/store/rootstate'
import getFoodSortModuleGetters from '@/store/foodsort/gettersincrease'
export default defineComponent({
  setup() {
    // const store = useStore<RootState>()
    // onMounted(() => {
    //   store.dispatch('foodSortModule/FindFoodSortList',"")
    // })
    let foodList = {}
    return {
      foodList,
      // foodSortList: computed(() => {
      //   return getFoodSortModuleGetters['foodSortModule/getFoodSortList']
      // }),
    }
  },
})
</script>
