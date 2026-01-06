import Categories from './categories.js';
import Journalist from './journalist.js';
import NewsBlock from './news.block.js';
import NewsImage from './news.image.js';
import News from './news.js';
import NewsParagraph from './news.paragraph.js';
import SocialNetworks from './social.networks.js'
import CategoriesJournalist from './categories.journalist.js';
import Session from './sessions.js';
import NewsQuote from './news.quote.js';
import NewsVideo from './news.video.js';
import NewsList from './news.list.js';
import NewsListItem from './news.list.item.js';
import NewsEmbed from './news.embed.js';

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

NewsBlock.hasMany(NewsImage, { foreignKey: "block_id" });
NewsImage.belongsTo(NewsBlock, { foreignKey: "block_id" });

NewsBlock.hasMany(NewsParagraph, { foreignKey: "block_id" });
NewsParagraph.belongsTo(NewsBlock, { foreignKey: "block_id" });

NewsBlock.hasMany(NewsQuote, { foreignKey: "block_id" });
NewsQuote.belongsTo(NewsBlock, { foreignKey: "block_id" });

NewsBlock.hasMany(NewsVideo, { foreignKey: "block_id" });
NewsVideo.belongsTo(NewsBlock, { foreignKey: "block_id" });

NewsBlock.hasMany(NewsList, { foreignKey: "block_id" });
NewsList.belongsTo(NewsBlock, { foreignKey: "block_id" });

NewsList.hasMany(NewsListItem, { foreignKey: "list_id" });
NewsListItem.belongsTo(NewsList, { foreignKey: "list_id" });

NewsBlock.hasMany(NewsEmbed, { foreignKey: "block_id" });
NewsEmbed.belongsTo(NewsBlock, { foreignKey: "block_id" });

export {

    Journalist,
    Categories,
    SocialNetworks,
    News,
    NewsBlock,
    NewsImage,
    NewsParagraph,
    NewsList,
    NewsQuote,
    NewsVideo,
    NewsEmbed,
    NewsListItem,
    Session

}