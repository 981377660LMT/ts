// dataFlowAnalysisWithNever 方法穷尽了 DataFlow 的所有可能类型。 
// 使用 never 避免出现未来扩展新的类没有对应类型的实现, 目的就是写出类型绝对安全的代码。
type DataFlow = string | number
function dataFlowAnalysisWithNever(dataFlow: DataFlow) {
 
  if (typeof dataFlow === "string") {
    console.log("字符串类型:", dataFlow.length);
  } else if (typeof dataFlow === "number") {
    console.log("数值类型:", dataFlow.toFixed(2));
  }else{
    let data=dataFlow
  }
}
dataFlowAnalysisWithNever("免税店")
dataFlowAnalysisWithNever(3.199923)
