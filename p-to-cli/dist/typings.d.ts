declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jsx';
declare module '*.js';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
