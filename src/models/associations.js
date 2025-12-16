import Categories from './categories.js';
import Journalist from './journalist.js';
import NewsBlock from './news.block.js';
import NewsImage from './news.image.js';
import News from './news.js';
import NewsParagraph from './news.paragraph.js';
import SocialNetworks from './social.networks.js'
import CategoriesJournalist from './categories.journalist.js';
import Session from './sessions.js';

Journalist.hasMany(CategoriesJournalist, { foreignKey: 'journalist_id', sourceKey: 'journalist_id' });
CategoriesJournalist.belongsTo(Journalist, { foreignKey: 'journalist_id', targetKey: 'journalist_id' });

Categories.hasMany(CategoriesJournalist, { foreignKey: 'category_id', sourceKey: 'category_id' });
CategoriesJournalist.belongsTo(Categories, { foreignKey: 'category_id', targetKey: 'category_id' });

Journalist.hasMany(SocialNetworks, { foreignKey: "journalist_id", sourceKey: 'journalist_id' });
SocialNetworks.belongsTo(Journalist, { foreignKey: "journalist_id", targetKey: 'journalist_id' });

Journalist.hasMany(Session, { foreignKey: 'journalist_id', sourceKey: 'journalist_id' });
Session.belongsTo(Journalist, { foreignKey: 'journalist_id', targetKey: 'journalist_id' });

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
    NewsParagraph,
    Session

}