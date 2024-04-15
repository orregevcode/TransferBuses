import React from 'react';
import cities_json from '../../data/cities-fullList.json';
import styles from './CitiesComponent.module.css';
import {BASE_REDIRECT_URL} from "../../data/constants";
import {Link} from "react-router-dom";
import {TRAVEL_TIPS_DESCRIPTION} from "../../../trip_search/domain/entites/utils/constants/constants";
import {Container} from "@material-ui/core";

const Cities = () => {
    const sortCities = cities_json.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    const createRedirectURL = (name) => {
        return BASE_REDIRECT_URL + name.toLowerCase().replace(/[\s-]/g, '_');
    }

    return (
        <div>
            <hr className={styles.ruler}/>
            <div className={styles.cityHeader}>Choose a city</div>
            <hr className={styles.ruler}/>
            <div>
                <ul className={styles.cityList}>
                    {sortCities.map((item, key) => (
                        <li className={styles.list} key={key}>
                            <a className={styles.anchor}
                               href={`${createRedirectURL(item.name)}`}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

            {/*<div className={styles.mainContainer}>*/}
                
            </div>
    );
};
export default Cities;