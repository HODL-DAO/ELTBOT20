import registerStats, { printStatsCommand, getStatsMessage } from './stats';

export const handlers = {
  stats: {
    register: registerStats,
    printStats: printStatsCommand,
    getStatsMessage: getStatsMessage,
  },
}