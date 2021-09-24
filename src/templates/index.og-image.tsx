import * as React from "react";
import {
	PeopleIcon,
	IssueOpenedIcon,
	CommentDiscussionIcon,
	StarIcon,
	RepoForkedIcon,
	MarkGithubIcon,
	OcticonProps,
} from "@primer/octicons-react";

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

const OpenGraphImageTemplate = () => {
	return (
		<div className="relative min-h-screen bg-black">
			<div
				className="relative flex flex-col text-gray-800 bg-white ring ring-red-500"
				style={{ width: 1200, height: 600 }}
			>
				<div className="relative flex flex-col flex-grow pl-20 pt-28 pb-14 pr-28">
					<div className="flex flex-grow">
						<div className="flex-col content-start flex-grow grid gap-16">
							<h1 className="font-sans text-7xl">
								nasa/<span className="font-bold">fprime</span>
							</h1>
							<p className="font-sans text-3xl leading-relaxed text-gray-500">
								F' - A flight software and embedded systems framework
							</p>
						</div>
						<div className="flex justify-end w-1/4 ml-14">
							<div className="w-40 -mt-4">
								<div className="bg-blue-500 rounded-full aspect-w-1 aspect-h-1"></div>
							</div>
						</div>
					</div>

					<dl className="flex">
						<MetadataItem icon={PeopleIcon} label="Contributors" value={83} />
						<MetadataItem icon={IssueOpenedIcon} label="Issues" value={53} />
						<MetadataItem
							icon={CommentDiscussionIcon}
							label="Discussions"
							value={6}
						/>
						<MetadataItem icon={StarIcon} label="Stars" value="8k" />
						<MetadataItem icon={RepoForkedIcon} label="Forks" value={950} />
					</dl>

					<MarkGithubIcon
						size="large"
						className="absolute text-gray-400 w-11 bottom-14 right-20"
					/>
				</div>

				<div className="flex flex-shrink-0 h-6">
					<div className="bg-yellow-300" style={{ width: "75%" }} />
					<div className="bg-green-800" style={{ width: "25%" }} />
				</div>
			</div>
		</div>
	);
};

export default OpenGraphImageTemplate;
