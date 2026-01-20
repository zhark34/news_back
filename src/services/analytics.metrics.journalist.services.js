import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsAnalyticsDaily from "../models/news.analytics.daily.js"
import CategoriesJournalist from "../models/categories.journalist.js"
import Categories from "../models/categories.js"
import { newsScore } from "../utils/news.score.js"

export const getRankingJournalistService = async () => {

    const journalist = await Journalist.findAll({

        attributes: {
            exclude: ['email', 'profile_image_url', 'profile_image_public_id', 'bio', 'role', 'password', 'reset_token', 'reset_token_expire', 'createdAt', 'updatedAt']
        },

        include: [
            {
                model: CategoriesJournalist,
                include: {
                    model: Categories
                }
            },
            {
                model: News,
                attributes: {
                    exclude: [
                        'journalist_id',
                        'createdAt',
                        'updatedAt',
                        'title',
                        'category',
                        'cover_photo_public_id',
                        'cover_photo'
                    ]
                },
                include: [
                    {
                        model: NewsAnalyticsDaily,
                        attributes: {
                            exclude: [
                                'id',
                                'news_id',
                                'unique_views',
                                'createdAt',
                                'updatedAt',
                                'date'
                            ]
                        }
                    }
                ]
            }
        ]


    })


    const scoreJournalist = await Promise.all(
        journalist.map(async (jst) => {
            let score = 0;

            for (const news of jst.news) {
                if (news.news_analytics_dailies?.length) {
                    score += await newsScore(news.news_analytics_dailies);
                }
            }

            return {
                name: jst.name,
                journalist_id: jst.journalist_id,
                categories: [
                    ...new Set(
                        jst.categories_journalists
                            ?.map(cj => cj.category?.category)
                            .filter(Boolean)
                    )
                ],
                score
            };
        })
    );


    const ranking = scoreJournalist.sort((a, b) => b.score - a.score);


    return ranking

}