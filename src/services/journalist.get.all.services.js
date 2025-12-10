import Journalist from '../models/journalist.js'


export const getAllJournalistServices = async () =>{

    const allJournalist = await Journalist.findAll({include: { all: true }, attributes: { exclude: ['password'] }});

    if(allJournalist.length === 0){

        throw new Error("NO_JOURNALISTS_FOUND");

    }

    return allJournalist

}