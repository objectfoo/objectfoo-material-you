import clsx from "clsx";
import styles from "./FooButton.module.css";
import rounding from "./Rounding.module.css";
import { RoundingVariants } from "./Rounding";


interface FooButtonProps {
	children: React.ReactNode;
	rounding?: RoundingVariants;
	color?: string;
	onColor?: string;
}

export function FooButton(props: FooButtonProps): JSX.Element {
	const cn = clsx(
		styles.root,
		rounding[props.rounding as string] ?? null
	);
	return <button className={cn}>{props.children}</button>;
}
