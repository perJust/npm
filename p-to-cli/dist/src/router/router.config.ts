import React, {lazy} from 'react';
import Home from '../views/home/';

import ErrPage from '@/views/err-page';
const Demo1 = lazy(
  () => import('@/views/home/demo1'),
);
const Routes: RouteConfig[] = [
    {
        path: '/home',
        name: 'Home',
        exact: false,
        component: Home,
        routes: [
          {
            path: '/home/demo1',
            name: 'Home',
            exact: false,
            component: Demo1,
          },
        ]
    },
    {
        path: '*',
        name: 'ErrPage',
        component: ErrPage
    }
];


export {Routes}