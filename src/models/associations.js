import Categories from './categories.js';
import Journalist from './journalist.js';
import NewsBlock from './news.block.js';
import NewsImage from './news.image.js';
import News from './news.js';
import NewsParagraph from './news.paragraph.js';
import SocialNetworks from './social.networks.js'

Journalist.hasMany(Categories, { foreignKey: "journalist_id" });
Categories.belongsTo(Journalist, { foreignKey: "journalist_id" });

Journalist.hasMany(SocialNetworks, { foreignKey: "journalist_id" });
SocialNetworks.belongsTo(Journalist, { foreignKey: "journalist_id" });

Journalist.hasMany(News, { foreignKey: "journalist_id" });
News.belongsTo(Journalist, { foreignKey: "journalist_id" });

News.hasMany(NewsBlock, { foreignKey: "news_id" });
NewsBlock.belongsTo(News, { foreignKey: "news_id" });

NewsBlock.hasMany(NewsImage, { foreignKey: "news_id" });
NewsImage.belongsTo(NewsBlock, { foreignKey: "news_id" });

NewsBlock.hasMany(NewsParagraph, { foreignKey: "news_id" });
NewsParagraph.belongsTo(NewsBlock, { foreignKey: "news_id" });

export { 

    Journalist,
    Categories,
    SocialNetworks,
    News,
    NewsBlock,
    NewsImage,
    NewsParagraph

}