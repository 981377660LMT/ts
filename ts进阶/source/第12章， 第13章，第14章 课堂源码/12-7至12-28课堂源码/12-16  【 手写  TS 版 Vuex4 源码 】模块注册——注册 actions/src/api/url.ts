import { get } from './axiosdata'
// 模拟错误 在getFoodList多增加一个s 查看页面显示错误的同时
// 会出现loading... 可以看到当页面加载还没有完成时,
// 会显示#fallback 模板中的内容
{/* <Suspense>
<template #default>
  <ListSuspense />
</template>
<template #fallback>
  <!--List加载完成之前执行的模板-->
  <div>loading...</div>
</template>
</Suspense> */}
export function getFoodList() {
  return get('http://localhost:5001/productdetailarrall')
}
// interface API {
//   "http://localhost:5001/ProductDetailInfo/":
//   [{ name: string; age: number; phone: string }];
//   // "/seals": { seal: Seal[] };
// }
// export function getFoodDetailAPI<URL extends keyof API>(url: URL, productId: any):
//   Promise<API[URL]> {
//   return get(`http://localhost:5001/ProductDetailInfo/${productId}`)
// }
// const api = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
//   return fetch(url).then((res) => res.json())
// };
export function getFoodDetail(productId: any) {
  return get(`http://localhost:5001/ProductDetailInfo/${productId}`)
}

export function getFooterData() {
  return get(`http://localhost:5001/getFooterData`)
}


export function getSearchHistoryData() {
  return get(`http://localhost:5001/searchhistory`)
}


export function getSearchFoodHistoryData() {
  return get(`http://localhost:5001/productdetailarrall`)
}