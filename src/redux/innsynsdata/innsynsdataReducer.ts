import {Reducer} from "redux";
import {setPath} from "../../utils/setPath";
import {REST_STATUS} from "../../utils/restUtils";

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

export interface Oppgave {
    innsendelsesfrist?: string;
    oppgaveId: string;
    oppgaveElementer: OppgaveElement[];
}

export interface OppgaveElement {
    dokumenttype: string;
    tilleggsinformasjon?: string;
    erFraInnsyn: boolean;
    vedlegg?: Vedlegg[];
    filer?: Fil[];
}

export enum InnsynsdataActionTypeKeys {
    // Innsynsdata:
    SETT_FIKSDIGISOSID = "innsynsdata/SETT_FIKSDIGISOSID",
    OPPDATER_INNSYNSSDATA_STI = "innsynsdata/OPPDATER_STI",
    OPPDATER_OPPGAVE_STATE = "innsynsdata/OPPDATER_OPPGAVE_STATE",
    SETT_REST_STATUS = "innsynsdata/SETT_REST_STATUS",
    SKAL_VISE_FEILSIDE = "innsynsdata/SKAL_VISE_FEILSIDE",

    // Vedlegg:
    LEGG_TIL_FIL_FOR_OPPLASTING = "innsynsdata/LEGG_TIL_FILE_FOR_OPPLASTING",
    FJERN_FIL_FOR_OPPLASTING = "innsynsdata/FJERN_FIL_FOR_OPPLASTING",
    SETT_STATUS_FOR_FIL = "innsynsdata/SETT_STATUS_FOR_FIL",
    LEGG_TIL_FIL_FOR_ETTERSENDELSE = "innsynsdata/LEGG_TIL_FIL_FOR_ETTERSENDELSE",
    FJERN_FIL_FOR_ETTERSENDELSE = "innsynsdata/FJERN_FIL_FOR_ETTERSENDELSE",
    SETT_STATUS_FOR_ETTERSENDELSESFIL = "innsynsdata/SETT_STATUS_FOR_ETTERSENDELSESFIL",
    OPPDATER_SAKSDETALJER = "innsynsdata/OPPDATER_SAKSDETALJER",
    SETT_REST_STATUS_SAKSDETALJER = "innsynsdata/SETT_REST_STATUS_SAKSDETALJER",
    OPPGAVE_VEDLEGSOPPLASTING_FEILET = "innsynsdata/OPPGAVE_VEDLEGSOPPLASTING_FEILET",
}

export enum InnsynsdataSti {
    SAKSSTATUS = "saksStatus",
    OPPGAVER = "oppgaver",
    SOKNADS_STATUS = "soknadsStatus",
    HENDELSER = "hendelser",
    VEDLEGG = "vedlegg",
    SAKER = "saker",
    FORELOPIG_SVAR = "forelopigSvar",
    KOMMUNE = "kommune",
}

export interface InnsynsdataActionType {
    fiksDigisosId?: string;
    type: InnsynsdataActionTypeKeys;
    verdi?: any;
    sti: InnsynsdataSti;
    restStatus?: string;
    skalVise?: boolean;
    oppgaveId?: string;
}

export interface VedleggActionType {
    type: InnsynsdataActionTypeKeys;
    innsendelsesfrist?: string; // For å finne rett oppgave
    dokumenttype: string; // For å finne rett oppgaveElement
    tilleggsinfo?: string; // For å finne rett oppgaveElement
    vedleggIndex: number; // For å finne rett vedlegg i oppgaveElement
    oppgaveElementIndex: number;
    oppgaveIndex: number;
    fil: Fil;
    oppgaveElement: OppgaveElement;
    status?: string;
    restStatus?: REST_STATUS;
    fiksDigisosId?: string;
}

export interface Status {
    status: string | null;
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

export interface VedleggsOpplastingFeilActionType {
    status: boolean;
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
}

const initiellKommuneResponse_antarAltOk: KommuneResponse = {
    erInnsynDeaktivert: false,
    erInnsynMidlertidigDeaktivert: false,
    erInnsendingEttersendelseDeaktivert: false,
    erInnsendingEttersendelseMidlertidigDeaktivert: false,
    tidspunkt: null,
};

export interface InnsynsdataType {
    fiksDigisosId: string | undefined;
    saksStatus: SaksStatusState[];
    oppgaver: Oppgave[];
    oppgaveVedlegsOpplastingFeilet: boolean;
    restStatus: any;
    soknadsStatus: Status;
    hendelser: Hendelse[];
    vedlegg: Vedlegg[];
    ettersendelse: Ettersendelse;
    saker: Sakstype[];
    forelopigSvar: ForelopigSvar;
    kommune: undefined | KommuneResponse;
    skalViseFeilside: boolean;
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
    oppgaveVedlegsOpplastingFeilet: false,
    soknadsStatus: {
        status: null,
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
    skalViseFeilside: false,
};

export interface Ettersendelse {
    filer: Fil[];
    feil: Vedleggfeil | undefined;
}

export interface Vedleggfeil {
    feilmeldingId: string;
    filnavn: string;
}

const InnsynsdataReducer: Reducer<
    InnsynsdataType,
    InnsynsdataActionType & VedleggActionType & VedleggsOpplastingFeilActionType
> = (state = initialState, action) => {
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
        case InnsynsdataActionTypeKeys.OPPDATER_OPPGAVE_STATE:
            const oppgave: Oppgave[] = action.verdi;
            if (oppgave.length === 0) {
                return {
                    ...state,
                    oppgaver: state.oppgaver.filter((oppgave: Oppgave) => oppgave.oppgaveId !== action.oppgaveId),
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
        case InnsynsdataActionTypeKeys.SETT_REST_STATUS:
            return {
                ...setPath(state, "restStatus/" + action.sti, action.restStatus),
            };
        case InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_OPPLASTING:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave, oppgaveIndex: number) => {
                    if (oppgaveIndex === action.oppgaveIndex) {
                        return {
                            ...oppgave,
                            oppgaveElementer: oppgave.oppgaveElementer.map(
                                (oppgaveElement, oppgaveElementIndex: number) => {
                                    if (oppgaveElementIndex === action.oppgaveElementIndex) {
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
                    if (oppgaveIndex === action.oppgaveIndex) {
                        return {
                            ...oppgave,
                            oppgaveElementer: oppgave.oppgaveElementer.map((oppgaveElement, oppgaveElementIndex) => {
                                if (
                                    oppgaveElementIndex === action.oppgaveElementIndex &&
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

        case InnsynsdataActionTypeKeys.OPPGAVE_VEDLEGSOPPLASTING_FEILET:
            return {
                ...state,
                oppgaveVedlegsOpplastingFeilet: action.status,
            };

        case InnsynsdataActionTypeKeys.SKAL_VISE_FEILSIDE:
            return {
                ...state,
                skalViseFeilside: action.skalVise,
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

export const oppdaterOppgaveState = (oppgaveId: string, verdi: Oppgave[]): any => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_OPPGAVE_STATE,
        sti: InnsynsdataSti.OPPGAVER,
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

export const skalViseFeilside = (skalVise: boolean) => {
    return {
        type: InnsynsdataActionTypeKeys.SKAL_VISE_FEILSIDE,
        skalVise,
    };
};

export default InnsynsdataReducer;
