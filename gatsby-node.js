const path = require("path");
const { createOpenGraphImage } = require("gatsby-plugin-open-graph-images");

/**
 * @type import('gatsby').GatsbyNode['createPages']
 */
exports.createPages = async (gatsbyContext) => {
	const { actions } = gatsbyContext;
	const { createPage } = actions;

	createPage({
		path: "/og-image-test",
		component: path.resolve("./src/templates/index.og-image.tsx"),
	});

	createOpenGraphImage(createPage, {
		path: "/og-image/index.png",
		component: path.resolve("./src/templates/index.og-image.tsx"),
		size: {
			width: 1200,
			height: 600,
		},
	});
};
