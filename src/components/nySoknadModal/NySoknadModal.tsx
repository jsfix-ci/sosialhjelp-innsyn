import React, {useState} from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {Knapp} from "nav-frontend-knapper";
import NavAutocomplete, {Suggestion} from "./navAutocomplete/NavAutcomplete";
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederIkon from "../ikoner/VeilederIkon";
import Lenke from "nav-frontend-lenker";
import useKommuneNrService from "./service/useKommuneNrService";
import useTilgjengeligeKommunerService, {
    finnTilgjengeligKommune,
    KommuneTilgjengelighet
} from "./service/useTilgjengeligeKommunerService";
import {tilgjengeligeKommunerBackup} from "./service/tilgjengeligKommuner";
import EnkelModal from "./EnkelModal";
import "./nySoknadModal.less"
import AdvarselIkon from "./AdvarselIkon";
import {REST_STATUS} from "../../utils/restUtils";

const sokPaaPapirUrl = "https://www.nav.no/sosialhjelp/slik-soker-du";

const NySoknadModal: React.FC<{ synlig: boolean, onRequestClose: () => void }> = ({synlig, onRequestClose}) => {

    const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
    const [soknadTilgjengelig, setSoknadTilgjengelig] = useState<boolean>(false)
    const [visFeilmelding, setVisFeilmelding] = useState<boolean | undefined>(false);
    const kommunerService = useKommuneNrService();
    const tilgjengeligeKommunerService = useTilgjengeligeKommunerService();

    const onSelect = (suggestion: Suggestion) => {
        if (tilgjengeligeKommunerService.restStatus === REST_STATUS.OK) {
            const kommune: KommuneTilgjengelighet|undefined = finnTilgjengeligKommune(tilgjengeligeKommunerService.payload.results, suggestion.key);
            setSoknadTilgjengelig(kommune !== undefined && kommune.kanMottaSoknader);
        } else {
            setSoknadTilgjengelig(tilgjengeligeKommunerBackup.includes(suggestion.key));
        }
        setCurrentSuggestion(suggestion);
    };

    const onClose = () => {
        onReset();
        onRequestClose();
    };

    const onButtonClick = (event: any) => {
        if (currentSuggestion && soknadTilgjengelig) {
            const soknadUrl = "/sosialhjelp/soknad/informasjon?kommuneId=" + currentSuggestion.key;
            window.location.href = soknadUrl;
        } else {
            setVisFeilmelding(true);
            event.preventDefault();
        }
    };

    const onReset = () => {
        setCurrentSuggestion(null);
        setVisFeilmelding(false);
        setSoknadTilgjengelig(false);
    };

    let fargetema: 'normal' | 'suksess' | 'advarsel' | 'feilmelding' = "normal";

    if (currentSuggestion) {
        fargetema = soknadTilgjengelig ? "suksess" : "advarsel";
    }

    return (
        <EnkelModal
            className="modal vedlegg_bilde_modal"
            isOpen={synlig}
            onRequestClose={() => onClose()}
            closeButton={true}
            contentLabel="Vedlegg"
            shouldCloseOnOverlayClick={true}
        >
            <div className={
                "nySoknadModal " + (currentSuggestion && !soknadTilgjengelig ? "nySoknadModal--soknadIkkeTilgjengeligAdvarsel" : "")
            }>
                <Veilederpanel
                    fargetema={fargetema}
                    svg={currentSuggestion && !soknadTilgjengelig ? <AdvarselIkon/> : <VeilederIkon/>}
                    type={"normal"}
                    kompakt={false}
                >
                    {currentSuggestion && soknadTilgjengelig && (
                        <>
                            <Undertittel className="nySoknadModal__tittel">
                                Du kan søke digitalt i {currentSuggestion.value} kommune.
                            </Undertittel>
                            <Normaltekst className="nySoknadModal__normaltekst">
                                Din kommune
                            </Normaltekst>
                        </>
                    )}
                    {currentSuggestion && !soknadTilgjengelig && (
                        <>
                            <Undertittel className="nySoknadModal__tittel">
                                {currentSuggestion.value} kommune kan ikke ta i mot digitale søknader ennå.
                                Du kan søke på papirskjema.
                            </Undertittel>
                            <Normaltekst className="nySoknadModal__normaltekst">
                                Din kommune
                            </Normaltekst>
                        </>
                    )}

                    {currentSuggestion === null && (
                        <>
                            <Undertittel className="nySoknadModal__tittel">
                                Sjekk om du kan søke digitalt i kommunen din
                            </Undertittel>
                            <Normaltekst className="nySoknadModal__normaltekst">
                                Din kommune
                            </Normaltekst>
                        </>
                    )}

                    {kommunerService.restStatus === REST_STATUS.OK && (
                        <NavAutocomplete
                            placeholder="Skriv kommunenavn"
                            suggestions={kommunerService.payload.results}
                            ariaLabel="Søk etter kommunenavn"
                            id="kommunesok"
                            onSelect={(suggestion: Suggestion) => onSelect(suggestion)}
                            onReset={() => onReset()}
                            feil={(visFeilmelding && currentSuggestion === null )?
                                "Du må skrive inn navnet på kommunen din før du kan gå videre" : undefined
                            }
                        />
                    )}

                    <div className="knappOgLenke">
                            <Knapp
                                type="hoved"
                                onClick={(event: any) => onButtonClick(event)}
                            >
                                Søk digital
                            </Knapp>
                            <Normaltekst>
                                <b><Lenke href={sokPaaPapirUrl}>Jeg skal ikke søke digitalt</Lenke></b>
                            </Normaltekst>

                    </div>
                </Veilederpanel>

            </div>

        </EnkelModal>
    );
};

export default NySoknadModal;
