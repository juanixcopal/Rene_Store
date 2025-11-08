import { dashboardData } from '../../data/index.js'

import makeDashboardStatsService from './dashboard-stats.service.js'
import makeLastOrdersService from './last-orders.service.js'

const dashboardStatsService = makeDashboardStatsService({ dashboardData })
const lastOrdersService = makeLastOrdersService({ dashboardData })

const dashboardServices = {
  'dashboard-stats': dashboardStatsService,
  'last-orders': lastOrdersService
}

export default dashboardServices
