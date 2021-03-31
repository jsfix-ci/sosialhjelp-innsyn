import {Fil, DokumentasjonEtterspurtElement} from "../../redux/innsynsdata/innsynsdataReducer";
import React, {useEffect, useState} from "react";
import {
    isFileErrorsNotEmpty,
    alertUser,
    writeErrorMessage,
    FileError,
    getValidationErrors,
} from "../../utils/vedleggUtils";
import {useSelector} from "react-redux";
import {InnsynAppState} from "../../redux/reduxTypes";
import FilView from "./FilView";
import AddFile from "./AddFile";
import {ErrorMessageList} from "./ReturnErrorMessage";

const DokumentasjonEtterspurtElementView: React.FC<{
    typeTekst: string;
    tilleggsinfoTekst: string | undefined;
    oppgaveElement: DokumentasjonEtterspurtElement;
    oppgaveElementIndex: number;
    oppgaveIndex: number;
    oppgaveId: string;
    setOverMaksStorrelse: (overMaksStorrelse: boolean) => void;
}> = ({
    typeTekst,
    tilleggsinfoTekst,
    oppgaveElement,
    oppgaveElementIndex,
    oppgaveIndex,
    oppgaveId,
    setOverMaksStorrelse,
}) => {
    const [listeMedFilerSomFeiler, setListeMedFilerSomFeiler] = useState<Array<FileError>>([]);

    const oppgaveVedlegsOpplastingFeilet: boolean = useSelector(
        (state: InnsynAppState) => state.innsynsdata.oppgaveVedlegsOpplastingFeilet
    );

    useEffect(() => {
        if (oppgaveElement.filer && oppgaveElement.filer.length > 0) {
            window.addEventListener("beforeunload", alertUser);
        }
        return function unload() {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, [oppgaveElement.filer]);

    const visOppgaverDetaljeFeil: boolean = oppgaveVedlegsOpplastingFeilet || listeMedFilerSomFeiler.length > 0;
    return (
        <div className={"oppgaver_detalj" + (visOppgaverDetaljeFeil ? " oppgaver_detalj_feil" : "")}>
            <AddFile
                title={typeTekst}
                description={tilleggsinfoTekst}
                oppgaveElement={oppgaveElement}
                internalIndex={oppgaveElementIndex}
                externalIndex={oppgaveIndex}
                setListWithFilesWithErrors={setListeMedFilerSomFeiler}
                setAboveMaxSize={setOverMaksStorrelse}
            />

            {oppgaveElement.filer &&
                oppgaveElement.filer.length > 0 &&
                oppgaveElement.filer.map((fil: Fil, vedleggIndex: number) => (
                    <FilView
                        key={vedleggIndex}
                        fil={fil}
                        oppgaveElement={oppgaveElement}
                        vedleggIndex={vedleggIndex}
                        oppgaveElementIndex={oppgaveElementIndex}
                        oppgaveIndex={oppgaveIndex}
                        setOverMaksStorrelse={setOverMaksStorrelse}
                        oppgaveId={oppgaveId}
                    />
                ))}
            {isFileErrorsNotEmpty(listeMedFilerSomFeiler) &&
                ErrorMessageList(getValidationErrors(listeMedFilerSomFeiler))}
        </div>
    );
};

export default DokumentasjonEtterspurtElementView;
