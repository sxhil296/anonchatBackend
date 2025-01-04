// import { Request, Response } from "express";
// import postgresdb from "../db/db";
// import  {user}  from "../model/model";
// import db from "../db/db";
// import { eq, sql } from "drizzle-orm";


// export const userController = async (req: Request, res: Response) => {
//     try {
//         const  name :string = req.body.name; 
//         if(!name){
//             return res.status(400).json({error:"name is required"});
//         }
//         console.log(name) 
        
       
//         const nameId =await db.insert(user).values({ name: name,message:["test"] }).returning();
//         const baseAPI="http://localhost:3000"+"/chat/"+nameId[0].id
//         return res.status(200).json({ Link: baseAPI ,userId:nameId[0].id,name :user.name});

//     } catch (error: any) {
//         console.log(error);
//         return res.status(500).json({ error: error.message }); 
//     }
// };

// export const usermessage=async(req:Request,res:Response)=>{
//     try{
//         const {id}=req.params;
//         const newMessage=req.body.message

//         const updatedUser = await db
//             .update(user)
//             .set({
//                 message: sql`array_append(${user.message}, ${newMessage})`
//             })
//             .where(eq(user.id, id)) 
//             .returning(); ; 
//         return res.status(200).json({message:"comment updated"});
//     }catch(error:any){
//         console.log(error);
//         return res.status(500).json({error:error.message});
//     }
// }
// export const allusermessage=async(req:Request,res:Response)=>{
//     try{
//         const userID=req.params.id
//         const users=await db.select({Message:user.message}).from(user).where(eq(user.id,req.params.id));
//         return res.status(200).json({message:users[0].Message});
//     }catch(error:any){
//         console.log(error);
//         return res.status(500).json({error:error.message});
//     }
// }   


import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import db from "../db/db";
import { user } from "../model/model";

export const userController = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        console.log(name);

        // Insert new user with default message array
        const nameId = await db.insert(user).values({ name }).returning();

        // Generate base API link
        const baseAPI = `https://anon-chat-omega.vercel.app/chat/${nameId[0].id}`;

        // Sanitize the response to avoid circular references
        return res.status(200).json({
            link: baseAPI,
            userId: nameId[0].id,
            name: nameId[0].name,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const userMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newMessage: string = req.body.message;

        if (!newMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Append new message to the user's message array using raw SQL
        const updatedUser = await db
            .update(user)
            .set({
                message: sql`array_append(${user.message}, ${newMessage})`,
            })
            .where(eq(user.id, id))
            .returning();

        if (updatedUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return success response
        return res.status(200).json({ message: "Message updated successfully" });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const allUserMessages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Fetch all messages for the given user ID
        const users = await db.select({ Message: user.message }).from(user).where(eq(user.id, id));

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return sanitized response
        return res.status(200).json({ message: users[0].Message });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
export const deleteUser =async(req:Request,res:Response)=>{
    try {
        const { id } = req.params;
        const deletedUser = await db.delete(user).where(eq(user.id, id)).returning();
        if (deletedUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

export const getNameById=async(req:Request,res:Response)=>{
    try {
        const { id } = req.params;
        const name = await db.select({ name: user.name }).from(user).where(eq(user.id, id));
        if (name.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ name: name[0].name });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}