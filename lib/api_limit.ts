import {auth } from "@clerk/nextjs"
import prismaDb from "./prismaDB"
import {MAX_FREE_COUNTS} from "@/constants"


export const increaseApiLimit =async ()=>{
    const {userId} =auth();
    if(!userId)
    {
        return;
    }
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    if(userApiLimit){
        await prismaDb.userApiLimit.update({
            where:{userId:userId},
            data:{count:userApiLimit.count+1}
        })
    }
    else{
        await prismaDb.userApiLimit.create({
            data:{userId:userId,count:1}
        })
    }
};

export const checkApiLimit = async()=>{
    const {userId} =auth();
    if(!userId)
    {
        return false;
    }
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    if(!userApiLimit || userApiLimit.count<MAX_FREE_COUNTS){
        return true;
    }
    else{
     return false;
    }
}

export const GetApiCount =async ()=>{
    const {userId} =auth();
    if(!userId)
    {
        return 0;
    }
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    if(!userApiLimit){
        return 0;
    }
    return userApiLimit.count;
};