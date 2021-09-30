const path = require("path");
const { createOpenGraphImage } = require("gatsby-plugin-open-graph-images");

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

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

	for (const repository of data.github.organization.repositories.nodes) {
		createPage({
			path: `/github/${repository.owner.login}/${repository.name}`,
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

	for (const blogFile of data.allFile.nodes) {
		createPage({
			path: `/devto/${blogFile.name}`,
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

	for (const blogFile of data.allFile.nodes) {
		createPage({
			path: `/gatsby/${blogFile.name}`,
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
