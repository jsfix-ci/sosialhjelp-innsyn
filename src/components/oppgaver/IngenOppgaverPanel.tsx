import * as React from "react";
import {FormattedMessage} from "react-intl";
import {
    DokumentasjonEtterspurt,
    DokumentasjonKrav,
    SaksStatusState,
    Vilkar,
} from "../../redux/innsynsdata/innsynsdataReducer";
import {BodyShort, Label, Panel} from "@navikt/ds-react";
import styled from "styled-components/macro";
import {Attachment, Task} from "@navikt/ds-icons";
import {useSelector} from "react-redux";
import {InnsynAppState} from "../../redux/reduxTypes";
import {harSakMedInnvilgetEllerDelvisInnvilget} from "../vilkar/VilkarUtils";

const StyledPanel = styled(Panel)`
    margin-top: 1.5rem;
    margin-bottom: 0 !important;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 20px 12px;
`;

interface Props {
    dokumentasjonEtterspurt: DokumentasjonEtterspurt[] | null;
    dokumentasjonkrav: DokumentasjonKrav[];
    vilkar: Vilkar[];
    leserData: boolean | undefined;
}

const IngenOppgaverPanel: React.FC<Props> = ({dokumentasjonkrav, vilkar, dokumentasjonEtterspurt, leserData}) => {
    const innsynSaksStatusListe: SaksStatusState[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.saksStatus
    );
    const finnesOppgaver = (oppgaveArray: any) => {
        return oppgaveArray && Array.isArray(oppgaveArray) && oppgaveArray.length > 0;
    };

    const harLevertDokumentasjonkrav: Boolean = useSelector(
        (state: InnsynAppState) => state.innsynsdata.harLevertTidligereDokumentasjonkrav
    );

    const fagsystemHarDokumentasjonkrav: Boolean = useSelector(
        (state: InnsynAppState) => state.innsynsdata.fagsystemHarDokumentasjonkrav
    );

    const skalViseIngenOppgaverPanel = () => {
        const harOppgaver =
            finnesOppgaver(dokumentasjonEtterspurt) || finnesOppgaver(dokumentasjonkrav) || finnesOppgaver(vilkar);
        const harSaker = innsynSaksStatusListe && innsynSaksStatusListe.length > 0;
        return (
            !harOppgaver &&
            ((harLevertDokumentasjonkrav && harSakMedInnvilgetEllerDelvisInnvilget(innsynSaksStatusListe)) ||
                (fagsystemHarDokumentasjonkrav && harSakMedInnvilgetEllerDelvisInnvilget(innsynSaksStatusListe)) ||
                !harSakMedInnvilgetEllerDelvisInnvilget(innsynSaksStatusListe) ||
                !harSaker)
        );
    };

    if (skalViseIngenOppgaverPanel() && !leserData) {
        return (
            <StyledPanel>
                <>
                    <Task width="1.5rem" height="1.5rem" style={{marginTop: "6px"}} />
                    <div>
                        <Label as="p">
                            <FormattedMessage id="oppgaver.ingen_oppgaver" />
                        </Label>
                        <BodyShort>
                            <FormattedMessage id="oppgaver.beskjed" />
                        </BodyShort>
                    </div>
                </>
                <>
                    <Attachment width="1.5rem" height="1.5rem" style={{marginTop: "6px"}} />
                    <div>
                        <Label as="p">
                            <FormattedMessage id="oppgaver.andre_dokumenter" />
                        </Label>
                        <BodyShort>
                            <FormattedMessage id="oppgaver.andre_dokumenter_beskjed" />
                        </BodyShort>
                    </div>
                </>
            </StyledPanel>
        );
    }
    return null;
};

export default IngenOppgaverPanel;
