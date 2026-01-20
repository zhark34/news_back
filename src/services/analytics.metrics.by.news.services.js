import News from "../models/news.js"
import NewsAnalyticsDaily from "../models/news.analytics.daily.js"
import NewsAnalyticsRealtime from "../models/news.analytics.realtime.js"
import NewsGeoAnalyticsDaily from "../models/news.geo.analytics.daily.js"
import NewsReferrersDaily from "../models/news.referrers.daily.js"
import NewsTechAnalitycsDaily from "../models/news.tech.analitycs.daily.js"

export const getNewsMetricsByNewsService = async (id) => {

    const news = await News.findOne({
        where: { news_id: id },
        include: [
            NewsAnalyticsDaily,
            NewsAnalyticsRealtime,
            NewsGeoAnalyticsDaily,
            NewsReferrersDaily,
            NewsTechAnalitycsDaily
        ]
    })

    return news

}