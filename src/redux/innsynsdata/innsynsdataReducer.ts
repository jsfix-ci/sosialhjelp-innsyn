import {Reducer} from "redux";
import {setPath} from "../../utils/setPath";
import {REST_STATUS} from "../../utils/restUtils";

export enum Utfall {
    INNVILGET = "INNVILGET",
    DELVIS_INNVILGET = "DELVIS_INNVILGET",
    AVSLATT = "AVSLATT",
    AVVIST = "AVVIST",
    FERDIG_BEHANDLET = "FERDIG_BEHANDLET",
    KAN_IKKE_VISES = "KAN_IKKE_VISES"
}

export interface Utbetaling {
    tidspunkt: string;
    beskrivelse: string;
    belop: number;
}

export interface SaksStatusState {
    tittel: string;
    status: Utfall;
    vedtaksfilUrlList: VedtakFattet[];
    melding?: string;
}

export interface Sakstype {
    fiksDigisosId: string;
    soknadTittel: string;
    status: string;
    sistOppdatert: string;
    antallNyeOppgaver: number;
    kilde: string;
    url: string;
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
    SETT_REST_STATUS = "innsynsdata/SETT_REST_STATUS",

    // Vedlegg:
    LEGG_TIL_FIL_FOR_OPPLASTING = "innsynsdata/LEGG_TIL_FILE_FOR_OPPLASTING",
    FJERN_FIL_FOR_OPPLASTING = "innsynsdata/FJERN_FIL_FOR_OPPLASTING",
    SETT_STATUS_FOR_FIL = "innsynsdata/SETT_STATUS_FOR_FIL",
    LEGG_TIL_FIL_FOR_ETTERSENDELSE = "innsynsdata/LEGG_TIL_FIL_FOR_ETTERSENDELSE",
    FJERN_FIL_FOR_ETTERSENDELSE = "innsynsdata/FJERN_FIL_FOR_ETTERSENDELSE",
    SETT_STATUS_FOR_ETTERSENDELSESFIL = "innsynsdata/SETT_STATUS_FOR_ETTERSENDELSESFIL"
}

export enum InnsynsdataSti {
    SAKSSTATUS = "saksStatus",
    OPPGAVER = "oppgaver",
    SOKNADS_STATUS = "soknadsStatus",
    HENDELSER = "hendelser",
    VEDLEGG = "vedlegg",
    SEND_VEDLEGG = "vedlegg/send",
    SAKER = "saker"
}

// export interface InnsynssdataActionVerdi {
//     saksStatus?: SaksStatusState;
// }

export interface InnsynsdataActionType {
    fiksDigisosId?: string,
    type: InnsynsdataActionTypeKeys,
    verdi?: any,
    sti: InnsynsdataSti,
    restStatus?: string
}

export interface VedleggActionType {
    type: InnsynsdataActionTypeKeys,
    fil: Fil;
    oppgave: Oppgave;
    status?: string;
}

export interface Status {
    status: string | null;
}

export interface Hendelse {
    tidspunkt: string;
    beskrivelse: string;
    filUrl: null | string;
}

export interface VedtakFattet {
    dato: string;
    vedtaksfilUrl: null | string;
}

export interface InnsynsdataType {
    fiksDigisosId: string | undefined;
    saksStatus: SaksStatusState[];
    oppgaver: Oppgave[];
    restStatus: any;
    soknadsStatus: Status;
    hendelser: Hendelse[];
    vedlegg: Vedlegg[];
    ettersendelse: Ettersendelse;
    saker: Sakstype[];
}

export const initialInnsynsdataRestStatus = {
    saksStatus: REST_STATUS.INITIALISERT,
    oppgaver: REST_STATUS.INITIALISERT,
    soknadsStatus: REST_STATUS.INITIALISERT,
    hendelser: REST_STATUS.INITIALISERT,
    vedlegg: REST_STATUS.INITIALISERT,
    utbetalinger: REST_STATUS.INITIALISERT,
    saker: REST_STATUS.INITIALISERT
};

const initialState: InnsynsdataType = {
    fiksDigisosId: undefined,
    saksStatus: [],
    oppgaver: [],
    soknadsStatus: {
        status: null
    },
    hendelser: [],
    vedlegg: [],
    saker: [],
    ettersendelse: {
        filer: [],
        feil: undefined
    },
    restStatus: initialInnsynsdataRestStatus
};

export interface Ettersendelse {
    filer: Fil[];
    feil: Vedleggfeil | undefined;
}

export interface Vedleggfeil {
    feilmeldingId: string,
    filnavn: string
}

const InnsynsdataReducer: Reducer<InnsynsdataType, InnsynsdataActionType & VedleggActionType> = (state = initialState, action) => {
    switch (action.type) {
        case InnsynsdataActionTypeKeys.SETT_FIKSDIGISOSID:
            return {
                ...state,
                fiksDigisosId: action.fiksDigisosId
            };
        case InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI:
            return {
                ...setPath(state, action.sti, action.verdi)
            };
        case InnsynsdataActionTypeKeys.SETT_REST_STATUS:
            return {
                ...setPath(state, "restStatus/" + action.sti, action.restStatus)
            };
        case InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_OPPLASTING:
            return {
                ...state,
                oppgaver: state.oppgaver.map((item) => {
                    if (item.dokumenttype === action.oppgave.dokumenttype &&
                            item.tilleggsinformasjon === action.oppgave.tilleggsinformasjon) {
                        return {
                            ...item,
                            filer: [...(item.filer ? item.filer : []), action.fil]
                        }
                    }
                    return item;
                })
            };
        case InnsynsdataActionTypeKeys.FJERN_FIL_FOR_OPPLASTING:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave) => {
                    if (oppgave.dokumenttype === action.oppgave.dokumenttype) {
                        return {
                            ...oppgave,
                            filer: (oppgave.filer && oppgave.filer.filter((fil: Fil, index: number) => {
                                if (action.fil && fil.filnavn === action.fil.filnavn) {
                                    return false;
                                }
                                return true;
                            }))
                        }
                    }
                    return oppgave;
                })
            };
        case InnsynsdataActionTypeKeys.SETT_STATUS_FOR_FIL:
            return {
                ...state,
                oppgaver: state.oppgaver.map((oppgave) => {
                    return {
                        ...oppgave,
                        filer: (oppgave.filer && oppgave.filer.map((fil: Fil) => {
                            if (fil.filnavn === action.fil.filnavn) {
                                return {
                                    ...fil,
                                    status: action.status
                                };
                            }
                            return fil;
                        }))
                    }
                })
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
                    filer: [...(state.ettersendelse.filer ? state.ettersendelse.filer : []), action.fil]
                }
            };
        }
        case InnsynsdataActionTypeKeys.FJERN_FIL_FOR_ETTERSENDELSE:
            return {
                ...state,
                ettersendelse: {
                    ...state.ettersendelse,
                    filer: state.ettersendelse.filer.filter((fil: Fil) => {
                        return !(action.fil && fil.filnavn === action.fil.filnavn);
                    })
                }
            };
        case InnsynsdataActionTypeKeys.SETT_STATUS_FOR_ETTERSENDELSESFIL:
            return {
                ...state,
                ettersendelse: {
                    ...state.ettersendelse,
                    filer: state.ettersendelse.filer.filter((fil: Fil) => {
                        return !(fil.filnavn === action.fil.filnavn && action.status === "OK");
                    })
                }
            };

        default:
            return state;
    }
};

export const oppdaterInnsynsdataState = (sti: InnsynsdataSti, verdi: any): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI,
        sti,
        verdi
    }
};

export const settRestStatus = (sti: InnsynsdataSti, restStatus: REST_STATUS): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.SETT_REST_STATUS,
        sti,
        restStatus
    }
};

export default InnsynsdataReducer;
