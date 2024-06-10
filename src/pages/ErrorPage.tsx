import {
    isRouteErrorResponse,
    useNavigate,
    useRouteError,
} from "react-router-dom";
import {Paths} from '../routes/paths';

export default function ErrorPage() {
    const error = useRouteError() as Error;
    const navigate = useNavigate();
    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{error.data}</p>
            <button onClick={() => navigate(Paths.USERS)}>&larr; Go back</button>
        </div>
    );
}