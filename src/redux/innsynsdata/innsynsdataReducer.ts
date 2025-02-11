import {Reducer} from "redux";
import {setPath} from "../../utils/setPath";
import {REST_STATUS} from "../../utils/restUtils";
import {HendelseTypeEnum} from "../../utils/vedleggUtils";
import {SoknadsStatusEnum} from "../../components/soknadsStatus/soknadsStatusUtils";

export enum SaksStatus {
    UNDER_BEHANDLING = "UNDER_BEHANDLING",
    IKKE_INNSYN = "IKKE_INNSYN",
    FERDIGBEHANDLET = "FERDIGBEHANDLET",
    BEHANDLES_IKKE = "BEHANDLES_IKKE",
    FEILREGISTRERT = "FEILREGISTRERT",
}

export interface Utbetaling {
    tidspunkt: string;
    beskrivelse: string;
    belop: number;
}

export interface SaksStatusState {
    tittel: string;
    status: SaksStatus;
    skalViseVedtakInfoPanel: boolean;
    vedtaksfilUrlList: VedtakFattet[];
    melding?: string;
}

export interface Vedtak {
    utfall?: UtfallVedtak;
    vedtaksFilUrl: string;
    dato?: string;
}

export enum UtfallVedtak {
    INNVILGET = "INNVILGET",
    DELVIS_INNVILGET = "DELVIS_INNVILGET",
    AVSLATT = "AVSLATT",
    AVVIST = "AVVIST",
}

export enum Feilside {
    TEKNISKE_PROBLEMER = "TEKNISKE_PROBLEMER",
    IKKE_TILGANG = "IKKE_TILGANG",
    FINNES_IKKE = "FINNES_IKKE",
}

export interface Sakstype {
    fiksDigisosId: string;
    soknadTittel: string;
    status: string;
    sistOppdatert: string;
    antallNyeOppgaver: number;
    kilde: string;
    url: string;
    restStatus: REST_STATUS;
    harBlittLastetInn: boolean;
}

export interface Vedlegg {
    storrelse: number;
    url: string;
    type: string;
    tilleggsinfo: string;
    datoLagtTil: string;
    filnavn: string;
}

export interface Fil {
    filnavn: string;
    file?: File;
    status?: string;
}

export interface DokumentasjonEtterspurt {
    innsendelsesfrist?: string;
    oppgaveId: string;
    oppgaveElementer: DokumentasjonEtterspurtElement[]; // todo rename felt til dokumentasjonEtterspurtElementer
}

export interface DokumentasjonEtterspurtElement {
    dokumenttype: string;
    tilleggsinformasjon?: string;
    erFraInnsyn: boolean;
    hendelsetype: HendelseTypeEnum | undefined;
    hendelsereferanse: string | undefined;
    filer?: Fil[];
}

export interface Vilkar {
    hendelsetidspunkt: string;
    vilkarReferanse: string;
    tittel?: string;
    beskrivelse?: string;
    status: string;
}

export interface DokumentasjonKrav {
    frist?: string;
    dokumentasjonkravId: string;
    dokumentasjonkravElementer: DokumentasjonKravElement[];
}

export interface DokumentasjonKravElement {
    tittel?: string;
    beskrivelse?: string;
    hendelsetidspunkt?: string;
    hendelsetype: HendelseTypeEnum | undefined;
    dokumentasjonkravReferanse: string | undefined;
    status: string;
    filer?: Fil[];
}

export enum InnsynsdataActionTypeKeys {
    // Innsynsdata:
    SETT_FIKSDIGISOSID = "innsynsdata/SETT_FIKSDIGISOSID",
    OPPDATER_INNSYNSSDATA_STI = "innsynsdata/OPPDATER_STI",
    OPPDATER_OPPGAVE_STATE = "innsynsdata/OPPDATER_OPPGAVE_STATE",
    OPPDATER_DOKUMENTASJONKRAV_STATE = "innsyndata/OPPDATER_DOKUMENTASJONKRAV_STATE",
    SETT_REST_STATUS = "innsynsdata/SETT_REST_STATUS",
    SKAL_VISE_FEILSIDE = "innsynsdata/SKAL_VISE_FEILSIDE",
    SKAL_VISE_FORBUDTSIDE = "innsynsdata/SKAL_VISE_FORBUDTSIDE",
    VIS_FEILSIDE = "innsynsdata/VIS_FEILSIDE",
    SETT_FORNAVN = "innsynsdata/SETT_FORNAVN",
    HAR_LEVERT_TIDLIGERE_DOKUMENTASJONKRAV = "innsynsdata/HAR_LEVERT_TIDLIGERE_DOKUMENTASJONKRAV",
    FAGSYSTEM_HAR_DOKUMENTASJONKRAV = "innsynsdata/FAGSYSTEM_HAR_DOKUMENTASJONKRAV",

    // Vedlegg:
    LEGG_TIL_FIL_FOR_OPPLASTING = "innsynsdata/LEGG_TIL_FILE_FOR_OPPLASTING",
    FJERN_FIL_FOR_OPPLASTING = "innsynsdata/FJERN_FIL_FOR_OPPLASTING",
    SETT_STATUS_FOR_FIL = "innsynsdata/SETT_STATUS_FOR_FIL",
    LEGG_TIL_FIL_FOR_DOKUMENTASJONKRAV = "innsynsdata/LEGG_TIL_FIL_FOR_DOKUMENTASJONKRAV",
    FJERN_FIL_FOR_DOKUMENTASJONKRAV = "innsynsdata/FJERN_FIL_FOR_DOKUMENTASJONKRAV",
    SETT_STATUS_FOR_DOKUMENTASJONKRAV_FIL = "innsynsdata/SETT_STATUS_FOR_DOKUMENTASJONKRAV_FIL",
    LEGG_TIL_FIL_FOR_ETTERSENDELSE = "innsynsdata/LEGG_TIL_FIL_FOR_ETTERSENDELSE",
    FJERN_FIL_FOR_ETTERSENDELSE = "innsynsdata/FJERN_FIL_FOR_ETTERSENDELSE",
    SETT_STATUS_FOR_ETTERSENDELSESFIL = "innsynsdata/SETT_STATUS_FOR_ETTERSENDELSESFIL",

    OPPDATER_SAKSDETALJER = "innsynsdata/OPPDATER_SAKSDETALJER",
    SETT_REST_STATUS_SAKSDETALJER = "innsynsdata/SETT_REST_STATUS_SAKSDETALJER",
    FILE_ATTACHMENTS_UPLOAD_FAILED = "innsynsdata/FILE_ATTACHMENTS_UPLOAD_FAILED",
    FILE_UPLOAD_FAILED = "innsynsdata/FILE_UPLOAD_FAILED",
    FILE_UPLOAD_BACKEND_FAILED = "innsynsdata/FILE_UPLOAD_BACKEND_FAILED",
    FILE_UPLOAD_BACKEND_FAILED_VIRUS_CHECK = "innsynsdata/FILE_UPLOAD_BACKEND_FAILED_VIRUS_CHECK",
}

export enum InnsynsdataSti {
    SAKSSTATUS = "saksStatus",
    OPPGAVER = "oppgaver",
    DOKUMENTASJONKRAV = "dokumentasjonkrav",
    SOKNADS_STATUS = "soknadsStatus",
    HENDELSER = "hendelser",
    VEDLEGG = "vedlegg",
    SAKER = "saker",
    FORELOPIG_SVAR = "forelopigSvar",
    KOMMUNE = "kommune",
    VILKAR = "vilkar",
    HAR_LEVERT_DOKUMENTASJONKRAV = "harLeverteDokumentasjonkrav",
    FAGSYSTEM_HAR_DOKUMENTASJONKRAV = "fagsystemHarDokumentasjonkrav",
}

export interface InnsynsdataActionType {
    fiksDigisosId?: string;
    type: InnsynsdataActionTypeKeys;
    verdi?: any;
    sti: InnsynsdataSti;
    restStatus?: string;
    oppgaveId?: string;
    fornavn?: string;
    feilside?: Feilside;
}

export interface VedleggActionType {
    type: InnsynsdataActionTypeKeys;
    innsendelsesfrist?: string; // For å finne rett oppgave
    dokumenttype: string; // For å finne rett oppgaveElement
    tilleggsinfo?: string; // For å finne rett oppgaveElement
    vedleggIndex: number; // For å finne rett vedlegg i oppgaveElement
    internalIndex: number;
    externalIndex: number;
    fil: Fil;
    oppgaveElement: DokumentasjonEtterspurtElement;
    dokumentasjonkravElement: DokumentasjonKravElement;
    status?: string;
    restStatus?: REST_STATUS;
    fiksDigisosId?: string;
    oppgaveId?: string;
}

export interface Status {
    status: SoknadsStatusEnum | null;
    tidspunktSendt: string | null;
    soknadsalderIMinutter: number;
    navKontor: string | null;
    filUrl: null | UrlResponse;
}

export interface Hendelse {
    tidspunkt: string;
    beskrivelse: string;
    filUrl: null | UrlResponse;
}

export interface UrlResponse {
    linkTekst: string;
    link: string;
}

export interface VedtakFattet {
    dato: string;
    vedtaksfilUrl: null | string;
}

export interface ForelopigSvar {
    harMottattForelopigSvar: boolean;
    link?: string;
}

export interface KommuneResponse {
    erInnsynDeaktivert: boolean;
    erInnsynMidlertidigDeaktivert: boolean;
    erInnsendingEttersendelseDeaktivert: boolean;
    erInnsendingEttersendelseMidlertidigDeaktivert: boolean;
    tidspunkt: Date | null;
    kommunenummer: String | null;
}

const initiellKommuneResponse_antarAltOk: KommuneResponse = {
    erInnsynDeaktivert: false,
    erInnsynMidlertidigDeaktivert: false,
    erInnsendingEttersendelseDeaktivert: false,
    erInnsendingEttersendelseMidlertidigDeaktivert: false,
    tidspunkt: null,
    kommunenummer: null,
};

export interface InnsynsdataType {
    fiksDigisosId: string | undefined;
    saksStatus: SaksStatusState[];
    oppgaver: DokumentasjonEtterspurt[];
    dokumentasjonkrav: DokumentasjonKrav[];
    harLevertTidligereDokumentasjonkrav: boolean;
    fagsystemHarDokumentasjonkrav: boolean;
    vilkar: Vilkar[];
    listeOverOpggaveIderSomFeilet: string[];
    listeOverOppgaveIderSomFeiletPaBackend: string[];
    listeOverOppgaveIderSomFeiletIVirussjekkPaBackend: string[];
    dokumentasjonkravReferanserSomFeilet: string[];
    dokumentasjonkravReferanserSomFeiletPaBackend: string[];
    dokumentasjonkravReferanserSomFeiletIVirussjekkPaBackend: string[];
    oppgaveVedlegsOpplastingFeilet: boolean;
    restStatus: any;
    soknadsStatus: Status;
    hendelser: Hendelse[];
    vedlegg: Vedlegg[];
    ettersendelse: Ettersendelse;
    saker: Sakstype[];
    forelopigSvar: ForelopigSvar;
    kommune: undefined | KommuneResponse;
    fornavn: string;
    feilside?: Feilside;
}

export const initialInnsynsdataRestStatus = {
    saksStatus: REST_STATUS.INITIALISERT,
    oppgaver: REST_STATUS.INITIALISERT,
    soknadsStatus: REST_STATUS.INITIALISERT,
    hendelser: REST_STATUS.INITIALISERT,
    vedlegg: REST_STATUS.INITIALISERT,
    utbetalinger: REST_STATUS.INITIALISERT,
    saker: REST_STATUS.INITIALISERT,
    forelopigSvar: REST_STATUS.INITIALISERT,
    kommune: REST_STATUS.INITIALISERT,
};

export const initialState: InnsynsdataType = {
    fiksDigisosId: undefined,
    saksStatus: [],
    oppgaver: [],
    dokumentasjonkrav: [],
    harLevertTidligereDokumentasjonkrav: false,
    fagsystemHarDokumentasjonkrav: false,
    vilkar: [],
    listeOverOpggaveIderSomFeilet: [],
    listeOverOppgaveIderSomFeiletPaBackend: [],
    listeOverOppgaveIderSomFeiletIVirussjekkPaBackend: [],
    dokumentasjonkravReferanserSomFeilet: [],
    dokumentasjonkravReferanserSomFeiletPaBackend: [],
    dokumentasjonkravReferanserSomFeiletIVirussjekkPaBackend: [],
    oppgaveVedlegsOpplastingFeilet: false,
    soknadsStatus: {
        status: null,
        tidspunktSendt: null,
        soknadsalderIMinutter: -1,
        navKontor: null,
        filUrl: null,
    },
    hendelser: [],
    vedlegg: [],
    saker: [],
    ettersendelse: {
        filer: [],
        feil: undefined,
    },
    forelopigSvar: {
        harMottattForelopigSvar: false,
    },
    kommune: initiellKommuneResponse_antarAltOk,
    restStatus: initialInnsynsdataRestStatus,
    fornavn: "",
    feilside: undefined,
};

export interface Ettersendelse {
    filer: Fil[];
    feil: Vedleggfeil | undefined;
}

export interface Vedleggfeil {
    feilmeldingId: string;
    filnavn: string;
}

const InnsynsdataReducer: Reducer<InnsynsdataType, InnsynsdataActionType & VedleggActionType> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case InnsynsdataActionTypeKeys.SETT_FIKSDIGISOSID:
            return {
                ...state,
                fiksDigisosId: action.fiksDigisosId,
            };
        case InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI:
            return {
                ...setPath(state, action.sti, action.verdi),
            };
        case InnsynsdataActionTypeKeys.HAR_LEVERT_TIDLIGERE_DOKUMENTASJONKRAV:
            return {
                ...state,
                harLevertTidligereDokumentasjonkrav: action.verdi,
            };
        case InnsynsdataActionTypeKeys.FAGSYSTEM_HAR_DOKUMENTASJONKRAV:
            return {
                ...state,
                fagsystemHarDokumentasjonkrav: action.verdi,
            };
        case InnsynsdataActionTypeKeys.OPPDATER_OPPGAVE_STATE:
            const oppgave: DokumentasjonEtterspurt[] = action.verdi;
            if (oppgave.length === 0) {
                return {
                    ...state,
                    oppgaver: state.oppgaver.filter(
                        (oppgave: DokumentasjonEtterspurt) => oppgave.oppgaveId !== action.oppgaveId
                    ),
                };
            }
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave) => {
                    if (oppgave.oppgaveId === action.oppgaveId) {
                        return action.verdi[0];
                    }
                    return oppgave;
                }),
            };
        case InnsynsdataActionTypeKeys.OPPDATER_DOKUMENTASJONKRAV_STATE:
            const dokumentasjonkravListe: DokumentasjonKrav[] = action.verdi;
            if (dokumentasjonkravListe.length === 0) {
                return {
                    ...state,
                    dokumentasjonkrav: state.dokumentasjonkrav.filter(
                        (dokumentasjonKrav: DokumentasjonKrav) =>
                            dokumentasjonKrav.dokumentasjonkravId !== action.oppgaveId
                    ),
                };
            }
            return {
                ...state,
                dokumentasjonkrav: state.dokumentasjonkrav.map((dokumentasjonkrav) => {
                    if (dokumentasjonkrav.dokumentasjonkravId === action.oppgaveId) {
                        return action.verdi[0];
                    }
                    return dokumentasjonkrav;
                }),
            };
        case InnsynsdataActionTypeKeys.SETT_REST_STATUS:
            return {
                ...setPath(state, "restStatus/" + action.sti, action.restStatus),
            };
        case InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_OPPLASTING:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave, oppgaveIndex: number) => {
                    if (oppgaveIndex === action.externalIndex) {
                        return {
                            ...oppgave,
                            oppgaveElementer: oppgave.oppgaveElementer.map(
                                (oppgaveElement, oppgaveElementIndex: number) => {
                                    if (oppgaveElementIndex === action.internalIndex) {
                                        return {
                                            ...oppgaveElement,
                                            filer: [...(oppgaveElement.filer ? oppgaveElement.filer : []), action.fil],
                                        };
                                    }
                                    return oppgaveElement;
                                }
                            ),
                        };
                    }
                    return oppgave;
                }),
            };
        case InnsynsdataActionTypeKeys.FJERN_FIL_FOR_OPPLASTING:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave, oppgaveIndex) => {
                    if (oppgaveIndex === action.externalIndex) {
                        return {
                            ...oppgave,
                            oppgaveElementer: oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                                if (
                                    oppgaveElementIndex === action.internalIndex &&
                                    oppgaveElement.dokumenttype === action.oppgaveElement.dokumenttype &&
                                    oppgaveElement.tilleggsinformasjon === action.oppgaveElement.tilleggsinformasjon
                                ) {
                                    return {
                                        ...oppgaveElement,
                                        filer:
                                            oppgaveElement.filer &&
                                            oppgaveElement.filer.filter((fil: Fil, vedleggIndex: number) => {
                                                return vedleggIndex !== action.vedleggIndex;
                                            }),
                                    };
                                }
                                return oppgaveElement;
                            }),
                        };
                    }
                    return oppgave;
                }),
            };
        case InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_DOKUMENTASJONKRAV:
            return {
                ...state,
                dokumentasjonkrav: state.dokumentasjonkrav.map((krav, oppgaveIndex: number) => {
                    if (oppgaveIndex === action.externalIndex) {
                        return {
                            ...krav,
                            dokumentasjonkravElementer: krav.dokumentasjonkravElementer.map(
                                (dokumentasjonkravElement, oppgaveElementIndex: number) => {
                                    if (oppgaveElementIndex === action.internalIndex) {
                                        return {
                                            ...dokumentasjonkravElement,
                                            filer: [
                                                ...(dokumentasjonkravElement.filer
                                                    ? dokumentasjonkravElement.filer
                                                    : []),
                                                action.fil,
                                            ],
                                        };
                                    }
                                    return dokumentasjonkravElement;
                                }
                            ),
                        };
                    }
                    return krav;
                }),
            };
        case InnsynsdataActionTypeKeys.FJERN_FIL_FOR_DOKUMENTASJONKRAV:
            return {
                ...state,
                dokumentasjonkrav: state.dokumentasjonkrav.map((krav, oppgaveIndex) => {
                    if (oppgaveIndex === action.externalIndex) {
                        return {
                            ...krav,
                            dokumentasjonkravElementer: krav.dokumentasjonkravElementer.map(
                                (dokumentasjonkravElement, oppgaveElementIndex) => {
                                    if (
                                        oppgaveElementIndex === action.internalIndex &&
                                        dokumentasjonkravElement.tittel === action.dokumentasjonkravElement.tittel &&
                                        dokumentasjonkravElement.beskrivelse ===
                                            action.dokumentasjonkravElement.beskrivelse
                                    ) {
                                        return {
                                            ...dokumentasjonkravElement,
                                            filer:
                                                dokumentasjonkravElement.filer &&
                                                dokumentasjonkravElement.filer.filter(
                                                    (fil: Fil, vedleggIndex: number) => {
                                                        return vedleggIndex !== action.vedleggIndex;
                                                    }
                                                ),
                                        };
                                    }
                                    return dokumentasjonkravElement;
                                }
                            ),
                        };
                    }
                    return krav;
                }),
            };
        case InnsynsdataActionTypeKeys.SETT_STATUS_FOR_FIL:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave) => {
                    if (oppgave.innsendelsesfrist !== action.innsendelsesfrist) {
                        return oppgave;
                    }

                    return {
                        ...oppgave,
                        oppgaveElementer: oppgave.oppgaveElementer.map((oppgaveElement) => {
                            if (
                                oppgaveElement.dokumenttype !== action.dokumenttype ||
                                oppgaveElement.tilleggsinformasjon !== action.tilleggsinfo
                            ) {
                                return oppgaveElement;
                            }

                            return {
                                ...oppgaveElement,
                                filer:
                                    oppgaveElement.filer &&
                                    oppgaveElement.filer.map((fil: Fil, vedleggIndex: number) => {
                                        if (vedleggIndex === action.vedleggIndex) {
                                            return {
                                                ...fil,
                                                status: action.status,
                                            };
                                        }
                                        return fil;
                                    }),
                            };
                        }),
                    };
                }),
            };
        case InnsynsdataActionTypeKeys.SETT_STATUS_FOR_DOKUMENTASJONKRAV_FIL:
            return {
                ...state,
                dokumentasjonkrav: state.dokumentasjonkrav.map((dokumentasjonkrav) => {
                    if (dokumentasjonkrav.frist !== action.innsendelsesfrist) {
                        return dokumentasjonkrav;
                    }

                    return {
                        ...dokumentasjonkrav,
                        dokumentasjonkravElementer: dokumentasjonkrav.dokumentasjonkravElementer.map(
                            (dokumentasjonkravElement) => {
                                if (
                                    dokumentasjonkravElement.tittel !== action.dokumenttype ||
                                    dokumentasjonkravElement.beskrivelse !== action.tilleggsinfo
                                ) {
                                    return dokumentasjonkravElement;
                                }

                                return {
                                    ...dokumentasjonkravElement,
                                    filer:
                                        dokumentasjonkravElement.filer &&
                                        dokumentasjonkravElement.filer.map((fil: Fil, vedleggIndex: number) => {
                                            if (vedleggIndex === action.vedleggIndex) {
                                                return {
                                                    ...fil,
                                                    status: action.status,
                                                };
                                            }
                                            return fil;
                                        }),
                                };
                            }
                        ),
                    };
                }),
            };
        case InnsynsdataActionTypeKeys.OPPDATER_SAKSDETALJER:
            return {
                ...state,
                saker: state.saker.map((sak: Sakstype) => {
                    if (action.verdi && action.verdi.fiksDigisosId) {
                        if (sak.fiksDigisosId === action.verdi.fiksDigisosId) {
                            var oppdatertSoknadTittel = sak.soknadTittel;
                            if (action.verdi.soknadTittel !== "") {
                                oppdatertSoknadTittel = action.verdi.soknadTittel;
                            }
                            return {
                                ...sak,
                                soknadTittel: oppdatertSoknadTittel,
                                status: action.verdi.status,
                                antallNyeOppgaver: action.verdi.antallNyeOppgaver,
                                restStatus: REST_STATUS.OK,
                                harBlittLastetInn: true,
                            };
                        }
                    }
                    return sak;
                }),
            };
        case InnsynsdataActionTypeKeys.SETT_REST_STATUS_SAKSDETALJER:
            return {
                ...state,
                saker: state.saker.map((sak: Sakstype) => {
                    if (sak.fiksDigisosId === action.fiksDigisosId) {
                        return {
                            ...sak,
                            restStatus: action.restStatus,
                        };
                    } else {
                        return sak;
                    }
                }),
            };
        case InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_ETTERSENDELSE: {
            /* TODO: Ta stilling til om/hvordan dupliserte filer skal håndteres */
            /*const found: Fil | undefined = state.ettersendelse.filer.find((fil: Fil) => {
                return fil.filnavn === action.fil.filnavn;
            });

            if (found) {
                return {
                    ...state,
                    ettersendelse: {
                        ...state.ettersendelse,
                        feil: {
                            feilmeldingId: "vedlegg.validering.duplikat",
                            filnavn: action.fil.filnavn
                        } as Vedleggfeil
                    }
                }
            }*/

            return {
                ...state,
                ettersendelse: {
                    ...state.ettersendelse,
                    filer: [...(state.ettersendelse.filer ? state.ettersendelse.filer : []), action.fil],
                },
            };
        }
        case InnsynsdataActionTypeKeys.FJERN_FIL_FOR_ETTERSENDELSE:
            return {
                ...state,
                oppgaveVedlegsOpplastingFeilet: false,
                ettersendelse: {
                    ...state.ettersendelse,
                    filer: state.ettersendelse.filer.filter((fil: Fil, vedleggIndex: number) => {
                        return vedleggIndex !== action.vedleggIndex;
                    }),
                },
            };
        case InnsynsdataActionTypeKeys.SETT_STATUS_FOR_ETTERSENDELSESFIL:
            return {
                ...state,
                ettersendelse: {
                    ...state.ettersendelse,
                    filer: state.ettersendelse.filer
                        .map((fil: Fil, vedleggIndex: number) => {
                            if (vedleggIndex === action.vedleggIndex) {
                                return {
                                    ...fil,
                                    status: action.status,
                                };
                            }
                            return fil;
                        })
                        .filter((fil: Fil, index: number, files: Fil[]) => {
                            return files.find((fil: Fil) => fil.status !== REST_STATUS.OK) ? fil : null;
                        }),
                },
            };

        case InnsynsdataActionTypeKeys.FILE_ATTACHMENTS_UPLOAD_FAILED:
            return {
                ...state,
                oppgaveVedlegsOpplastingFeilet: action.status,
            };
        case InnsynsdataActionTypeKeys.FILE_UPLOAD_FAILED:
            if (action.status) {
                return {
                    ...state,
                    listeOverOpggaveIderSomFeilet: [...state.listeOverOpggaveIderSomFeilet, action.oppgaveId],
                };
            }
            return {
                ...state,
                listeOverOpggaveIderSomFeilet: state.listeOverOpggaveIderSomFeilet.filter(
                    (oppgaveId: string) => oppgaveId !== action.oppgaveId
                ),
            };
        case InnsynsdataActionTypeKeys.FILE_UPLOAD_BACKEND_FAILED:
            if (action.status) {
                return {
                    ...state,
                    listeOverOppgaveIderSomFeiletPaBackend: [
                        ...state.listeOverOppgaveIderSomFeiletPaBackend,
                        action.oppgaveId,
                    ],
                };
            }
            return {
                ...state,
                listeOverOppgaveIderSomFeiletPaBackend: state.listeOverOppgaveIderSomFeiletPaBackend.filter(
                    (oppgaveId: string) => oppgaveId !== action.oppgaveId
                ),
            };
        case InnsynsdataActionTypeKeys.FILE_UPLOAD_BACKEND_FAILED_VIRUS_CHECK:
            if (action.status) {
                return {
                    ...state,
                    listeOverOppgaveIderSomFeiletIVirussjekkPaBackend: [
                        ...state.listeOverOppgaveIderSomFeiletIVirussjekkPaBackend,
                        action.oppgaveId,
                    ],
                };
            }
            return {
                ...state,
                listeOverOppgaveIderSomFeiletIVirussjekkPaBackend:
                    state.listeOverOppgaveIderSomFeiletIVirussjekkPaBackend.filter(
                        (oppgaveId: string) => oppgaveId !== action.oppgaveId
                    ),
            };

        case InnsynsdataActionTypeKeys.SETT_FORNAVN:
            return {
                ...state,
                fornavn: action.fornavn,
            };
        case InnsynsdataActionTypeKeys.VIS_FEILSIDE:
            return {
                ...state,
                feilside: action.feilside,
            };
        default:
            return state;
    }
};

export const oppdaterInnsynsdataState = (sti: InnsynsdataSti, verdi: any): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI,
        sti,
        verdi,
    };
};

export const hentHarLevertDokumentasjonkrav = (verdi: Boolean): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.HAR_LEVERT_TIDLIGERE_DOKUMENTASJONKRAV,
        sti: InnsynsdataSti.HAR_LEVERT_DOKUMENTASJONKRAV,
        verdi,
    };
};

export const settFagsystemHarDokumentasjonkrav = (verdi: Boolean): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.FAGSYSTEM_HAR_DOKUMENTASJONKRAV,
        sti: InnsynsdataSti.FAGSYSTEM_HAR_DOKUMENTASJONKRAV,
        verdi,
    };
};

export const oppdaterOppgaveState = (oppgaveId: string, verdi: DokumentasjonEtterspurt[]): any => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_OPPGAVE_STATE,
        sti: InnsynsdataSti.OPPGAVER,
        oppgaveId,
        verdi,
    };
};

export const oppdaterDokumentasjonkravState = (oppgaveId: string, verdi: DokumentasjonKrav[]): any => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_DOKUMENTASJONKRAV_STATE,
        sti: InnsynsdataSti.DOKUMENTASJONKRAV,
        oppgaveId,
        verdi,
    };
};

export const oppdaterSaksdetaljerState = (requestId: string, verdi: Sakstype) => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_SAKSDETALJER,
        requestId,
        verdi,
    };
};

export const oppdaterSaksdetaljerRestStatus = (fiksDigisosId: string, restStatus: REST_STATUS) => {
    return {
        type: InnsynsdataActionTypeKeys.SETT_REST_STATUS_SAKSDETALJER,
        fiksDigisosId,
        restStatus,
    };
};

export const settRestStatus = (sti: InnsynsdataSti, restStatus: REST_STATUS): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.SETT_REST_STATUS,
        sti,
        restStatus,
    };
};

export const visFeilside = (feilside?: Feilside) => {
    return {
        type: InnsynsdataActionTypeKeys.VIS_FEILSIDE,
        feilside,
    };
};

export default InnsynsdataReducer;
