export default interface List<T> {

  add(ele: T): void;
  get(index: number): T;
  size(): number;
  remove(value: T): T;



}