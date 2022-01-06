import RouterSetting from '../../router/';
import {Routes} from '../../router/router.config';
import Styled from 'styled-components';

const HeadStyle = Styled.div`
    height: 70px;
    width: 100%;
    background-color: blue;
`
const SideNavStyle = Styled.div`
    height: 100%;
    width: 280px;
    background-color: orange;
`
const ContentStyle = Styled(RouterSetting)`
    background-color: #F5F5F5;
    padding: 10px;
    height: 100%;
    flex: 1;
`
const Layout:React.FC<any> = () => {
    return (
        <div className="w-full h-full ub ub-col">
            {/* <HeadStyle></HeadStyle>
            <div className="ub-f1 w-full ub ub-nowrap">
                <SideNavStyle></SideNavStyle> */}
                <ContentStyle routes={Routes}></ContentStyle>
            {/* </div> */}
        </div>
    )
}

export default Layout;