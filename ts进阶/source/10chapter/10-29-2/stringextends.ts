import { RouteParameters } from './2RouteParamters'

type resultType = '/showFood/:foodname/:price' extends string ? string : number

type IRouterMatcher= <Route extends string,
    P = RouteParameters<Route>,
    ResBody = any,
    ReqBody = any,
    Locals extends Record<string, any> = Record<string, any>
    >(
    // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
    path: Route,
    // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
    // ...handlers: Array<RequestHandler<P, ResBody, ReqBody, Locals>>
)=>void

let get: IRouterMatcher = (path) => {

}

get("/showFood/:foodname/:price");