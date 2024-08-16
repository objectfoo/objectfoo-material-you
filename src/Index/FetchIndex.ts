import ColorTools from "../ColorTools";

export type IndexViewData = {
	hex: string;
	argb: number;
};

const defaultColor = "#3557FF";

export async function FetchIndex(request: Request): Promise<IndexViewData> {
	const initialColor = GetInitialColor(request);
	await new Promise((r) => setTimeout(r, 300));

	return TransformInitialData(initialColor);
}

function GetInitialColor(request: Request): string {
	const url = new URL(request.url);
	const q = url.searchParams.get("initialColor");
	const initialColor = q !== null ? `#${q}` : defaultColor;
	return initialColor;
}

async function TransformInitialData(hexColor: string): Promise<IndexViewData> {
	return {
		hex: hexColor,
		argb: ColorTools.ArgbFromHex(hexColor),
	};
};
