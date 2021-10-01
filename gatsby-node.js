/**
 * This file queries for content and generates pages. For each generated page,
 * an Open Graph image is also generated using `gatsby-plugin-open-graph-images`.
 */

const path = require("path");
const { createOpenGraphImage } = require("gatsby-plugin-open-graph-images");

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	// Query for data from GitHub and our local Markdown files.
	const { data } = await graphql(`
		query {
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
					id
					name
					childMarkdownRemark {
						frontmatter {
							title
							author
						}
					}
				}
			}
		}
	`);

	// Create pages for each GitHub repository along with its Open Graph image.
	for (const repository of data.github.organization.repositories.nodes) {
		createPage({
			path: `/github/${repository.owner.login}/${repository.name}/`,
			component: path.resolve("./src/templates/github-repository.tsx"),
			context: {
				repositoryOwner: repository.owner.login,
				repositoryName: repository.name,
			},
		});

		createOpenGraphImage(createPage, {
			path: `/github/${repository.owner.login}/${repository.name}/og-image.png`,
			component: path.resolve("./src/templates/github-repository.og-image.tsx"),
			size: {
				width: 1200,
				height: 600,
			},
			context: {
				repositoryOwner: repository.owner.login,
				repositoryName: repository.name,
			},
		});
	}

	// Create pages for each blog post along with its Open Graph image.
	// These Open Graph images will appear like DEV Community's images.
	for (const blogFile of data.allFile.nodes) {
		createPage({
			path: `/devto/${blogFile.name}/`,
			component: path.resolve("./src/templates/devto-article.tsx"),
			context: {
				id: blogFile.id,
			},
		});

		createOpenGraphImage(createPage, {
			path: `/devto/${blogFile.name}/og-image.png`,
			component: path.resolve("./src/templates/devto-article.og-image.tsx"),
			size: {
				width: 1200,
				height: 600,
			},
			context: {
				id: blogFile.id,
			},
		});
	}

	// Create pages for each blog post along with its Open Graph image.
	// These Open Graph images will appear like Gatsby's Blog images.
	for (const blogFile of data.allFile.nodes) {
		createPage({
			path: `/gatsby/${blogFile.name}/`,
			component: path.resolve("./src/templates/gatsby-article.tsx"),
			context: {
				id: blogFile.id,
			},
		});

		createOpenGraphImage(createPage, {
			path: `/gatsby/${blogFile.name}/og-image.png`,
			component: path.resolve("./src/templates/gatsby-article.og-image.tsx"),
			size: {
				width: 1200,
				height: 600,
			},
			context: {
				id: blogFile.id,
			},
		});
	}
};
