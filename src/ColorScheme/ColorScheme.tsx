import { ColorOnColor } from "./ColorOnColor";
import { LabelledColor } from "./LabelledColor";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { ColorTools, type MaterialFoundationTheme, type ViewColor } from "../ColorTools";
import { CreateViewColor, SchemeColor } from "./SchemeColorNameMap";
import type { Scheme } from "@material/material-color-utilities";
import { SchemeMode } from "../Index/IndexRoot";


interface SchemeEntityColorOnColor {
	type: "ColorOnColor"
	gridArea: string;
	color: ViewColor;
	onColor: ViewColor;
}

interface SchemeEntitySolo {
	type: "SoloColor"
	gridArea: string;
	color: ViewColor;
}

type SchemeEntity = SchemeEntityColorOnColor | SchemeEntitySolo;

const CreateColorEntities = (scheme: Scheme): SchemeEntity[] => {
	return [
		{ color: CreateViewColor(scheme, SchemeColor.primary), onColor: CreateViewColor(scheme, SchemeColor.onPrimary), gridArea: "1/1/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.primaryContainer), onColor: CreateViewColor(scheme, SchemeColor.onPrimaryContainer), gridArea: "4/1/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.secondary), onColor: CreateViewColor(scheme, SchemeColor.onSecondary), gridArea: "1/3/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.secondaryContainer), onColor: CreateViewColor(scheme, SchemeColor.onSecondaryContainer), gridArea: "4/3/span 3/span 2", type: "ColorOnColor" },

		{ color: CreateViewColor(scheme, SchemeColor.tertiary), onColor: CreateViewColor(scheme, SchemeColor.onTertiary), gridArea: "1/5/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.tertiaryContainer), onColor: CreateViewColor(scheme, SchemeColor.onTertiaryContainer), gridArea: "4/5/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.error), onColor: CreateViewColor(scheme, SchemeColor.onError), gridArea: "1/7/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.errorContainer), onColor: CreateViewColor(scheme, SchemeColor.onErrorContainer), gridArea: "4/7/span 3/span 2", type: "ColorOnColor" },

		{ color: CreateViewColor(scheme, SchemeColor.surface), onColor: CreateViewColor(scheme, SchemeColor.onSurface), gridArea: "7/1/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.surfaceVariant), onColor: CreateViewColor(scheme, SchemeColor.onSurfaceVariant), gridArea: "7/3/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.inverseSurface), onColor: CreateViewColor(scheme, SchemeColor.inverseOnSurface), gridArea: "7/5/span 3/span 2", type: "ColorOnColor" },
		{ color: CreateViewColor(scheme, SchemeColor.inversePrimary), gridArea: "7/7/span 2/span 2", type: "SoloColor" },

		{ color: CreateViewColor(scheme, SchemeColor.outline), gridArea: "10/1/span 1/span 2", type: "SoloColor" },
		{ color: CreateViewColor(scheme, SchemeColor.outlineVariant), gridArea: "10/3/span 1/span 2", type: "SoloColor" },
		{ color: CreateViewColor(scheme, SchemeColor.scrim), gridArea: "10/5/span 1/span 2", type: "SoloColor" },
		{ color: CreateViewColor(scheme, SchemeColor.shadow), gridArea: "10/7/span 1/span 2", type: "SoloColor" },
	];
};


interface ColorSchemeProps {
	mode: SchemeMode;
	theme: MaterialFoundationTheme;
}

export function ColorScheme(props: ColorSchemeProps) {
	const entities = useMemo(() => CreateColorEntities(props.theme.schemes[props.mode]), [props.theme, props.mode]);
	const bgColor = ColorTools.HexFromArgb(props.theme.schemes[props.mode].surface);
	return (
		<Box sx={(t) => ({
			"& .schemeBg": {
				borderRadius: "4px",
				border: `1px solid ${t.palette.divider}`,
				bgcolor: bgColor,
				overflow: "hidden",
			},
			"& .schemeGrid": {
				borderRadius: 2,
				aspectRatio: "16/9",
				m: 2,
				gap: 1.5,
				display: "grid",
				gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
				gridAutoRows: "1fr",
			},
		})} className={clsx("scheme", `scheme-${props.mode}`)}>
			<div className="schemeBg">
				<div className="schemeGrid">
					{entities.map((entity) => <SchemeEntityComponentFactory key={entity.color.colorName} entity={entity} />)}
				</div>
			</div>
		</Box>
	);
}

function SchemeEntityComponentFactory(props: { entity: SchemeEntity }) {
	switch (props.entity.type) {
		case "ColorOnColor":
			return <ColorOnColor {...props.entity} />;
		case "SoloColor":
			return <LabelledColor variant="solo" {...props.entity} />;
		default:
			// @ts-expect-error entity.type is never
			throw new Error(`Unknown type ${props.entity.type}`);
	}
}

