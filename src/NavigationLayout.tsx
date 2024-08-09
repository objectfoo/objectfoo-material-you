import { Link as RouterLink, Outlet } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export function NavigationLayout() {
	const navContext = UseNavigationService();
	const { isRoot, pageTitle } = navContext;

	return (
		<Stack spacing={4} sx={{ pt: 5,
			px: 3,
			pb: 5,
			mx: "auto",
			bgcolor: "grey.100",
			minWidth: "900px",
			maxWidth: "1200px" }}>
			<Stack spacing={1} direction="row" alignItems="center">
				{!isRoot && (
					<Button size="small" color="inherit" component={RouterLink} to={"/"} sx={{ borderRadius: "3px", p: 1, minWidth: "unset" }} variant="text" aria-label="Home">
						<ArrowBackIosNewIcon fontSize="small" />
					</Button>
				)}
				<Typography flexGrow={1} variant="h4" component="h1">{pageTitle}</Typography>
			</Stack>
			<Outlet context={navContext}/>
		</Stack>
	);
}


interface NavigationState {
	isRoot: boolean;
	pageTitle: string;
}

export interface NavigationContext extends NavigationState {
	updateTitle: (suffix?: string) => void;
}


function UseNavigationService(): NavigationContext {
	const [navState, setNavState] = useState<NavigationState>({ isRoot: true, pageTitle: BasePageTitle });
	const { isRoot, pageTitle } = navState;

	const updateTitle = useCallback((suffix?: string) => {
		document.title = RenderTitle(suffix ?? null, true);
		setNavState(() => ({ isRoot: suffix === undefined, pageTitle: RenderTitle(suffix ?? null) }));
	}, []);

	const NavContext = useMemo<NavigationContext>(() => ({
		updateTitle,
		pageTitle,
		isRoot,
	}), [updateTitle, pageTitle, isRoot]);

	return NavContext;
}


const BasePageTitle = "Material You";
const RenderTitle = (suffix: string | null, isWindow?: boolean): string => (
	suffix === null
		? BasePageTitle
		: isWindow === true
			? `${suffix} - ${BasePageTitle}`
			: `${BasePageTitle} - ${suffix}`
);
