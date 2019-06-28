import React from 'react';
import Historikk from "../components/historikk/Historikk";
import SoknadsStatus, { SoknadsStatusEnum } from "../components/soknadsStatus/SoknadsStatus";
import Oppgaver from "../components/oppgaver/Oppgaver";
import VedleggUtbetalingerLenker from "../components/vedleggUtbetalingerLenker/VedleggUtbetalingerLenker";

const UnderBehandling: React.FC = () => {

	return (
		<>
			<SoknadsStatus
				status={SoknadsStatusEnum.UNDER_BEHANDLING}
				detaljer={[
					{
						beskrivelse: "Beskrivelse",
						detaljer: "Detaljer",
						status: "INNVILGET"
					}
				]}
			/>

			<Oppgaver>
				Du har ingen oppgaver. Du vil få beskjed hvis det er noe du må gjøre.
			</Oppgaver>

			<VedleggUtbetalingerLenker />

			<Historikk
				historikk={[
					{
						tittel: "19.06.2019 klokken 17:56",
						innhold: <span>Søknaden med vedlegg er sendt til NAV Sagene, Oslo kommune</span>
					},
					{
						tittel: "20.06.2019 klokken 20:19",
						innhold: <span>Søknaden med vedlegg er sendt til videre NAV Vestre Aker, Oslo kommune</span>
					},
					{
						tittel: "21.06.2019 klokken 12:02",
						innhold: <span>Søknaden er mottatt av NAV Vestre Aker, Oslo kommune</span>
					}


				]}
			/>
		</>
	);
};

export default UnderBehandling;
