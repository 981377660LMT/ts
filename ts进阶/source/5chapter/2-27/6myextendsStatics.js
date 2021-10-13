
module.exports = extendStatics = (function (Son, Parent) {

  function getStaticExtendsWithForIn (Son, Parent) {
    for (let key in Parent) {
      if (Object.prototype.hasOwnProperty.call(Parent, key)) {
        Son[key] = Parent[key]
      }
    }
  }

  function getStaticExtendsWithObjectkeys (Son, Parent) {
    Object.keys(Parent).forEach((key) => {
      Son[key] = Parent[key]
    })
  }

  function getStaticExtendsWithProto (Son, Parent) {
    Son.__proto__ = Parent;
  }

  // let MyextendStatics = function (Son, Parent) {
  //   let func = Object.setPrototypeOf || getStaticExtendsWithForIn ||
  //getStaticExtendsWithObjectkeys
  //     || getStaticExtendsWithProto
  //   return func(Son, Parent)
  // }

  // let MyextendStatics = function (Son, Parent) {
  //   MyextendStatics = Object.setPrototypeOf || getStaticExtendsWithForIn ||
  //     getStaticExtendsWithObjectkeys || getStaticExtendsWithProto
  //   return MyextendStatics(Son, Parent)
  // }
  return function (Son, Parent) {
    let MyextendStatics = Object.setPrototypeOf || getStaticExtendsWithForIn ||
      getStaticExtendsWithObjectkeys || getStaticExtendsWithProto
    return MyextendStatics(Son, Parent)
  }
  return MyextendStatics

}())

//extendStatics(ChinesePeople, People)