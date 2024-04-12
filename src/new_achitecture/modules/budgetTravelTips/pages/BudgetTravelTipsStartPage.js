import React from 'react';
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import Cities from "../presentation/BTTStartComponent/CitiesComponent";
import GalleryDynamicComponent from "../presentation/BTTStartComponent/GalleryDynamicComp/GalleryDynamicComponent";

const BudgetTravelTipsStartPage = () => {
    return (
        <div>
            <FindBudget/>
            <GalleryDynamicComponent/>
            <Cities/>
        </div>
    );
};

export default BudgetTravelTipsStartPage;