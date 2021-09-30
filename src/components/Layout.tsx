import * as React from "react";

type LayoutProps = {
	children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
	return <main>{children}</main>;
};
