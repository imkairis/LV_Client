import AgeGroup from "./shopBy/AgeGroup";
import Category from "./shopBy/Category";
import Targets from "./shopBy/Target";

const ShopSideNav = () => {
    return (
        <div className='w-full flex flex-col gap-6'>
            <Category icons={false} />
            <AgeGroup />
            <Targets />
        </div>
    );
};

export default ShopSideNav;
