import Categorys from './categorys.js';
import Journalist from './journalist.js';
import NewsBlock from './news.block.js';
import NewsImage from './news.image.js';
import News from './news.js';
import NewsParagraph from './news.paragraph.js';
import SocialNetworks from './social.networks.js'

Journalist.hasMany(Categorys, { foreignKey: "id", sourceKey: "id" });
Categorys.belongsTo(Journalist, { foreignKey: "id", sourceKey: "id" })

Journalist.hasMany(SocialNetworks, { foreignKey: "id", sourceKey: "id" });
SocialNetworks.belongsTo(Journalist, { foreignKey: "id", sourceKey: "id" });

Journalist.hasMany(News, { foreignKey: "journalist_id", sourceKey: "id" });
News.belongsTo(Journalist, { foreignKey: "journalist_id", sourceKey: "id" });

News.hasMany(NewsParagraph, { foreignKey: "news_id", sourceKey: "id" });
NewsParagraph.belongsTo(News, { foreignKey: "news_id", sourceKey: "id" });

export { 

    Journalist,
    Categorys,
    SocialNetworks,
    News,
    NewsParagraph

}