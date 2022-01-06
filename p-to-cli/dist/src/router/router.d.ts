interface RProps {
  children: React.ReactNode;
}
/**
 * 路由配置项
 * @param {string} path 路由路径
 * @param {string} name 路由英文名
 * @param {string} cnName 路由中文名
 * @param {boolean} exact 是否精确匹配路由
 * @param {boolean} isAuth 是否有权限
 * @param {JSX} component 组件
 * @param {RouteConfig} routes 下级路由
 */
interface RouteConfig {
  path: string;
  name: string;
  cnName?: string;
  exact?: boolean;
  isAuth?: boolean;
  component?: React.ReactNode;
  routes?: RouteConfig[];
}
