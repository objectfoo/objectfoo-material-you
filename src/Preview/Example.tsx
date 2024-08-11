import { useOutletContext } from "react-router-dom";
import { Home } from "./Examples/Home";
import { PreviewOutletContext } from "./Preview";

export function Example(): JSX.Element {
	const ctx: PreviewOutletContext = useOutletContext();
	return (
		<div>
			<p>{`Example for #${ctx.color}`}</p>
			<Home />
		</div>
	);
}
