import Journalist from '../models/journalist.js'


export const getOneJournalistServices = async (id) =>{

    const allJournalist = await Journalist.findOne({where: { journalist_id: id },include: { all: true }, attributes: { exclude: ['password', 'reset_token', 'reset_token_expire'] }});

    if(allJournalist.length === 0){

        throw new Error("NO_JOURNALIST_FOUND");

    }

    return allJournalist

}