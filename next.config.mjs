/** @type {import('next').NextConfig} */

export default {
    images: {
        unoptimized: true,
    },
    transpilePackages: [
        '@mui/x-date-pickers',
        '@mui/x-charts',
        '@mui/x-data-grid',
        '@mui/x-tree-view',
    ],
};