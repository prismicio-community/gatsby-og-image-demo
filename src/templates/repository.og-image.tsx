import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
	PeopleIcon,
	IssueOpenedIcon,
	CommentDiscussionIcon,
	StarIcon,
	RepoForkedIcon,
	MarkGithubIcon,
	OcticonProps,
} from "@primer/octicons-react";
import { IndexOpenGraphImageQuery } from "../types.generated";

type MetadataItemProps = {
	icon: React.ComponentType<OcticonProps>;
	label: string;
	value: string | number;
};

const MetadataItem = ({ icon: Icon, label, value }: MetadataItemProps) => {
	return (
		<div className="flex mr-12 last:mr-0">
			<Icon size="medium" className="col-span-2 text-gray-500 mr-4" />
			<div className="flex flex-col-reverse pt-1">
				<dt className="font-sans text-2xl text-gray-500">{label}</dt>
				<dd className="mb-5 font-sans text-3xl">{value}</dd>
			</div>
		</div>
	);
};

type OpenGraphImageTemplateProps = PageProps<IndexOpenGraphImageQuery>;

const OpenGraphImageTemplate = ({
	data,
}: OpenGraphImageTemplateProps): JSX.Element => {
	const repository = data.github.repository;
	if (!repository) {
		throw new Error("Repository was not found");
	}

	return (
		<div className="min-h-screen bg-black">
			<div
				className="flex flex-col text-gray-800 bg-white ring ring-red-500"
				style={{ width: 1200, height: 600 }}
			>
				<div className="flex flex-col flex-grow pl-20 pr-20 pt-28 pb-14">
					<div className="flex flex-grow">
						<div className="flex-col content-start flex-grow grid gap-16">
							<h1 className="font-sans text-7xl">
								{repository.owner.login}/
								<span className="font-bold">{repository.name}</span>
							</h1>
							<p className="font-sans text-3xl leading-relaxed text-gray-500">
								{repository.description}
							</p>
						</div>
						<div className="flex justify-end w-1/4 ml-14">
							<div className="w-48 -mt-8">
								<div className="aspect-w-1 aspect-h-1">
									<img
										src={repository.owner.avatarUrl}
										className="object-cover w-full h-full rounded-3xl"
									/>
								</div>
							</div>
						</div>
					</div>

					<dl className="flex">
						<MetadataItem icon={PeopleIcon} label="Contributors" value="???" />
						<MetadataItem
							icon={IssueOpenedIcon}
							label="Issues"
							value={repository.issues.totalCount}
						/>
						{repository.discussions.totalCount > 0 && (
							<MetadataItem
								icon={CommentDiscussionIcon}
								label="Discussions"
								value={repository.discussions.totalCount}
							/>
						)}
						<MetadataItem icon={StarIcon} label="Stars" value="8k" />
						<MetadataItem
							icon={RepoForkedIcon}
							label="Forks"
							value={repository.forkCount}
						/>
					</dl>

					<MarkGithubIcon
						size="large"
						className="absolute text-gray-400 w-11 bottom-14 right-20"
					/>
				</div>

				<div className="flex flex-shrink-0 h-6">
					{repository.languages?.edges?.map(
						(edge) =>
							edge?.node &&
							repository.languages?.totalSize && (
								<div
									style={{
										backgroundColor: edge.node.color,
										width: `${
											(edge.size / repository.languages.totalSize) * 100
										}%`,
									}}
								/>
							),
					)}
				</div>
			</div>
		</div>
	);
};

export default OpenGraphImageTemplate;

export const query = graphql`
	query ($repositoryOwner: String!, $repositoryName: String!) {
		github {
			repository(owner: $repositoryOwner, name: $repositoryName) {
				name
				owner {
					login
					avatarUrl(size: 320)
				}
				description
				stargazerCount
				issues {
					totalCount
				}
				forkCount
				discussions {
					totalCount
				}
				languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
					edges {
						node {
							color
						}
						size
					}
					totalSize
				}
			}
		}
	}
`;
