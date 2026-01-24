import { betterAuth, toLowerCase } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from  "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
   auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  }
});

// If your Prisma file is located elsewhere, you can change the path
//  ssix sgcz jieg amzo

export const auth = betterAuth({
    baseURL : process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    trustedOrigins : [process.env.APP_URL!],
     user: {
   additionalFields:{
 role : {
    type : "string",
    defaultValue: "USER",
    required: false
 },

 phone : {
    type : "string",
    required  :false
 }, 

 status :
 {
    type : "string", 
    defaultValue :"ACTIVE",
    required: false
 }

   } 
  },
     emailAndPassword: { 
     enabled: true, 
     autoSignIn : false, 
     requireEmailVerification : true,
  }, 
  
  emailVerification: {
   sendVerificationEmail: async ( { user, url, token }, request) => {
      console.log({url, token, user })
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
      const info = await transporter.sendMail({
         from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
         to: "alaminhossen176466@gmail.com",
         subject: "Hello ✔",
         text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
   });
   
    console.log("Message Send" , info.messageId)   

   }
 },
 });