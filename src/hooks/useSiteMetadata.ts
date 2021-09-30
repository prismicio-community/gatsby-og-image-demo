import { useStaticQuery, graphql } from "gatsby";

import { UseSiteMetadataQuery } from "../types.generated";

type SiteMetadata = {
	siteUrl?: string;
};

export const useSiteMetadata = (): SiteMetadata => {
	const data = useStaticQuery<UseSiteMetadataQuery>(graphql`
		query UseSiteMetadata {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);

	return {
		siteUrl: data.site?.siteMetadata?.siteUrl,
	};
};
