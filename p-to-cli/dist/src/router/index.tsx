import history from './history';
import { Route, Switch, Router, Redirect, withRouter, useHistory } from 'react-router-dom';
import {Suspense} from 'react';
// import Home from '../views/Home/';
// import Page1 from '../views/Page1/';
// import {Login} from '../views/Login/';

const RouterConfig:React.FC<RoutesFC> = ({routes: Routes}) => {
    return (
        <Router history={history}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {
                Routes.map((item, index) => {
                  const {component, path, name, routes=[], exact=false} = item;
                  let Com:any = component;
                  return (
                    <Route exact={exact} path={path} key={index}>
                      <Com name={name} routes={routes}></Com>
                    </Route>
                  )
                })
              }
                {/* <Route exact path='/'>
                    <Redirect to='/home'></Redirect>
                </Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/page1">
                    {withRouter(Page1)}
                </Route>
                <Route path="*">
                    <>页面暂无~</>
                </Route> */}
            </Switch>
          </Suspense>
        </Router>
    )
}

export default RouterConfig;
