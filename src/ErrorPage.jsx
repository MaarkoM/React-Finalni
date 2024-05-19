import { useRouteError } from "react-router-dom";
import "./ErrorPage.css"
import  Astronaut from "./assets/astronaut.svg"
import Cloud from './assets/speechCloud.svg'

function ErrorPage(){
    const error = useRouteError();
    console.error(error);

    return(
        <div id="errorPage">
            <div className="errorText">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            </div>
            <img src={Cloud} alt="Speech cloud image"  className="cloud"/>
            <img src={Astronaut} alt="Astronaut image"  className="astronaut"/>
        </div>
    );
    }

export default ErrorPage;