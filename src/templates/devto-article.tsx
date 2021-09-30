import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql, PageProps } from "gatsby";
import OpenGraphImage from "gatsby-plugin-open-graph-images/OpenGraphImage.jsx";

import { DevtoArticleQuery } from "../types.generated";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

type RepositoryTemplateProps = PageProps<DevtoArticleQuery>;

export default function RepositoryTemplate({
	data,
}: RepositoryTemplateProps): JSX.Element {
	const file = data.file;
	const frontmatter = file?.childMarkdownRemark?.frontmatter;

	const { siteUrl } = useSiteMetadata();
	const localOgImagePath = `/__generated/devto${file?.name}og-image.png`;
	const ogImagePath = `${siteUrl}/devto/${file?.name}/og-image.png`;

	return (
		<main>
			<Helmet>
				<meta property="og:title" content={frontmatter?.title} />
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
				<h1>
					This page for a mock DEV article named{" "}
					<strong>{frontmatter?.title}</strong> has an Open Graph image! When it
					is shared on social media platforms, like Twitter and Facebook, a
					bespoke image will be shown.
				</h1>
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
	query DevtoArticle($id: String!) {
		file(id: { eq: $id }) {
			name
			childMarkdownRemark {
				frontmatter {
					title
				}
			}
		}
	}
`;
