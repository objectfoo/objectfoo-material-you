export type RoundOptions = "full" | "xl-top" | "xl" | "lg-top"
	| "lg-end" | "lg-start" | "lg" | "md" | "sm" | "xs-top" | "xs" | "none";


const RoundOptionMap = new Map<RoundOptions, string | undefined>([
	["full", "48px"],
	["xl-top", ""],
	["xl", ""],
	["lg-top", ""],
	["lg-end", ""],
	["lg-start", ""],
	["lg", ""],
	["md", "12px"],
	["sm", ""],
	["xs-top", "4px 0 4px 0"],
	["xs", "4px"],
	["none", undefined],
]);


export const RoundToPx = (option: RoundOptions): string | undefined => {
	return RoundOptionMap.get(option);
};
