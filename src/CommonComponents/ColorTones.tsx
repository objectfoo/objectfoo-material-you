import Box from "@mui/material/Box";
import ColorTools from "../ColorTools";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";
import type { TonalPalette } from "@material/material-color-utilities"; 
import Typography from "@mui/material/Typography";


const DisplayTones = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 95, 98, 99, 100 ];

export function ColorTones(props: { sx?: SxProps<Theme>; palette: TonalPalette; label: string; }) {
	return (
		<Box sx={[Styles, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
			<Typography gutterBottom variant="body1" className="tonesLabel">{props.label}</Typography>
			<Stack direction="row" spacing="1px">
				{DisplayTones.map((tone) => {
					const color = props.palette.tone(tone);
					const onColor = ColorTools.GetContrastTextArgb(color);
					return (
						<div key={tone} style={ColorTools.InlineColorVars(color, onColor)} className="swatch">
							<Typography className="swatchLabel">{tone}</Typography>
						</div>
					);
				})}
			</Stack>
		</Box>
	);
}

const Styles = (t: Theme): SystemStyleObject<Theme> => ({
	"& .MuiStack-root": {
		backgroundColor: t.palette.grey[300],
		overflow: "hidden",
		borderRadius: "3px",
	},
	"& .swatch": {
		aspectRatio: "3/4",
		display: "flex",
		alignItems: "flex-end",
		flexGrow: 1,
		backgroundColor: "var(--mu-main-color)",
		color: "var(--mu-alternate-color)",
	},
	"& .swatchLabel": {
		m: .75,
		fontSize: 12,
	},
});
