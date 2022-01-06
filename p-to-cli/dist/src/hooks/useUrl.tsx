import { useLocation } from 'react-router-dom';


export default function useUrl() {
    let location = useLocation();
    let search = location.search.match(/([^&^\?])+/g), query = {};
    if(search && search.length !== 0) {
        search.forEach(item => {
            if(/^([^=]+)=(.+)$/.test(item)) {
                query[RegExp.$1] = RegExp.$2;
            }
        });
    }
    return {...location, query};
}