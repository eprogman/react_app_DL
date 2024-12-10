import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="error">
            <h1>Error!</h1>
            <p>Ha ocurrido.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}