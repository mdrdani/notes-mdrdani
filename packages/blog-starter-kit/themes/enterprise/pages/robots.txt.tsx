import { type GetServerSideProps } from 'next';

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { res, req } = ctx;

	const forwardedHost = req.headers['x-forwarded-host'];
	const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host;
	if (!host) {
		throw new Error('Could not determine host');
	}
	const proto = req.headers['x-forwarded-proto'] || 'https';
	const sitemapUrl = `${proto}://${host}/sitemap.xml`;
	const robotsTxt = `
User-agent: *
Allow: /

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: ${sitemapUrl}
  `.trim();

	res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
	res.setHeader('content-type', 'text/plain');
	res.write(robotsTxt);
	res.end();

	return { props: {} };
};

export default RobotsTxt;
