import Journalist from '../models/journalist.js'


export const getAllJournalistServices = async () =>{

    const allJournalist = await Journalist.findAll({include: { all: true }, attributes: { exclude: ['password', 'reset_token', 'reset_token_expire']}});

    if(allJournalist.length === 0){

        throw new Error("NO_JOURNALISTS_FOUND");

    }

    return allJournalist

}