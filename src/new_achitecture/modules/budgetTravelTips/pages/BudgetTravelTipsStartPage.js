import React from 'react';
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import Cities from "../presentation/BTTStartComponent/CitiesComponent";
import GalleryDynamicComponent from "../presentation/BTTStartComponent/GalleryDynamicComp/GalleryDynamicComponent";
import GalleryComponent from "../presentation/BTTStartComponent/GalleryComponent";

const BudgetTravelTipsStartPage = () => {
    return (
        <div>
            <FindBudget/>
            <GalleryComponent/>
            <Cities/>
        </div>
    );
};

export default BudgetTravelTipsStartPage;