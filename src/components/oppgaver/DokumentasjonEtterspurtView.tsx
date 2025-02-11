import React, {useState} from "react";
import {
    DokumentasjonEtterspurt,
    DokumentasjonEtterspurtElement,
    Fil,
    InnsynsdataActionTypeKeys,
    InnsynsdataSti,
    KommuneResponse,
    settRestStatus,
} from "../../redux/innsynsdata/innsynsdataReducer";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {InnsynAppState} from "../../redux/reduxTypes";
import {isFileUploadAllowed} from "../driftsmelding/DriftsmeldingUtilities";
import {antallDagerEtterFrist} from "./Oppgaver";
import {formatDato} from "../../utils/formatting";
import {
    createFormDataWithVedleggFromOppgaver,
    getVisningstekster,
    hasNotAddedFiles,
    oppgaveHasFilesWithError,
} from "../../utils/vedleggUtils";
import {fetchPost, fetchPostGetErrors, REST_STATUS} from "../../utils/restUtils";
import DokumentasjonEtterspurtElementView from "./DokumentasjonEtterspurtElementView";
import {
    hentInnsynsdata,
    hentOppgaveMedId,
    innsynsdataUrl,
    setFileUploadFailed,
    setFileUploadFailedInBackend,
    setFileUploadFailedVirusCheckInBackend,
} from "../../redux/innsynsdata/innsynsDataActions";
import {logInfoMessage, logWarningMessage} from "../../redux/innsynsdata/loggActions";
import {
    fileUploadFailedEvent,
    logButtonOrLinkClick,
    logDuplicationsOfUploadedAttachmentsForDokEtterspurt,
} from "../../utils/amplitude";
import {BodyShort, Button, Loader} from "@navikt/ds-react";
import {ErrorMessage} from "../errors/ErrorMessage";
import styled from "styled-components";

interface Props {
    dokumentasjonEtterspurt: DokumentasjonEtterspurt;
    oppgaverErFraInnsyn: boolean;
    oppgaveIndex: any;
}

const ButtonWrapper = styled.div`
    margin-top: 1rem;
`;

const DokumentasjonEtterspurtView: React.FC<Props> = ({dokumentasjonEtterspurt, oppgaverErFraInnsyn, oppgaveIndex}) => {
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);

    logDuplicationsOfUploadedAttachmentsForDokEtterspurt(dokumentasjonEtterspurt, oppgaveIndex);

    const listeOverDokumentasjonEtterspurtIderSomFeilet: string[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.listeOverOpggaveIderSomFeilet
    );
    const listeOverDokumentasjonEtterspurtIderSomFeiletPaBackend: string[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.listeOverOppgaveIderSomFeiletPaBackend
    );
    const listeOverDokumentasjonEtterspurtIderSomFeiletIVirussjekkPaBackend: string[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.listeOverOppgaveIderSomFeiletIVirussjekkPaBackend
    );

    let kommuneResponse: KommuneResponse | undefined = useSelector(
        (state: InnsynAppState) => state.innsynsdata.kommune
    );
    const kanLasteOppVedlegg: boolean = isFileUploadAllowed(kommuneResponse);

    const opplastingFeilet = oppgaveHasFilesWithError(dokumentasjonEtterspurt.oppgaveElementer);

    let antallDagerSidenFristBlePassert = antallDagerEtterFrist(new Date(dokumentasjonEtterspurt.innsendelsesfrist!!));

    const fiksDigisosId: string | undefined = useSelector((state: InnsynAppState) => state.innsynsdata.fiksDigisosId);

    const [overMaksStorrelse, setOverMaksStorrelse] = useState(false);

    const visDokumentasjonEtterspurtDetaljeFeiler: boolean =
        listeOverDokumentasjonEtterspurtIderSomFeilet.includes(dokumentasjonEtterspurt.oppgaveId) ||
        opplastingFeilet !== undefined ||
        overMaksStorrelse ||
        listeOverDokumentasjonEtterspurtIderSomFeiletPaBackend.includes(dokumentasjonEtterspurt.oppgaveId) ||
        listeOverDokumentasjonEtterspurtIderSomFeiletIVirussjekkPaBackend.includes(dokumentasjonEtterspurt.oppgaveId);

    const onSendClicked = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!fiksDigisosId || overMaksStorrelse) {
            return;
        }
        setIsUploading(true);
        const path = innsynsdataUrl(fiksDigisosId, InnsynsdataSti.VEDLEGG);
        const formData = createFormDataWithVedleggFromOppgaver(dokumentasjonEtterspurt);

        const noFilesAdded = hasNotAddedFiles(dokumentasjonEtterspurt);
        dispatch(setFileUploadFailed(dokumentasjonEtterspurt.oppgaveId, noFilesAdded));

        if (noFilesAdded) {
            dispatch(settRestStatus(InnsynsdataSti.OPPGAVER, REST_STATUS.FEILET));
            logInfoMessage("Validering vedlegg feilet: Ingen filer valgt");
            setIsUploading(false);
            event.preventDefault();
            return;
        }

        const handleFileWithVirus = () => {
            fileUploadFailedEvent("vedlegg.opplasting_backend_virus_feilmelding");
            setIsUploading(false);
            dispatch(setFileUploadFailedInBackend(dokumentasjonEtterspurt.oppgaveId, false));
            dispatch(setFileUploadFailedVirusCheckInBackend(dokumentasjonEtterspurt.oppgaveId, true));
        };
        const handleFileUploadFailed = () => {
            fileUploadFailedEvent("vedlegg.opplasting_feilmelding");
            setIsUploading(false);
            dispatch(settRestStatus(InnsynsdataSti.OPPGAVER, REST_STATUS.FEILET));
            dispatch(setFileUploadFailedInBackend(dokumentasjonEtterspurt.oppgaveId, true));
        };
        const onSuccessful = () => {
            fetchPost(path, formData, "multipart/form-data")
                .then((fileResponse: any) => {
                    let hasError: boolean = false;
                    if (Array.isArray(fileResponse)) {
                        fileResponse.forEach((response) => {
                            response.filer.forEach((fil: Fil, index: number) => {
                                if (fil.status !== "OK") {
                                    hasError = true;
                                }
                                dispatch({
                                    type: InnsynsdataActionTypeKeys.SETT_STATUS_FOR_FIL,
                                    fil: {filnavn: fil.filnavn} as Fil,
                                    status: fil.status,
                                    innsendelsesfrist: response.innsendelsesfrist,
                                    dokumenttype: response.type,
                                    tilleggsinfo: response.tilleggsinfo,
                                    vedleggIndex: index,
                                });
                            });
                        });
                    }
                    if (hasError) {
                        dispatch(settRestStatus(InnsynsdataSti.OPPGAVER, REST_STATUS.FEILET));
                    } else {
                        dispatch(hentInnsynsdata(fiksDigisosId, InnsynsdataSti.HENDELSER));
                        dispatch(hentInnsynsdata(fiksDigisosId, InnsynsdataSti.VEDLEGG));
                        dispatch(
                            hentOppgaveMedId(fiksDigisosId, InnsynsdataSti.OPPGAVER, dokumentasjonEtterspurt.oppgaveId)
                        );
                    }
                    setIsUploading(false);
                })
                .catch((e) => {
                    dispatch(hentInnsynsdata(fiksDigisosId, InnsynsdataSti.SAKSSTATUS, false));
                    // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
                    fetchPostGetErrors(path, formData, "multipart/form-data").then((errorResponse: any) => {
                        if (errorResponse.message === "Mulig virus funnet") {
                            handleFileWithVirus();
                        }
                    });
                    handleFileUploadFailed();
                    logWarningMessage("Feil med opplasting av vedlegg: " + e.message);
                });
        };
        onSuccessful();
    };

    const onAddFileChange = (
        files: FileList,
        internalIndex: number,
        oppgaveElement: DokumentasjonEtterspurtElement
    ) => {
        dispatch(setFileUploadFailed(dokumentasjonEtterspurt.oppgaveId, false));
        dispatch(setFileUploadFailedInBackend(dokumentasjonEtterspurt.oppgaveId, false));
        dispatch(setFileUploadFailedVirusCheckInBackend(dokumentasjonEtterspurt.oppgaveId, false));

        Array.from(files).forEach((file: File) => {
            if (!file) {
                logInfoMessage("Tom fil ble forsøkt lagt til i OppgaveView.VelgFil.onChange()");
            } else {
                dispatch({
                    type: InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_OPPLASTING,
                    internalIndex: internalIndex,
                    oppgaveElement: oppgaveElement,
                    externalIndex: oppgaveIndex,
                    fil: {
                        filnavn: file.name,
                        status: "INITIALISERT",
                        file: file,
                    },
                });
            }
        });
    };

    return (
        <div>
            <div
                className={
                    (visDokumentasjonEtterspurtDetaljeFeiler ? "oppgaver_detaljer_feil_ramme" : "oppgaver_detaljer") +
                    " luft_over_1rem"
                }
            >
                {oppgaverErFraInnsyn && antallDagerSidenFristBlePassert <= 0 && (
                    <BodyShort spacing>
                        <FormattedMessage
                            id="oppgaver.innsendelsesfrist"
                            values={{innsendelsesfrist: formatDato(dokumentasjonEtterspurt.innsendelsesfrist!)}}
                        />
                    </BodyShort>
                )}
                {oppgaverErFraInnsyn && antallDagerSidenFristBlePassert > 0 && (
                    <BodyShort spacing>
                        <FormattedMessage
                            id="oppgaver.innsendelsesfrist_passert"
                            values={{innsendelsesfrist: formatDato(dokumentasjonEtterspurt.innsendelsesfrist!)}}
                        />
                    </BodyShort>
                )}
                {dokumentasjonEtterspurt.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                    let {typeTekst, tilleggsinfoTekst} = getVisningstekster(
                        oppgaveElement.dokumenttype,
                        oppgaveElement.tilleggsinformasjon
                    );

                    const onDelete = (oppgaveId: string, vedleggIndex: number, fil: Fil) => {
                        setOverMaksStorrelse(false);
                        dispatch(setFileUploadFailedVirusCheckInBackend(oppgaveId, false));
                        dispatch({
                            type: InnsynsdataActionTypeKeys.FJERN_FIL_FOR_OPPLASTING,
                            vedleggIndex: vedleggIndex,
                            oppgaveElement: oppgaveElement,
                            internalIndex: oppgaveElementIndex,
                            externalIndex: oppgaveIndex,
                            fil: fil,
                        });
                    };

                    return (
                        <DokumentasjonEtterspurtElementView
                            key={oppgaveElementIndex}
                            tittel={typeTekst}
                            beskrivelse={tilleggsinfoTekst}
                            oppgaveElement={oppgaveElement}
                            oppgaveElementIndex={oppgaveElementIndex}
                            oppgaveId={dokumentasjonEtterspurt.oppgaveId}
                            setOverMaksStorrelse={setOverMaksStorrelse}
                            onDelete={onDelete}
                            onAddFileChange={onAddFileChange}
                        />
                    );
                })}
                {listeOverDokumentasjonEtterspurtIderSomFeiletPaBackend.includes(dokumentasjonEtterspurt.oppgaveId) && (
                    <ErrorMessage className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                        <FormattedMessage id={"vedlegg.opplasting_backend_feilmelding"} />
                    </ErrorMessage>
                )}
                {kanLasteOppVedlegg && (
                    <ButtonWrapper>
                        <Button
                            variant="primary"
                            disabled={isUploading}
                            onClick={(event: any) => {
                                logButtonOrLinkClick("Dokumentasjon etterspurt: Send vedlegg");
                                onSendClicked(event);
                            }}
                            iconPosition="right"
                            icon={isUploading && <Loader />}
                        >
                            <FormattedMessage id="oppgaver.send_knapp_tittel" />
                        </Button>
                    </ButtonWrapper>
                )}
            </div>
            {listeOverDokumentasjonEtterspurtIderSomFeiletIVirussjekkPaBackend.includes(
                dokumentasjonEtterspurt.oppgaveId
            ) && (
                <ErrorMessage className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage id={"vedlegg.opplasting_backend_virus_feilmelding"} />
                </ErrorMessage>
            )}

            {overMaksStorrelse && (
                <ErrorMessage className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage id={"vedlegg.ulovlig_storrelse_av_alle_valgte_filer"} />
                </ErrorMessage>
            )}
            {(listeOverDokumentasjonEtterspurtIderSomFeilet.includes(dokumentasjonEtterspurt.oppgaveId) ||
                opplastingFeilet) && (
                <ErrorMessage className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage
                        id={
                            listeOverDokumentasjonEtterspurtIderSomFeilet.includes(dokumentasjonEtterspurt.oppgaveId)
                                ? "vedlegg.minst_ett_vedlegg"
                                : "vedlegg.opplasting_feilmelding"
                        }
                    />
                </ErrorMessage>
            )}
        </div>
    );
};

export default DokumentasjonEtterspurtView;
