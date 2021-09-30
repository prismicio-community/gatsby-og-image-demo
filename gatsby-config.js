require("dotenv").config();

module.exports = {
	siteMetadata: {
		siteUrl: "https://gatsby-og-image-demo.netlify.app",
		title: "gatsby-og-image-demo",
	},
	plugins: [
		"gatsby-plugin-postcss",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-open-graph-images",
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "blog",
				path: `${__dirname}/src/blog`,
			},
		},
		{
			resolve: "gatsby-source-graphql",
			options: {
				typeName: "GitHub",
				fieldName: "github",
				url: "https://api.github.com/graphql",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			},
		},
	],
};
