declare module '*.less' {
  const resource: { [key: string]: string };
  export default resource;
}
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '@antv/g6'