/**
 * This page lists all the sample pages with a generated og:image for you to test.
 */

import * as React from "react";
import { graphql, PageProps, Link } from "gatsby";

import { IndexPageQuery } from "../types.generated";

type IndexPageProps = PageProps<IndexPageQuery>;

const IndexPage = ({ data }: IndexPageProps): JSX.Element => {
	const repositories = data.github.organization?.repositories.nodes;
	if (!repositories) {
		throw new Error("Repositories were not found");
	}

	const blogFiles = data.allFile.nodes;

	return (
		<main className="p-8 mx-auto max-w-xl">
			<h2 className="mb-4 font-sans text-3xl font-black tracking-tight">
				GitHub repositories
			</h2>
			<ul className="mb-8">
				{repositories.map(
					(repository) =>
						repository && (
							<li key={`/github/${repository.owner.login}/${repository.name}/`}>
								<Link
									to={`/github/${repository.owner.login}/${repository.name}/`}
									className="text-blue-600 underline"
								>
									{repository.owner.login}/{repository.name}
								</Link>
							</li>
						),
				)}
			</ul>
			<h2 className="mb-4 font-sans text-3xl font-black tracking-tight">
				DEV blog posts
			</h2>
			<ul className="mb-8">
				{blogFiles.map((blogFile) => (
					<li key={blogFile.name}>
						<Link
							to={`/devto/${blogFile.name}/`}
							className="text-blue-600 underline"
						>
							{blogFile.name}
						</Link>
					</li>
				))}
			</ul>
			<h2 className="mb-4 font-sans text-3xl font-black tracking-tight">
				Gatsby blog posts
			</h2>
			<ul>
				{blogFiles.map((blogFile) => (
					<li key={blogFile.name}>
						<Link
							to={`/gatsby/${blogFile.name}/`}
							className="text-blue-600 underline"
						>
							{blogFile.name}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
};

export default IndexPage;

export const query = graphql`
	query IndexPage {
		github {
			organization(login: "prismicio") {
				repositories(
					first: 10
					orderBy: { field: STARGAZERS, direction: DESC }
				) {
					nodes {
						name
						owner {
							login
						}
					}
				}
			}
		}
		allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
			nodes {
				name
			}
		}
	}
`;
