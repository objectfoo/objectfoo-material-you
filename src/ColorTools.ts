import { getContrastRatio } from "@mui/system";
import { Theme as MaterialFoundationTheme, argbFromHex, hexFromArgb, themeFromSourceColor } from "@material/material-color-utilities";


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

	public static GetContrastTextArgb(argb: number) : number {
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

	public static WHITE = ColorTools.ArgbFromHex("#FFFFFF");
	public static BLACK = ColorTools.ArgbFromHex("#000000");
}

export interface ViewColor {
	color: number;
	colorName: string;
	paletteId?: string;
}
