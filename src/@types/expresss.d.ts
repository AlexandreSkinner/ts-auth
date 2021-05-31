// Objetivo é incluir userID na Request do Express
declare namespace Express {
   export interface Request {
     userId: string
   }
}