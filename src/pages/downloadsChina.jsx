import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../components/store/Store';

import Loading from '../components/loading/loading.component';
import { LinearScale } from 'chart.js';





function DownloadChina(props) {

    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useContext(Context);
    const [commodityList, setCommodityList] = useState([]);
    const [APILinks, setAPILinks] = useState({});


    useEffect(() => {
        axios.get(`${state.api}/china/commodities`)
        .then(res => {
            res.data.sort();
            setCommodityList(res.data);
            var linksArray = {};
            for (const commodity of res.data){
                console.log(commodity);
                let newCommodity = commodity.replace(/ /g, "+");
                axios.get(`${state.api}/s3/retrieves3link/China/` + newCommodity)
                .then(res => {
                    // console.log(linksArray);
                    linksArray[commodity] = res.data.url;
                }, (error) => {
                    console.log(error);
                });
            }
            
            console.log(linksArray);
            setAPILinks(linksArray);
            setLoading(false);
        }, (error) => {
          console.log(error);
        });
    },[])

    useEffect(() => {
        console.log(commodityList);
        console.log(APILinks);
      }, [APILinks])
  
    return (
      <>
        {
            loading ?
            (
                <Loading />
            )
            :
            (
                Object.keys(APILinks).map(k => (
                    <li
                     key={k}
                    ><strong>{k}</strong>: {APILinks[k]}</li>
                    )
                )
            )
            
        }
      </>
    )
  }
  
  export default DownloadChina;