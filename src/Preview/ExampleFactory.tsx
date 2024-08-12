import { useOutletContext } from "react-router-dom";
import { Home } from "./Examples/Home";
import { PreviewOutletContext } from "./Preview";

// TODO: make some examples
export function ExampleFactory(): JSX.Element {
	const ctx: PreviewOutletContext = useOutletContext();
	// select a specific example page and render it
	return (
		<div>
			<p>{`Example for #${ctx.color}`}</p>
			<Home />
		</div>
	);
}
