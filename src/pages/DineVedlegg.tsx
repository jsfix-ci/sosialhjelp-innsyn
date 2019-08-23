import React from 'react';
import {Panel} from "nav-frontend-paneler";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AvsnittBoks} from "../components/paneler/layoutKomponenter";
import {Vedlegg} from "../redux/innsynsdata/innsynsdataReducer";
import VedleggView from "../components/vedlegg/VedleggView";
import {FormattedMessage} from "react-intl";

const DineVedlegg: React.FC = () => {
    const mockVedlegg: Vedlegg[] = [
        {
            filnavn: "filnavn 1",
            url: "http://todo1",
            storrelse: 2342,
            beskrivelse: "Beskrivelse",
            datoLagtTil: "2018-10-11T13:42:00.134"
        },
        {
            filnavn: "filnavn 2",
            url: "http://todo2",
            storrelse: 23422,
            beskrivelse: "Beskrivelse",
            datoLagtTil: "2018-11-12T13:42:00.134"
        },
        {
            filnavn: "filnavn 3",
            url: "http://todo3",
            storrelse: 232,
            beskrivelse: "Beskrivelse",
            datoLagtTil: "2018-12-13T13:42:00.134"
        },
    ];
    return (
        <Panel className="vedlegg_liste_panel">
            <Innholdstittel className="layout_overskriftboks"><FormattedMessage id="vedlegg.tittel" /></Innholdstittel>
            <Normaltekst>
                <FormattedMessage id="vedlegg.ingress" />
            </Normaltekst>
            <AvsnittBoks>
                <Hovedknapp type="hoved"><FormattedMessage id="vedlegg.ettersend_knapptekst" /></Hovedknapp>
            </AvsnittBoks>
            <VedleggView vedlegg={ mockVedlegg } leserData={false}/>
        </Panel>
    );
};

export default DineVedlegg;


