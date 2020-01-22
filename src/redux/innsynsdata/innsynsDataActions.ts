import {Dispatch} from "redux";
import {fetchToJson, HttpStatus, REST_STATUS} from "../../utils/restUtils";
import {
    InnsynsdataActionTypeKeys,
    InnsynsdataSti,
    oppdaterInnsynsdataState,
    oppdaterSaksdetaljerRestStatus,
    oppdaterSaksdetaljerState,
    settRestStatus,
    skalViseFeilside
} from "./innsynsdataReducer";

export const innsynsdataUrl = (fiksDigisosId: string, sti: string): string => `/innsyn/${fiksDigisosId}/${sti}`;

export function hentInnsynsdata(fiksDigisosId: string|string, sti: InnsynsdataSti, visFeilSide?: boolean) {
    return (dispatch: Dispatch) => {
        dispatch(settRestStatus(sti, REST_STATUS.PENDING));
        let url = innsynsdataUrl(fiksDigisosId, sti);
        fetchToJson(url).then((response: any) => {
            dispatch(oppdaterInnsynsdataState(sti, response));
            dispatch(settRestStatus(sti, REST_STATUS.OK));
        }).catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                dispatch(settRestStatus(sti, REST_STATUS.UNAUTHORIZED));
            } else {
                dispatch(settRestStatus(sti, REST_STATUS.FEILET));
                dispatch(skalViseFeilside(true));
            }
        });
    }
}

export function hentSaksdata(sti: InnsynsdataSti, visFeilSide?: boolean) {
    return (dispatch: Dispatch) => {
        dispatch(settRestStatus(sti, REST_STATUS.PENDING));
        let url = "/innsyn/" + sti;
        fetchToJson(url).then((response: any) => {
            dispatch(oppdaterInnsynsdataState(sti, response));
            dispatch(settRestStatus(sti, REST_STATUS.OK));
        }).catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                dispatch(settRestStatus(sti, REST_STATUS.UNAUTHORIZED));
            } else if(reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
                dispatch(settRestStatus(sti, REST_STATUS.SERVICE_UNAVAILABLE));
            } else {
                dispatch(settRestStatus(sti, REST_STATUS.FEILET));
                if (visFeilSide !== false) {
                    dispatch(skalViseFeilside(true));
                }
            }
        });
    }
}

export function hentSaksdetaljer(fiksDigisosId: string, visFeilSide?: boolean) {
    return (dispatch: Dispatch) => {
        dispatch(oppdaterSaksdetaljerRestStatus(fiksDigisosId, REST_STATUS.PENDING));
        let url = "/innsyn/saksDetaljer?id=" + fiksDigisosId;
        fetchToJson(url).then((response: any) => {
            dispatch(oppdaterSaksdetaljerState(fiksDigisosId, response));
        }).catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                dispatch(oppdaterSaksdetaljerRestStatus(fiksDigisosId, REST_STATUS.UNAUTHORIZED));
            } else {
                dispatch(oppdaterSaksdetaljerRestStatus(fiksDigisosId, REST_STATUS.FEILET));
                if (visFeilSide !== false) {
                    dispatch(skalViseFeilside(true));
                }
            }
        });
    }
}

export const setOppgaveVedleggopplastingFeilet = (status: boolean) => ({
    type: InnsynsdataActionTypeKeys.OPPGAVE_VEDLEGSOPPLASTING_FEILET,
        status: status
});
