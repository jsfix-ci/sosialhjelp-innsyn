import React, {useState} from "react";
import {OppgaveInnhold} from "../../redux/innsynsdata/innsynsdataReducer";
import AddFile from "./AddFile";
import {FileError} from "../../utils/vedleggUtils";

interface Props {
    oppgave: OppgaveInnhold;
    oppgaveId: string;
    oppgaveIndex: number;
    oppgaveElementIndex: number;
    setOverMaksStorrelse: (overMaksStorrelse: boolean) => void;
}

const OppgaveElementView: React.FC<Props> = ({
    oppgave,
    oppgaveId,
    oppgaveIndex,
    oppgaveElementIndex,
    setOverMaksStorrelse,
}) => {
    const [listeMedFilerSomFeiler, setListeMedFilerSomFeiler] = useState<Array<FileError>>([]);

    console.log(oppgave);
    return (
        <div className={"oppgaver_detalj"}>
            {oppgave.dokumenttype}
            {oppgave.tilleggsinformasjon}

            <AddFile
                title={oppgave.dokumenttype}
                description={oppgave.tilleggsinformasjon}
                oppgaveElement={oppgave}
                internalIndex={oppgaveElementIndex}
                externalIndex={oppgaveIndex}
                setListWithFilesWithErrors={setListeMedFilerSomFeiler}
                setAboveMaxSize={setOverMaksStorrelse}
            />
        </div>
    );
};
export default OppgaveElementView;
