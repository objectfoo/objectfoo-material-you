import type { Scheme } from "@material/material-color-utilities";
import { ViewColor } from "../ColorTools";

export enum SchemeColor {
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer",
	"secondary",
	"onSecondary",
	"secondaryContainer",
	"onSecondaryContainer",
	"tertiary",
	"onTertiary",
	"tertiaryContainer",
	"onTertiaryContainer",
	"error",
	"onError",
	"errorContainer",
	"onErrorContainer",
	"background",
	"onBackground",
	"surface",
	"onSurface",
	"surfaceVariant",
	"onSurfaceVariant",
	"outline",
	"outlineVariant",
	"shadow",
	"scrim",
	"inverseSurface",
	"inverseOnSurface",
	"inversePrimary"
}

export default function CreateViewColor(scheme: Scheme, id: SchemeColor): ViewColor {
	if (!ColorNameMap.has(id)) {
		throw new Error(`Unknown color map id ${id}`);
	}
	const cd = ColorNameMap.get(id)!;

	return {
		color: cd.get(scheme),
		colorName: cd.name,
		paletteId: cd.paletteId,
	};
}

export type ColorData = {
	get: (s: Scheme) => number,
	name: string;
	paletteId: SchemeColor;
};

const ColorNameMap: Map<SchemeColor, ColorData> = new Map();

ColorNameMap.set(SchemeColor.primary, { get: (s) => s.primary, name: "Primary", paletteId: SchemeColor.primary });
ColorNameMap.set(SchemeColor.onPrimary, { get: (s) => s.onPrimary, name: "On Primary", paletteId: SchemeColor.onPrimary });
ColorNameMap.set(SchemeColor.primaryContainer, { get: (s) => s.primaryContainer, name: "Primary Container", paletteId: SchemeColor.primaryContainer });
ColorNameMap.set(SchemeColor.onPrimaryContainer, { get: (s) => s.onPrimaryContainer, name: "On Primary Container", paletteId: SchemeColor.onPrimaryContainer });
ColorNameMap.set(SchemeColor.secondary, { get: (s) => s.secondary, name: "Secondary", paletteId: SchemeColor.secondary });
ColorNameMap.set(SchemeColor.onSecondary, { get: (s) => s.onSecondary, name: "On Secondary", paletteId: SchemeColor.onSecondary });
ColorNameMap.set(SchemeColor.secondaryContainer, { get: (s) => s.secondaryContainer, name: "Secondary Container", paletteId: SchemeColor.secondaryContainer });
ColorNameMap.set(SchemeColor.onSecondaryContainer, { get: (s) => s.onSecondaryContainer, name: "On Secondary Container", paletteId: SchemeColor.onSecondaryContainer });
ColorNameMap.set(SchemeColor.tertiary, { get: (s) => s.tertiary, name: "Tertiary", paletteId: SchemeColor.tertiary });
ColorNameMap.set(SchemeColor.onTertiary, { get: (s) => s.onTertiary, name: "On Tertiary", paletteId: SchemeColor.onTertiary });
ColorNameMap.set(SchemeColor.tertiaryContainer, { get: (s) => s.tertiaryContainer, name: "Tertiary Container", paletteId: SchemeColor.tertiaryContainer });
ColorNameMap.set(SchemeColor.onTertiaryContainer, { get: (s) => s.onTertiaryContainer, name: "On Tertiary Container", paletteId: SchemeColor.onTertiaryContainer });
ColorNameMap.set(SchemeColor.error, { get: (s) => s.error, name: "Error", paletteId: SchemeColor.error });
ColorNameMap.set(SchemeColor.onError, { get: (s) => s.onError, name: "On Error", paletteId: SchemeColor.onError });
ColorNameMap.set(SchemeColor.errorContainer, { get: (s) => s.errorContainer, name: "Error Container", paletteId: SchemeColor.errorContainer });
ColorNameMap.set(SchemeColor.onErrorContainer, { get: (s) => s.onErrorContainer, name: "On Error Container", paletteId: SchemeColor.onErrorContainer });
ColorNameMap.set(SchemeColor.background, { get: (s) => s.background, name: "Background", paletteId: SchemeColor.background });
ColorNameMap.set(SchemeColor.onBackground, { get: (s) => s.onBackground, name: "On Background", paletteId: SchemeColor.onBackground });
ColorNameMap.set(SchemeColor.surface, { get: (s) => s.surface, name: "Surface", paletteId: SchemeColor.surface });
ColorNameMap.set(SchemeColor.onSurface, { get: (s) => s.onSurface, name: "On Surface", paletteId: SchemeColor.onSurface });
ColorNameMap.set(SchemeColor.surfaceVariant, { get: (s) => s.surfaceVariant, name: "Surface Variant", paletteId: SchemeColor.surfaceVariant });
ColorNameMap.set(SchemeColor.onSurfaceVariant, { get: (s) => s.onSurfaceVariant, name: "On Surface Variant", paletteId: SchemeColor.onSurfaceVariant });
ColorNameMap.set(SchemeColor.outline, { get: (s) => s.outline, name: "Outline", paletteId: SchemeColor.outline });
ColorNameMap.set(SchemeColor.outlineVariant, { get: (s) => s.outlineVariant, name: "Outline Variant", paletteId: SchemeColor.outlineVariant });
ColorNameMap.set(SchemeColor.shadow, { get: (s) => s.shadow, name: "Shadow", paletteId: SchemeColor.shadow });
ColorNameMap.set(SchemeColor.scrim, { get: (s) => s.scrim, name: "Scrim", paletteId: SchemeColor.scrim });
ColorNameMap.set(SchemeColor.inverseSurface, { get: (s) => s.inverseSurface, name: "Inverse Surface", paletteId: SchemeColor.inverseSurface });
ColorNameMap.set(SchemeColor.inverseOnSurface, { get: (s) => s.inverseOnSurface, name: "Inverse On Surface", paletteId: SchemeColor.inverseOnSurface });
ColorNameMap.set(SchemeColor.inversePrimary, { get: (s) => s.inversePrimary, name: "Inverse Primary", paletteId: SchemeColor.inversePrimary });
