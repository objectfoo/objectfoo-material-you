import { getContrastRatio } from "@mui/system";
import { Theme as MaterialFoundationTheme, argbFromHex, hexFromArgb, themeFromSourceColor } from "@material/material-color-utilities";
import { SchemeColor } from "./ColorScheme/SchemeColorNameMap";


export default class ColorTools {
	public static ArgbFromHex(s: string): number {
		return argbFromHex(s);
	}

	public static HexFromArgb(n: number) {
		return hexFromArgb(n);
	}

	// TODO: CACHE?? is this expensive?
	public static ThemeFromSourceColor(argb: number): MaterialFoundationTheme {
		return themeFromSourceColor(argb);
	}

	public static GetContrastTextArgb(argb: number): number {
		const color = ColorTools.HexFromArgb(argb);

		const white = getContrastRatio(color, "#FFFFFF");
		const black = getContrastRatio(color, "#000000");

		return white > black ? ColorTools.WHITE : ColorTools.BLACK;
	}

	public static GetContrastTextHex(color: string): string {
		const white = getContrastRatio(color, "#FFFFFF");
		const black = getContrastRatio(color, "#000000");

		return white > black ? "#FFFFFF" : "#000000";
	}


	public static InlineColorVars(color: number, onColor: number): React.CSSProperties {
		return {
			"--mu-main-color": ColorTools.HexFromArgb(color),
			"--mu-alternate-color": ColorTools.HexFromArgb(onColor),
		} as React.CSSProperties;
	}

	// take a string #AABBCC or #ABC and return AABBCC
	public static HexForUrl(x: string, fallback: string): string {
		const color = x.replace(/#/g, "");

		// TODO: regex for hex chars and other validation
		return color.length === 6
			? color
			: color.length === 3
				? [
					color[0].repeat(2),
					color[1].repeat(2),
					color[2].repeat(2),
				].join()
				: fallback;
	}

	public static WHITE = ColorTools.ArgbFromHex("#FFFFFF");
	public static BLACK = ColorTools.ArgbFromHex("#000000");
}

export interface ViewColor {
	color: number;
	colorName: string;
	paletteId?: SchemeColor;
}
