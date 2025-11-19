/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Allow Next.js <Image> to optimize images served from the project's S3 bucket.
		// Change or add additional entries here if you use other buckets/regions.
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ivamo-studios.s3.eu-north-1.amazonaws.com',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig;
