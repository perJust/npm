import RouterSetting from '@/router/';

const Home:React.FC<RoutesFC> = ({routes}) => {
    return (
        <div className="w-full of-auto h-full">
            <RouterSetting routes={routes}></RouterSetting>
        </div>
    )
}

export default Home;