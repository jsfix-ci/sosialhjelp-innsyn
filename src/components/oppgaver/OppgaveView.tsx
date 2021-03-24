import React from "react";
import {OppgaveListe} from "../../redux/innsynsdata/innsynsdataReducer";
import {getVisningstekster} from "../../utils/vedleggUtils";
import OppgaveElementView from "./OppgaveElementView";

interface Props {
    oppgave: OppgaveListe;
}

const OppgaveView: React.FC<Props> = ({oppgave}) => {
    return (
        <div>
            {oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                return (
                    <OppgaveElementView
                        key={oppgaveElementIndex}
                        oppgave={oppgaveElement}
                        oppgaveId={oppgave.oppgaveId}
                    />
                );
            })}
        </div>
    );
};

export default OppgaveView;
