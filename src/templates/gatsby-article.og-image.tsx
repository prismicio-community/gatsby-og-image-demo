import * as React from "react";
import { graphql, PageProps } from "gatsby";

import { GatsbyArticleOpenGraphImageQuery } from "../types.generated";

type GatsbyOpenGraphImageTemplateProps =
	PageProps<GatsbyArticleOpenGraphImageQuery>;

export default function RepositoryTemplate({
	data,
}: GatsbyOpenGraphImageTemplateProps): JSX.Element {
	const frontmatter = data.file?.childMarkdownRemark?.frontmatter;
	if (!frontmatter) {
		throw new Error("Article was not found");
	}

	return (
		<div className="min-h-screen bg-black">
			<div
				className="relative bg-white ring ring-red-500 p-14 overflow-hidden"
				style={{ width: 1200, height: 600 }}
			>
				<div className="absolute w-16 h-16 bg-green-500 rounded-full top-1/4 right-4" />
				<div className="absolute w-10 h-10 -mr-20 bg-yellow-500 rounded-full -mt-14 top-2/3 right-1/4" />
				<div className="absolute w-8 h-8 -mt-4 bg-yellow-200 rounded-full top-2/3 right-6" />
				<div className="absolute top-0 w-4 h-4 -mt-1 -mr-32 bg-blue-500 rounded-full right-1/4" />
				<div className="absolute top-0 w-12 h-12 -mt-10 -ml-20 bg-yellow-200 rounded-full left-1/4" />
				<div className="absolute w-6 h-6 mt-4 bg-yellow-200 rounded-full top-1/2 left-24" />
				<div className="absolute left-0 w-8 h-8 -ml-6 bg-green-500 rounded-full mt-14 top-2/3" />
				<div className="absolute w-12 h-12 bg-purple-600 rounded-full left-40 bottom-14" />
				<div className="absolute w-6 h-6 -ml-20 bg-red-300 rounded-full -mt-9 left-1/3 top-1/4" />
				<div className="absolute w-16 h-16 bg-green-500 rounded-full left-1/3 -bottom-12" />
				<div className="absolute top-0 w-8 h-8 mt-20 -mr-24 bg-blue-100 rounded-full right-1/3" />
				<div className="relative content-center h-full pb-12 justify-items-center grid gap-7">
					<span className="text-2xl font-semibold tracking-widest text-center text-purple-800 uppercase">
						New from the Gatsby Blog
					</span>
					<h1 className="w-9/12 font-sans font-black leading-tight tracking-tight text-center text-7xl">
						{frontmatter.title}
					</h1>
				</div>
			</div>
		</div>
	);
}

export const query = graphql`
	query GatsbyArticleOpenGraphImage($id: String!) {
		file(id: { eq: $id }) {
			childMarkdownRemark {
				frontmatter {
					title
					author
					author_avatar
					date(formatString: "MMM D")
				}
			}
		}
	}
`;
