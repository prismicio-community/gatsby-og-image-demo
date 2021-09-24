require("dotenv").config();

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "gatsby-og-image-test",
	},
	plugins: [
		"gatsby-plugin-postcss",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-open-graph-images",
		{
			resolve: "gatsby-source-graphql",
			options: {
				typeName: "GitHub",
				fieldName: "github",
				url: "https://api.github.com/graphql",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				batch: true,
			},
		},
	],
};
