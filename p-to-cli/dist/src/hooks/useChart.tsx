import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

interface OptionsProps<T> {
  params?: T;
  handleFn?: (d: any) => { [key: string]: any };
  refreshDeps?: any[];
}
/**
 * @method useChart
 * @param service 请求数据的方法
 * @param options.params 请求数据的传参
 * @param options.handleFn 处理得到数据的方法 返回option
 * @param options.refreshDeps 收集需要依赖更新的集合
 * @return [option, loadingStatus, setParams]
 */
export default function useChart<T>(
  service: (p?: T) => Promise<any>,
  { params: p, handleFn, refreshDeps = [] }: OptionsProps<T>,
) {
  const [params, setParams] = useState<T | undefined>(p);
  const { data, error, loading, run, cancel } = useRequest(
    (reqParams) => {
      // return axios.get(httpUrl, params);
      // return Promise.resolve({ data: [] });
      return service(params);
    },
    {
      manual: true,
      formatResult: (res) => res.content,
    },
  );

  useEffect(() => {
    run(params);
    return () => {
      cancel();
    };
  }, [params, ...refreshDeps]); // 传参改变  重新请求

  let option = {};
  const [chartOpt, setChartOpt] = useState<{ [key: string]: any }>(option);
  useEffect(() => {
    if (data && handleFn) {
      setChartOpt(() => {
        return handleFn(data);
      });
    }
  }, [data]); // 数据改变  重新渲染chart

  return { chartOpt, loading, setParams };
}
