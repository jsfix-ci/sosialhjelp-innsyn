import {useEffect, useState} from "react";
import {erDevMiljo, Service} from "./Service";

export interface TilgjengeligeKommuner {
    results: string[];
}

const useTilgjengeligeKommunerService = () => {
    const [result, setResult] = useState<Service<TilgjengeligeKommuner>>({
        status: 'loading'
    });

    let url = "/sosialhjelp/soknad-api/informasjon/tilgjengelige_kommuner";
    if (erDevMiljo()) {
        url = "https://cors-anywhere.herokuapp.com/https://www.nav.no/sosialhjelp/soknad-api/informasjon/tilgjengelige_kommuner";
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: {results: response} }))
            .catch(error => setResult({ status: 'error', error }));
    }, [url]);
    return result;
};

export default useTilgjengeligeKommunerService;
