/**
 * JS equivalent of next.config.ts to avoid requiring TypeScript during Vercel builds.
 */
module.exports = {
  eslint: {
    // These warnings come from upstream LiveKit/AI UI components, not our code.
    ignoreDuringBuilds: true,
  },
};
