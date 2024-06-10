import { ColorOnColor } from "./ColorOnColor";
import { LabelledColor } from "./LabelledColor";
import { type PaletteMode } from "@mui/material";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import ColorTools from "../ColorTools";
import SchemeColorNameMap, { SchemeColor } from "../SchemeColorNameMap";
import type { Scheme, Theme } from "@material/material-color-utilities";
import type { ViewColor } from "../ColorTools";


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
		{ color: SchemeColorNameMap(scheme, SchemeColor.primary), onColor: SchemeColorNameMap(scheme, SchemeColor.onPrimary), gridArea: "1/1/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.primaryContainer), onColor: SchemeColorNameMap(scheme, SchemeColor.onPrimaryContainer), gridArea: "4/1/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.secondary), onColor: SchemeColorNameMap(scheme, SchemeColor.onSecondary), gridArea: "1/3/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.secondaryContainer), onColor: SchemeColorNameMap(scheme, SchemeColor.onSecondaryContainer), gridArea: "4/3/span 3/span 2", type: "ColorOnColor" },

		{ color: SchemeColorNameMap(scheme, SchemeColor.tertiary), onColor: SchemeColorNameMap(scheme, SchemeColor.onTertiary), gridArea: "1/5/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.tertiaryContainer), onColor: SchemeColorNameMap(scheme, SchemeColor.onTertiaryContainer), gridArea: "4/5/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.error), onColor: SchemeColorNameMap(scheme, SchemeColor.onError), gridArea: "1/7/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.errorContainer), onColor: SchemeColorNameMap(scheme, SchemeColor.onErrorContainer), gridArea: "4/7/span 3/span 2", type: "ColorOnColor" },

		{ color: SchemeColorNameMap(scheme, SchemeColor.surface), onColor: SchemeColorNameMap(scheme, SchemeColor.onSurface), gridArea: "7/1/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.surfaceVariant), onColor: SchemeColorNameMap(scheme, SchemeColor.onSurfaceVariant), gridArea: "7/3/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.inverseSurface), onColor: SchemeColorNameMap(scheme, SchemeColor.inverseOnSurface), gridArea: "7/5/span 3/span 2", type: "ColorOnColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.inversePrimary), gridArea: "7/7/span 2/span 2", type: "SoloColor" },

		{ color: SchemeColorNameMap(scheme, SchemeColor.outline), gridArea: "10/1/span 1/span 2", type: "SoloColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.outlineVariant), gridArea: "10/3/span 1/span 2", type: "SoloColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.scrim), gridArea: "10/5/span 1/span 2", type: "SoloColor" },
		{ color: SchemeColorNameMap(scheme, SchemeColor.shadow), gridArea: "10/7/span 1/span 2", type: "SoloColor" },
	];
};

interface ColorSchemeProps {
	mode: PaletteMode;
	theme: Theme;
}

export default function ColorScheme(props: ColorSchemeProps) {
	const entities = useMemo(() => CreateColorEntities(props.theme.schemes[props.mode]), [props.theme, props.mode]);
	const bgColor = ColorTools.HexFromArgb(props.theme.schemes[props.mode].surface);
	return (
		<Box sx={(t) => ({
			"& .schemeBg": {
				borderRadius: "4px",
				border: `1px solid ${t.palette.divider}`,
				bgcolor: bgColor,
				overflowX: "auto",
			},
			"& .schemeGrid": {
				minWidth: 550,
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
					{entities.map((entity) => <SchemeEntityComponentFactory key={entity.color.colorName} entity={entity} /> )}
				</div>
			</div>
		</Box>
	);
}

function SchemeEntityComponentFactory(props: { entity:  SchemeEntity }) {
	switch (props.entity.type) {
		case "ColorOnColor":
			return <ColorOnColor {...props.entity} />;
		case "SoloColor":
			return <LabelledColor  variant="solo"  {...props.entity} />;
		default:
			//@ts-expect-error entity.type is never
			throw new Error(`Unknown type ${props.entity.type}`);
	}
}

