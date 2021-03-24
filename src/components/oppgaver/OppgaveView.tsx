import React, {useState} from "react";
import {OppgaveListe} from "../../redux/innsynsdata/innsynsdataReducer";
import OppgaveElementView from "./OppgaveElementView";

interface Props {
    oppgave: OppgaveListe;
    oppgaveIndex: number;
}

const OppgaveView: React.FC<Props> = ({oppgave, oppgaveIndex}) => {
    const [_, setOverMaksStorrelse] = useState(false);
    setOverMaksStorrelse(false);

    return (
        <div>
            {oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                return (
                    <div>oppgaveIndex</div>
                    // <OppgaveElementView
                    //     key={oppgaveElementIndex}
                    //     oppgave={oppgaveElement}
                    //     oppgaveIndex={oppgaveIndex}
                    //     oppgaveElementIndex={oppgaveElementIndex}
                    //     oppgaveId={oppgave.oppgaveId}
                    //     setOverMaksStorrelse={setOverMaksStorrelse}
                    // />
                );
            })}
        </div>
    );
};

export default OppgaveView;
