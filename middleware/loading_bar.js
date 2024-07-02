export default function ({store, route, $axios, redirect, req}) {
    console.log('全局中间件执行了');
    console.log(route)
}
