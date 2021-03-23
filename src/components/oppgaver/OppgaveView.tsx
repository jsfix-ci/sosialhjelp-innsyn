import React from "react";
import {OppgaveListe} from "../../redux/innsynsdata/innsynsdataReducer";
import Oppgave from "./Oppgave";
import {getVisningstekster} from "../../utils/vedleggUtils";

interface Props {
    oppgave: OppgaveListe;
}

const OppgaveView: React.FC<Props> = ({oppgave}) => {
    return (
        <div>
            {oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                return <Oppgave key={oppgaveElementIndex} oppgave={oppgaveElement} oppgaveId={oppgave.oppgaveId} />;
            })}
        </div>
    );
};

export default OppgaveView;
