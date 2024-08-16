import TextField from "@mui/material/TextField";


export function ReadOnlyTextField(props: { value: string | number; label: string; }) {
	return (
		<TextField
			sx={{ width: 120 }}
			size="small"
			margin="none"
			variant="standard"
			aria-readonly
			InputLabelProps={{ shrink: true }}
			label={props.label}
			value={props.value}
			onChange={() => { /* readonly */ }} />
	);
}
