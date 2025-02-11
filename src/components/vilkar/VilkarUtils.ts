import {SaksStatusState} from "../../redux/innsynsdata/innsynsdataReducer";

export const harSakMedInnvilgetEllerDelvisInnvilget = (
    innsynSaksStatusStateListe: SaksStatusState[] | undefined
): boolean => {
    return (
        innsynSaksStatusStateListe !== undefined &&
        Array.isArray(innsynSaksStatusStateListe) &&
        innsynSaksStatusStateListe.filter((saksStatusState: SaksStatusState) => saksStatusState.skalViseVedtakInfoPanel)
            .length > 0
    );
};
