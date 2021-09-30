import * as React from "react";
import { graphql, PageProps } from "gatsby";
import OpenGraphImage from "gatsby-plugin-open-graph-images/OpenGraphImage.jsx";

import { GitHubRepositoryTemplateQuery } from "../types.generated";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { Layout } from "../components/Layout";

export default function RepositoryTemplate({
	data,
}: PageProps<GitHubRepositoryTemplateQuery>): JSX.Element {
	const repository = data.github.repository;

	const { siteUrl } = useSiteMetadata();
	const ogImagePath = `${siteUrl}/${repository?.owner.login}/${repository?.name}/og-image.png`;

	return (
		<Layout>
			<OpenGraphImage
				path={ogImagePath}
				size={{
					width: 600,
					height: 300,
				}}
			/>
			<div className="grid gap-4 p-8 mx-auto max-w-xl">
				<h1>
					This page for the GitHub repository{" "}
					<strong>
						{repository?.owner.login}/{repository?.name}
					</strong>{" "}
					has an Open Graph image! When it is shared on social media platforms,
					like Twitter and Facebook, a bespoke image will be shown.
				</h1>
				<p>
					<a href={ogImagePath} className="text-blue-600 underline">
						Open the image
					</a>
				</p>
				<p>
					Note: The image URL contains your full domain and will only work if
					the project is built and deployed.
				</p>
			</div>
		</Layout>
	);
}

export const query = graphql`
	query GitHubRepositoryTemplate(
		$repositoryOwner: String!
		$repositoryName: String!
	) {
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
