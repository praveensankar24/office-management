const CSVtoJSON = require("csvtojson");
const service = require("./service");

const uploadEmpDetailFile = async (req, res) => {
    try {
        if (req.file == undefined) {
            res.send({ code: 400, Message: "Please upload csv file..!" })
        }
        let path = "./files/" + req.file.filename
        let Details = await CSVtoJSON().fromFile(path)
        for (item of Details) {
            const getDetails = await service.getEmpDetails({ Mobile_NO: item.Mobile_NO })
            if (getDetails.length === 0) {
                var salery=item.Salary/31*item.LOP;
            
                var total=item.Salary-salery
               
            item.LOP_total=~~total
            console.log(item.LOP_total);
                var saveDetail = await service.saveEmpDetails(item)
            }
            else{
                var salery=item.Salary/31*item.LOP;
                
                var total=item.Salary-salery
              
                item.LOP_total=~~total
                console.log(item.LOP_total);
                var updateDetail = await service.updateEmpDetails(item)
                
            }
          
        }
        console.log(updateDetail);
        if (saveDetail == false) {
            res.send({Message: "File upload, but some data row is not saved because Id is same. Please check id...!" })
        }
        else if (updateDetail!=false && saveDetail!=false) {
            res.send({code:200, message: "File Uploaded...!" })
        }
    } catch (error) {
        res.send({ code: 400, Message: "something went wrong" })
        // return false
        // console.log(err);
    }
}

const getEmpdata=async(req,res)=>{
    let getdata=await service.getEmpDetails(req.body)
    res.send({code:200,data:getdata})
}

const EmployeeCount=async(req,res)=>{
    let totalEmp=await service.totalEmplyeeCount(req.body)
    res.send({code:200,data:totalEmp})
    console.log(totalEmp);
}

const activedetails=async(req,res)=>{
    let adetails=await service.activedetails(req.query)
    res.send({code:200,data:adetails})
}

const activecount=async(req,res)=>{
    let ah=await service.activecount(req.query)
    res.send({code:200,data:ah[0].Emp_status})
    console.log(ah);
}

const inactivecount=async(req,res)=>{
    let b=await service.inactivecount(req.query)
    res.send({code:200,data:b[0].Emp_status})
    console.log(b)
}

const inactivedetails=async(req,res)=>{
    let iadetails=await service.inactivedetails(req.query)
    res.send({code:200,data:iadetails})
}



module.exports = {
    uploadEmpDetailFile,
    getEmpdata,
    EmployeeCount,inactivecount,
    activecount,activedetails,
    inactivedetails
}