require("dotenv").config();

module.exports = {
	siteMetadata: {
		// The deployed site's URL. This will be used for our Open Graph image URLs.
		siteUrl: "https://gatsby-og-image-demo.netlify.app",
		title: "gatsby-og-image-demo",
	},
	plugins: [
		// This plugin generates Open Graph images created in `gatsby-node.js`.
		"gatsby-plugin-open-graph-images",

		// The following plugins allow us to query GitHub and our local Markdown files.
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

		// The following plugins setup Gatsby for PostCSS, setting <head> elements,
		// and converting Markdown files to HTML.
		"gatsby-plugin-postcss",
		"gatsby-plugin-react-helmet",
		"gatsby-transformer-remark",
	],
};
