import dashboardService from "../services/dashboard.service.js";
import BaseController from "./base.controller.js";

class DashboardController extends BaseController {
    getDashboard = async (req, res) => {
        try {
            const userId = req.user.id;
            const ranger = Number(req?.query?.ranger) || 7;
            const data = await dashboardService.getDashboard(userId, ranger)
            return this.ok(res, data, "Lấy doanh thu thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new DashboardController()