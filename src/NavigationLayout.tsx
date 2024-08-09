import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export function NavigationLayout() {
	const navContext = UseNavigationService();
	const { isRoot, pageTitle } = navContext;

	return (
		<Box id="layout-root" sx={{
			// m: [.5, 1, 3],
			display: "flex",
			justifyContent: "center",
			"& .layout-content": {
				maxWidth: 1200,
				flexGrow: 1,
				px: 3,
				py: 2,
			},
		}}>
			<div className="layout-content">
				<Stack direction="row" alignItems="center">
					<HomeLink isRoot={isRoot} />
					<Typography flexGrow={1} variant="h4" component="h1">{pageTitle}</Typography>
				</Stack>
				<Outlet context={navContext}/>
			</div>
		</Box>
	);
}


function HomeLink({ isRoot }: { isRoot: boolean; }): JSX.Element {
	return (
		<Collapse in={!isRoot} orientation="horizontal">
			<Button
				sx={{ borderRadius: "3px", p: 1, minWidth: 0, mr: 1 }}
				size="small"
				color="inherit"
				component={RouterLink}
				to={"/"}
				variant="text"
				aria-label="Home">
				<ArrowBackIosNewIcon fontSize="small" />
			</Button>
		</Collapse>
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
	const location = useLocation();
	const [navState, setNavState] = useState<NavigationState>({ isRoot: location.pathname === "/", pageTitle: BasePageTitle });
	const { isRoot, pageTitle } = navState;

	const updateTitle = useCallback((suffix?: string) => {
		document.title = RenderTitle(suffix ?? null, true);
		setNavState(() => ({
			isRoot: suffix === undefined,
			pageTitle: RenderTitle(suffix ?? null),
		}));
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
