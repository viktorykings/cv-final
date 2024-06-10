import { Outlet } from "react-router-dom";

const PagesLayout = () => {
    return ( 
        <div>
            breadcrumbs
            <Outlet />
        </div>
    );
}
export default PagesLayout;