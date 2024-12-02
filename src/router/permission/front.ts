/**
 * 前端路由管理
 **/

/** 路由类型 */
import type { Route } from '../index.type'

/** 引入需要权限的Modules */
import Dashboard from '../modules/dashboard'
import Information from '../modules/information'
import OrderTable from "../modules/orderTable";
import LogisticTable from "../modules/logisticTable";
import BillTable from "../modules/billTable";
import Document from '../modules/document'
import Pages from '../modules/pages'
import Menu from '../modules/menu'
import Component from '../modules/component'
import Directive from '../modules/directive'
import SystemManage from '../modules/systemManage'
import Chart from '../modules/chart'
import Print from '../modules/print'
import Community from '../modules/community'
import Tab from '../modules/tab'

/** 登录后需要动态加入的本地路由 */
const FrontRoutes: Route[] = [];

// 获取当前用户角色
const userName = localStorage.getItem('user');

// 定义不同角色对应的路由
const AdminRoutes: Route[] = [
  ...Dashboard,
  ...Information,
  ...LogisticTable,
  ...OrderTable,
  ...BillTable,
  ...SystemManage,
  // 管理员特有路由
];

const UserRoutes: Route[] = [
  ...LogisticTable,
  // 用户特有路由
];

const MerchantRoutes: Route[] = [
  ...OrderTable,
  // 商家特有路由
];

const CourierRoutes: Route[] = [
  ...LogisticTable,
  // 快递员特有路由
];

const CompanyRoutes: Route[] = [
  ...LogisticTable,
  ...BillTable
  // 快递员特有路由
];

// 根据 userName 动态设置路由
switch (userName) {
  case 'admin':
    FrontRoutes.push(...AdminRoutes);
    break;
  case 'user':
    FrontRoutes.push(...UserRoutes);
    break;
  case 'merchant':
    FrontRoutes.push(...MerchantRoutes);
    break;
  case 'courier':
    FrontRoutes.push(...CourierRoutes);
    break;
  case 'company':
    FrontRoutes.push(...CompanyRoutes);
    break;
  default:
    console.warn('未知用户角色:', userName);
    break;
}
// /** 登录后需要动态加入的本地路由 */
// const FrontRoutes: Route[] = [
//   ...Dashboard,
//   ...Information,
//   ...LogisticTable,
//   ...OrderTable,
//   ...billTable,
//   ...SystemManage,
//   // ...Pages,
//   // ...Document,
//   // ...Component,
//   // ...Menu,
//   // ...Directive,
//   // ...Chart,
//   // ...Print,
//   // ...Community,
//   // ...Tab,
// ]

export default FrontRoutes
