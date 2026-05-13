import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  // These packages use Node.js internals (fs, streams, native CJS) that
  // Turbopack cannot bundle correctly — load them from node_modules at runtime.
  serverExternalPackages: ['exceljs', 'jszip', '@react-pdf/renderer', 'puppeteer'],
};

export default nextConfig;
