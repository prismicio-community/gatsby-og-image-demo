import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql, PageProps } from "gatsby";
import OpenGraphImage from "gatsby-plugin-open-graph-images/OpenGraphImage.jsx";

import { GitHubRepositoryTemplateQuery } from "../types.generated";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

export default function RepositoryTemplate({
	data,
}: PageProps<GitHubRepositoryTemplateQuery>): JSX.Element {
	const repository = data.github.repository;

	const { siteUrl } = useSiteMetadata();
	const localOgImagePath = `/__generated/github${repository?.owner.login}${repository?.name}og-image.png/`;
	const ogImagePath = `${siteUrl}/github/${repository?.owner.login}/${repository?.name}/og-image.png`;

	return (
		<main>
			<Helmet>
				<meta
					property="og:title"
					content={`${repository?.owner.login}/${repository?.name}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
			</Helmet>
			<OpenGraphImage
				path={ogImagePath}
				size={{
					width: 600,
					height: 300,
				}}
			/>
			<div className="grid gap-4 p-8 mx-auto max-w-xl">
				<p>
					This page for the GitHub repository{" "}
					<strong>
						{repository?.owner.login}/{repository?.name}
					</strong>{" "}
					has an Open Graph image! When it is shared on social media platforms,
					like Twitter and Facebook, a bespoke image will be shown.
				</p>
				<p>
					<Link to={localOgImagePath} className="text-blue-600 underline">
						See the page used to generate the image
					</Link>
				</p>
				<p>
					The Open Graph image URL contains your full domain and will only work
					if the project is built and deployed.
				</p>
				<p>
					<a href={ogImagePath} className="text-blue-600 underline">
						Open the image
					</a>
				</p>
			</div>
		</main>
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
