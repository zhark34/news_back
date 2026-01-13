import NewsAnalyticsDaily from "../models/news.analytics.daily.js";
import NewsReferrersDaily from "../models/news.referrers.daily.js";
import NewsAnalyticsRealtime from "../models/news.analytics.realtime.js";
import NewsGeoAnalyticsDaily from "../models/news.geo.analytics.daily.js";
import NewsTechAnalitycsDaily from "../models/news.tech.analitycs.daily.js";

export const createEventService = async (event) => {

    switch (event.eventType) {

        case 'daily_analytics': {

            await NewsAnalyticsDaily.sequelize.query(`
                INSERT INTO news_analytics_dailies (
                    news_id, date, page_views, unique_views, sessions,
                    total_time_seconds, total_bounces, total_exits,
                    scroll_25, scroll_50, scroll_75, scroll_100,
                    trafic_direct, trafic_organic, trafic_social, trafic_referral,
                    device_mobile, device_desktop, device_tablet,
                    "createdAt", "updatedAt"
                ) VALUES (
                    :news_id, :date, :page_views, :unique_views, :sessions,
                    :total_time_seconds, :total_bounces, :total_exits,
                    :scroll_25, :scroll_50, :scroll_75, :scroll_100,
                    :trafic_direct, :trafic_organic, :trafic_social, :trafic_referral,
                    :device_mobile, :device_desktop, :device_tablet,
                    NOW(), NOW()
                )
                ON CONFLICT (news_id, date) 
                DO UPDATE SET
                    page_views = news_analytics_dailies.page_views + :page_views,
                    unique_views = news_analytics_dailies.unique_views + :unique_views,
                    sessions = news_analytics_dailies.sessions + :sessions,
                    total_time_seconds = news_analytics_dailies.total_time_seconds + :total_time_seconds,
                    total_bounces = news_analytics_dailies.total_bounces + :total_bounces,
                    total_exits = news_analytics_dailies.total_exits + :total_exits,
                    scroll_25 = news_analytics_dailies.scroll_25 + :scroll_25,
                    scroll_50 = news_analytics_dailies.scroll_50 + :scroll_50,
                    scroll_75 = news_analytics_dailies.scroll_75 + :scroll_75,
                    scroll_100 = news_analytics_dailies.scroll_100 + :scroll_100,
                    trafic_direct = news_analytics_dailies.trafic_direct + :trafic_direct,
                    trafic_organic = news_analytics_dailies.trafic_organic + :trafic_organic,
                    trafic_social = news_analytics_dailies.trafic_social + :trafic_social,
                    trafic_referral = news_analytics_dailies.trafic_referral + :trafic_referral,
                    device_mobile = news_analytics_dailies.device_mobile + :device_mobile,
                    device_desktop = news_analytics_dailies.device_desktop + :device_desktop,
                    device_tablet = news_analytics_dailies.device_tablet + :device_tablet,
                    "updatedAt" = NOW()
            `, {
                replacements: {
                    news_id: event.news_id,
                    date: event.date,
                    page_views: event.page_views ?? 0,
                    unique_views: event.unique_views ?? 0,
                    sessions: event.sessions ?? 0,
                    total_time_seconds: event.total_time_seconds ?? 0,
                    total_bounces: event.total_bounces ?? 0,
                    total_exits: event.total_exits ?? 0,
                    scroll_25: event.scroll_25 ?? 0,
                    scroll_50: event.scroll_50 ?? 0,
                    scroll_75: event.scroll_75 ?? 0,
                    scroll_100: event.scroll_100 ?? 0,
                    trafic_direct: event.trafic_direct ?? 0,
                    trafic_organic: event.trafic_organic ?? 0,
                    trafic_social: event.trafic_social ?? 0,
                    trafic_referral: event.trafic_referral ?? 0,
                    device_mobile: event.device_mobile ?? 0,
                    device_desktop: event.device_desktop ?? 0,
                    device_tablet: event.device_tablet ?? 0
                }
            });

            break;
        }

        case 'realtime': {

            await NewsAnalyticsRealtime.sequelize.query(`
                INSERT INTO news_analytics_realtimes (
                    news_id, bucket_time, active_views,
                    "createdAt", "updatedAt"
                ) VALUES (
                    :news_id, :bucket_time, :active_views,
                    NOW(), NOW()
                )
                ON CONFLICT (news_id, bucket_time)
                DO UPDATE SET
                    active_views = GREATEST(0, news_analytics_realtimes.active_views + :active_views),
                    "updatedAt" = NOW()
            `, {
                replacements: {
                    news_id: event.news_id,
                    bucket_time: event.date,
                    active_views: event.active_views ?? 0
                }
            });

            break;
        }

        case 'referrers_daily': {

            await NewsReferrersDaily.sequelize.query(`
                INSERT INTO news_referrers_dailies (
                    news_id, date, referrer_domain, views,
                    "createdAt", "updatedAt"
                ) VALUES (
                    :news_id, :date, :referrer_domain, :views,
                    NOW(), NOW()
                )
                ON CONFLICT (news_id, date, referrer_domain)
                DO UPDATE SET
                    views = news_referrers_dailies.views + :views,
                    "updatedAt" = NOW()
            `, {
                replacements: {
                    news_id: event.news_id,
                    date: event.date,
                    referrer_domain: event.referrer_domain,
                    views: event.views ?? 0
                }
            });

            break;
        }

        case 'geo_daily': {

            await NewsGeoAnalyticsDaily.sequelize.query(`
                INSERT INTO news_geo_analytics_dailies (
                    news_id, date, country_code, views,
                    "createdAt", "updatedAt"
                ) VALUES (
                    :news_id, :date, :country_code, :views,
                    NOW(), NOW()
                )
                ON CONFLICT (news_id, date, country_code)
                DO UPDATE SET
                    views = news_geo_analytics_dailies.views + :views,
                    "updatedAt" = NOW()
            `, {
                replacements: {
                    news_id: event.news_id,
                    date: event.date,
                    country_code: event.country_code,
                    views: event.views ?? 0
                }
            });

            break;
        }

        case 'tech_daily': {

            await NewsTechAnalitycsDaily.sequelize.query(`
                INSERT INTO news_tech_analitycs_dailies (
                    news_id, date, browser, os, device,
                    total_load_time_ms, total_requests, errors_count,
                    "createdAt", "updatedAt"
                ) VALUES (
                    :news_id, :date, :browser, :os, :device,
                    :total_load_time_ms, :total_requests, :errors_count,
                    NOW(), NOW()
                )
                ON CONFLICT (news_id, date, browser, os, device)
                DO UPDATE SET
                    total_load_time_ms = news_tech_analitycs_dailies.total_load_time_ms + :total_load_time_ms,
                    total_requests = news_tech_analitycs_dailies.total_requests + :total_requests,
                    errors_count = news_tech_analitycs_dailies.errors_count + :errors_count,
                    "updatedAt" = NOW()
            `, {
                replacements: {
                    news_id: event.news_id,
                    date: event.date,
                    browser: event.browser,
                    os: event.os,
                    device: event.device,
                    total_load_time_ms: event.total_load_time_ms ?? 0,
                    total_requests: event.total_requests ?? 0,
                    errors_count: event.errors_count ?? 0
                }
            });

            break;
        }

        default:
            console.warn('Unknown eventType:', event.eventType);
    }

    return `analitica ${event.eventType} creada exitosamente`;
}