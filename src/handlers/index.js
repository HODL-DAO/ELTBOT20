import registerStats, { printStatsCommand } from './stats';

export const handlers = {
  stats: {
    register: registerStats,
    printStats: printStatsCommand,
  },
}