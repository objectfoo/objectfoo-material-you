import { Observable } from "@residualeffect/reactor";
import ColorTools from "./ColorTools";


export default class AppService {
	constructor() {
		this.CurrentHex = new Observable<string>(AppService.DefaultColor);
		this.CurrentArgb = new Observable<number>(0);
	}

	public LoadHexColor(c: string) {
		const color = c.replace(/#/g, "");
		if (color.length === 6) {
			this.CurrentHex.Value = `#${color}`;
			this.CurrentArgb.Value = ColorTools.ArgbFromHex(color);
		}
	}

	public Reset() {
		this.CurrentHex.Value = AppService.DefaultColor;
	}

	public CurrentHex: Observable<string>;
	public CurrentArgb: Observable<number>;

	private static DefaultColor = "#3557FF";
}
