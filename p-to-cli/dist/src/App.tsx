import './styles/reset.less';
import './styles/global.less';
import './styles/chunk.less';
import zhCN from 'antd/lib/locale/zh_CN';
import Layout from './components/container/Layout';
import history from '@/router/history';
import { Routes } from './router/router.config';
import { useSessionStorageState, useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { deepCopy } from '@/utils';
import {ConfigProvider} from 'antd';

const App:React.FC = () => {
  return (
    <div className="w-full h-full">
      <ConfigProvider locale={zhCN}>
        <Layout></Layout>
      </ConfigProvider>
    </div>
  )
}

export default App;
