import app from "./app";
import { prisma } from "./lib/prisma"
const  port = process.env.PORT || 5000

/* CREATE MAIN FUNCTION */
async function main() {
try {
    /*  connected prisma */
    await prisma.$connect();
    console.log("connected data base Successfully!");
    app.listen(port, () =>{
        console.log(`server running on port ${port}`)
    })
} catch (error) {
    console.log("an error create here",error)
    await prisma.$disconnect()
    process.exit(1)
}

}
//  finally  call the function 
main()