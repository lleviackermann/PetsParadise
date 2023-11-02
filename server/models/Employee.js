import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, employeeId: {
        type: String,
        unique: true,
        required: true
    }, email : {
        type: String,
        required: true,
        max: 50,
        unique: true,
    }, password: {
        type: String,
        required: true
    }, role: {
        type: String,
        required: true
    }, appointments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
        }],
        default: [],
    }, orders: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Order',
        }],
        default: [],
    },
})

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;