import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import NavBar from "../components/NavBar/NavBar";
import Store from "../Store";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Provider store={Store}>
            <div className={'app'}>
                <NavBar/>
                <div className={'main'}>
                    <Component {...pageProps} />
                </div>
            </div>
        </Provider>
    </>
}

export default MyApp
