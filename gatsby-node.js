const path = require("path");
const { createOpenGraphImage } = require("gatsby-plugin-open-graph-images");

/**
 * @type import('gatsby').GatsbyNode['createPages']
 */
exports.createPages = async (gatsbyContext) => {
	const { actions, graphql } = gatsbyContext;
	const { createPage } = actions;

	const { data } = await graphql(`
		query {
			github {
				organization(login: "prismicio") {
					repositories(first: 10) {
						nodes {
							name
							owner {
								login
							}
						}
					}
				}
			}
		}
	`);

	for (const repository of data.github.organization.repositories.nodes) {
		createPage({
			path: `${repository.owner.login}/${repository.name}`,
			component: path.resolve("./src/templates/repository.og-image.tsx"),
			context: {
				repositoryOwner: repository.owner.login,
				repositoryName: repository.name,
			},
		});

		createOpenGraphImage(createPage, {
			path: `${repository.owner.login}/${repository.name}/og-image.png`,
			component: path.resolve("./src/templates/repository.og-image.tsx"),
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
};
