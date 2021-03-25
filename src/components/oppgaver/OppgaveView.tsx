import React, {useState} from "react";
import {OppgaveListe} from "../../redux/innsynsdata/innsynsdataReducer";
import OppgaveElementView from "./OppgaveElementView";

interface Props {
    oppgave: OppgaveListe;
    oppgaveIndex: number;
}

const OppgaveView: React.FC<Props> = ({oppgave, oppgaveIndex}) => {
    const tittel = oppgave.oppgaveElementer.length > 0 && oppgave.oppgaveElementer[0].dokumenttype;

    const [overMaksStorrelse, setOverMaksStorrelse] = useState(false);

    return (
        <div>
            {oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                return (
                    <OppgaveElementView
                        key={oppgaveElementIndex}
                        oppgave={oppgaveElement}
                        oppgaveId={oppgave.oppgaveId}
                        oppgaveIndex={oppgaveIndex}
                        oppgaveElementIndex={oppgaveElementIndex}
                        setOverMaksStorrelse={() => false}
                    />
                );
            })}
        </div>
    );
};

export default OppgaveView;
