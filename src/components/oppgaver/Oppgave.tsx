import React, {useState} from "react";
import {OppgaveInnhold} from "../../redux/innsynsdata/innsynsdataReducer";
import AddFile from "./AddFile";
import {FileError} from "../../utils/vedleggUtils";

interface Props {
    oppgave: OppgaveInnhold;
    setOverMaksStorrelse: (overMaksStorrelse: boolean) => void;
    oppgaveId: string;
}

const OppgaveView: React.FC<Props> = ({oppgave}) => {
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

export default OppgaveView;
