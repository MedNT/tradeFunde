import { createContext, useState, useContext, useEffect } from "react";
import { getAllAssets } from "../services/cryptoService";
import { getAllNews } from "../services/newsService";
import { useDispatch, useSelector } from "react-redux";
import { augmentBalance, clearFundDate } from "../store/features/main";


const AppContext = createContext({
    assets: [],
    fetchAssets: () => { return },
});


export const AppProvider = ({children}) => {

    const [assets, setAssets] = useState([]);
    const [news, setNews] = useState([]);

    const lastFundDate = useSelector((state) => state.main.lastFundDate);
    
    const dispatch = useDispatch();

    useEffect(() => {
        getNews();
        fetchAssets();
        eligibleForFund();
    }, []);

    function fetchAssets() {
        getAllAssets()
        .then(res => {
            setAssets(res.data);
        })
        .catch(err => console.log(err));
    }

    function getNews() {
        getAllNews()
        .then(res => {
            setNews(res.Data.splice(0, 20));
        })
        .catch(err => console.log(err));
    }

    function eligibleForFund() {
        // if one week has passed we give the user $10k
        if( Number(new Date()) >  lastFundDate) {
            dispatch(augmentBalance(10000));
        }
    }

    return (
        <AppContext.Provider value={
            {
                news,
                assets,
                fetchAssets
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = _ => useContext(AppContext);