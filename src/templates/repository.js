import * as React from "react";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

export default function RepositoryTemplate({ data }) {
	const repository = data.github.repository;
	const { siteURL } = useSiteMetadata();
	const ogImagePath = [
		siteURL,
		repository.owner.login,
		repository.name,
		"og-image.png",
	].join("/");

	return (
		<Layout>
			<OpenGraphImage
				path={ogImagePath}
				size={{
					width: 600,
					height: 300,
				}}
			/>
		</Layout>
	);
}

export const query = graphql`
	query ($repositoryOwner: String!, $repositoryName: String!) {
		github {
			repository(owner: $repositoryOwner, name: $repositoryName) {
				name
				owner {
					login
				}
			}
		}
	}
`;
