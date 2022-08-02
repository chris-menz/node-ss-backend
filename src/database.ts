import mongoose from "mongoose"

const mongoConnString = "mongodb+srv://swellstatus:swellstatus-pw@ss-dev-cluster.1dug3.mongodb.net/?retryWrites=true&w=majority&dbName=test"

export async function connectToMongo(){
    try {
        await mongoose.connect(mongoConnString)
        console.log("Successfully connected to Dev DB")
    } catch (e) {
        console.log(e)
        console.log("failed to connect")
        process.exit(1)
    }
}

export async function disconnectFromMongo() {
    await mongoose.disconnect()

    console.log("Disconnecting from db...")
    return;
}