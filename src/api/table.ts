import request from '@/utils/system/request'

const local_port = 'http://127.0.0.1:5678'
// 获取数据api
export function getData(data: object) {
  return request({
    url: '/table/list',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 查询物流表接口
export function getData_Logistics(params: object) {
  console.log("api: 查询物流表\nparams:",params)
  return request({
    url: '/logistics',
    method: 'get',
    baseURL: local_port,
    params
  })
}

export function getData_Logistics_Key(params: object) {
  console.log("api: 查询物流表\nparams:",params)
  return request({
    url: '/search/logistics',
    method: 'get',
    baseURL: local_port,
    params
  })
}


// 查询订单表接口
export function getData_Orders(params: object) {
  console.log("api: 查询订单表\nparams:",params)
  return request({
    url: '/orders',
    method: 'get',
    baseURL: local_port,
    params
  })
}
export function getData_Orders_Key(params: object) {
  console.log("api: 查询订单表\nparams:",params)
  return request({
    url: '/search/orders',
    method: 'get',
    baseURL: local_port,
    params
  })
}


// 查询账单表接口
export function getData_Bills(params: object) {
  console.log("api: 查询账单表\nparams:",params)
  return request({
    url: '/bills',
    method: 'get',
    baseURL: local_port,
    params
  })
}
export function getData_Bills_Key(params: object) {
  console.log("api: 查询账单表\nparams:",params)
  return request({
    url: '/search/bills',
    method: 'get',
    baseURL: local_port,
    params
  })
}

// 获取分类数据
export function getCategory(data: object) {
  return request({
    url: '/table/category',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 获取树组织数据
export function getTree(data: object) {
  return request({
    url: '/table/tree',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 新增
export function add(data: object) {
  return request({
    url: '/table/add',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 新增物流表
export function add_Logistics(params: object) {
  console.log("api: 新增物流表\nparams:",params)
  return request({
    url: '/logistics',
    method: 'post',
    baseURL: local_port,
    params
  })
}

// 新增订单表表
export function add_Orders(params: object) {
  console.log("api: 新增订单表\nparams:",params)
  return request({
    url: '/orders',
    method: 'post',
    baseURL: local_port,
    params
  })
}

// 新增账单表
export function add_Bills(params: object) {
  console.log("api: 新增账单表\nparams:",params)
  return request({
    url: '/bills',
    method: 'post',
    baseURL: local_port,
    params
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: '/table/update',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 更新物流表
export function update__Logistics(params: object, id: string) {
  console.log("api: 更新物流表\nparams:",params)
  return request({
    url: '/logistics/'+id,
    method: 'put',
    baseURL: local_port,
    params
  })
}

// 更新订单表
export function update_Orders(params: object, id: string) {
  console.log("api: 更新订单表\nparams:",params)
  return request({
    url: '/orders/'+id,
    method: 'put',
    baseURL: local_port,
    params
  })
}

// 更新账单表
export function update_Bills(params: object, id: string) {
  console.log("api: 更新账单表\nparams:",params)
  return request({
    url: '/bills/'+id,
    method: 'put',
    baseURL: local_port,
    params
  })
}

// 删除
export function del(data: object) {
  return request({
    url: '/table/del',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 删除物流表
export function del_Logistics_Key(params: object) {
  console.log("api: 删除物流表\nparams:",params)
  return request({
    url: '/logistics/1',
    method: 'delete',
    baseURL: local_port,
    params
  })
}

// 删除订单表
export function del_Orders_Key(params: object) {
  console.log("api: 删除订单表\nparams:",params)
  return request({
    url: '/orders/1',
    method: 'delete',
    baseURL: local_port,
    params
  })
}


// 删除账单表
export function del_Bills_Key(params: object) {
  console.log("api: 删除账单表\nparams:",params)
  return request({
    url: '/bills/1',
    method: 'delete',
    baseURL: local_port,
    params
  })
}
