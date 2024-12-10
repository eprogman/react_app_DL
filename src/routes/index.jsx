import { Link } from "react-router-dom";


const Index = () => {

    return (
        <p id="zero-state">
            E & M.
            <br />
            Check out{" "}
            <Link to="https://doctorlabs.com.pe/" target="_blank">
                the page doctorlabs.com
            </Link>
            .
        </p>
    );
}

export default Index