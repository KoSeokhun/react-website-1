import React from 'react';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";

function Scraping() {
    const dispatch = useDispatch();
    let dataToSubmit = null;

    const scraping = () => {
        dispatch(fetchData())
            .then(response => {
                if (response.payload.fetchSuccess) {
                    const data = response.payload.data
                    console.log('GOOD');
                    console.log(data[0]);
                } else if (response.payload.testSuccess) {
                    console.log('TEST GOOD');
                } else {
                    console.log('ㅠㅠ');
                }
            })
    }

    return scraping();
}
export default Scraping;