/**
 * This template is used to generate an og:image for a blog post. It looks like
 * the actual dev.to og:image for articles.
 */

import * as React from "react";
import { graphql, PageProps } from "gatsby";

import { DevtoArticleOpenGraphImageQuery } from "../types.generated";

type DevtoOpenGraphImageTemplateProps =
	PageProps<DevtoArticleOpenGraphImageQuery>;

export default function RepositoryTemplate({
	data,
}: DevtoOpenGraphImageTemplateProps): JSX.Element {
	const frontmatter = data.file?.childMarkdownRemark?.frontmatter;
	if (!frontmatter) {
		throw new Error("Article was not found");
	}

	return (
		<div className="min-h-screen bg-black">
			<div
				className="relative bg-white ring ring-red-500 p-14"
				style={{ width: 1200, height: 600 }}
			>
				<div className="relative w-full h-full">
					<div className="relative z-10 h-full pt-24 pb-5 bg-white border-2 border-black rounded-b rounded-t-3xl px-7">
						<div className="flex flex-col h-full">
							<h1 className="flex-grow font-sans font-bold tracking-tight text-8xl">
								{frontmatter.title}
							</h1>
							<div className="flex items-center">
								<div className="mr-3 bg-white border-2 border-black rounded-full w-14 h-14 overflow-hidden">
									{frontmatter.author_avatar && (
										<img
											src={frontmatter.author_avatar}
											alt=""
											className="object-cover w-full h-full"
										/>
									)}
								</div>
								<span className="font-sans text-3xl">
									{frontmatter.author} &middot; {frontmatter.date}
								</span>
							</div>
						</div>

						<div className="absolute flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-black rounded bottom-5 right-6 rotate-6 transform">
							DEV
						</div>
					</div>
					<div className="absolute w-full h-full bg-black border-2 border-black rounded-b top-3 left-2 rounded-t-3xl" />
				</div>
			</div>
		</div>
	);
}

export const query = graphql`
	query DevtoArticleOpenGraphImage($id: String!) {
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
