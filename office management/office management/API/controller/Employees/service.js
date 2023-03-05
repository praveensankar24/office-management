const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    id:String,
    Name: String,
    Father_Name: String,
    Date_of_Join: String,
    M2_Permenant_Date: String,
    Date_of_Resignation: String,
    Date_of_Birth: String,
    Mobile_NO: String,
    gender:String,
    Postal_Address: String,
    Name_of_Nominee: String,
    Salary: Number,
    LOP:Number,
    LOP_total:Number,
    Designation: String,
    Aadhar_No: String,
    PAN: String,
    Bank_AC_Number: String,
    IFSC_code: String,
    Emp_status: String,
    Company_Name: String
})
const model = mongoose.model("empdetails", EmployeeSchema)

const saveEmpDetails = async (data) => { 
    try {
        const idValue=await model.find({"id":data.id})
        if(idValue.length==0){
            const list=new model(data);
            const saveCSV=await list.save();
            return saveCSV
        }
        else{
            return false
        }
    } catch (error) {
        return false
    }
}

const getEmpDetails = async (data) => {
    let getInfo
    if (data.Mobile_NO) {
        getInfo = await model.aggregate([
            { $match: { Mobile_NO: data.Mobile_NO } }
        ])
    }
    else{
        getInfo=await model.find({})
    }
    return getInfo
} 

const updateEmpDetails = async (data) => {
    try{
            const updateDetail = await model.updateMany(
                { Mobile_NO: data.Mobile_NO },
                {
                    $set: {
                        "id": data.id,                 
                        "Name": data.Name,
                        "Father_Name": data.Father_Name,
                        "Date_of_Jion": data.Date_of_Jion,
                        "M2_Permenant_Date": data.M2_Permenant_Date,
                        "Date_of_Resignation": data.Date_of_Resignation,
                        "Date_of_Birth": data.Date_of_Birth,
                        "Postal_Address": data.Postal_Address,
                        "Name_of_Nominee": data.Name_of_Nominee,
                        "Salary": data.Salary,
                        "LOP": data.LOP,
                        "gender":data.gender,
                        "LOP_total":data.LOP_total,
                        "Designation": data.Designation,
                        "Aadhar_No": data.Aadhar_No,
                        "PAN": data.PAN,
                        "Bank_AC_Number": data.Bank_AC_Number,
                        "IFSC_code": data.IFSC_code,
                        "Emp_status": data.Emp_status,
                        "Company_Name": data.Company_Name
                    }
                },
                {new:true}
            )
            // console.log(updateDetail);
            return updateDetail
}
catch(error){
    return false
}
}

const totalEmplyeeCount=async(data)=>{
    try {
       const emplyeeCount=await model.find().count()

    return emplyeeCount
    } catch (error) {
        return false
    }
}

const activedetails=async(data)=>{
    let a;
    a=await model.aggregate([

        {$match:{"Emp_status":"On Roll"}}
    ])
        return a;
}

const activecount=async(req,res)=>{
    let ic=await model.aggregate([
        {$match:{"Emp_status":"On Roll"}},
        {$count:"Emp_status"}
    ])
    return ic;
}

const inactivedetails=async(data)=>{
    let a;
    a=await model.aggregate([

        {$match:{"Emp_status":"Resigned"}}
    ])
        return a;
}


const inactivecount=async(data)=>{
 let a;

    a=await model.aggregate([
        {$match:{"Emp_status":"Resigned"} } ,
        // {$group:{_id:{"$Emp_status":Resigned}}},
        {$count:"Emp_status"}
       ])
       return a;
   
}




module.exports = {
    saveEmpDetails,
    getEmpDetails,
    updateEmpDetails,
    totalEmplyeeCount,
    activecount,
    inactivecount,
    activedetails,
    inactivedetails
}
