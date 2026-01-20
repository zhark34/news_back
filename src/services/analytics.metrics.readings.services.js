import NewsAnalyticsDaily from "../models/news.analytics.daily.js";
import { Op } from 'sequelize';

export const getReadingsService = async () => {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const readings = await NewsAnalyticsDaily.findAll({ where: { createdAt: { [Op.between]: [start, end] } } });

    const totalReadings = readings.reduce((acc, reading) => acc + reading.page_views, 0);

    return totalReadings;

}