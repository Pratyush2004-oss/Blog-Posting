import mongoose from "mongoose";

const conn = async () => {
    try {
        const response = await mongoose.connect(`${process.env.DATABASE_URI}`);
        if (response) {
            console.log("Connected to DB")
        }
    } catch (error) {
        console.log(error)
    }
}
export default conn