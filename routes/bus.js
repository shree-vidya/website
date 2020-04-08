var express = require ("express");
var router = express.Router();
var middleware = require("../middleware")


var bus = [{name:"99B",start_route:["Majestic","Ananda Roa Circle","Central"],end_route:["Malleshwaram","Yeshwanthpura","Mathikere"]},{name:"227C",start_route:["K.R Market","Azad Nagar","Mysore Road"],end_route:["Nayandahalli","R.V.C.E","Kengeri"]},{name:"331A",start_route:["Shivajinagar","Trinity Circle","Marathahalli"],end_route:["C.M.R.I.T","Whitefield","Kadugodi"]},{name:"304H",start_route:["Majestic","K.R.Circle","Halasuru"],end_route:["K.R Puram","Brigade Tech Park","Arehalli"]}]

var rest=[{bus_name1:""}]
var selected={}
var bus_name1=""
var ticket_array=[]

var today = new Date();
var day= today.getDate();
var month = today.getMonth()+1; 
var year = today.getFullYear();

router.get("/",middleware.isLoggedIn,function(req,res){
	res.render("busdetails.ejs",{bus:bus,rest:rest})
})

router.post("/",function(req,res){
 bus_name1=req.body.bus_name;
 selected ={bus_name1:bus_name1}
rest[0]=selected;
	res.redirect("/a1")
})
	
router.post("/show",function(req,res){
	var start_route1=req.body.start_route;
	var end_route1=req.body.end_route;
	var no_of_ppl1=req.body.no_of_ppl;
	 selected ={bus_name1:bus_name1,start_route1:start_route1,end_route1:end_route1,no_of_ppl1:no_of_ppl1}
	rest[0]=selected
	res.redirect("/show")
})
var sum=0,a,n=1234567,x,n1,num,i=0;

function get_number(){
	sum=0;
	if(day<10){
		sum=day;
	}else{
		a=day%10;
		b=Math.floor(day/10);
		sum=b+a;
	}
	x=sum*month*year;
	n1=n%10;
	n=n/10;
	n=Math.floor(n1*1000000+n);
	num=n+x;
	num=num%1000000;
    return num;
}

router.get("/show",middleware.isLoggedIn,function(req,res){
	rest[0].bus_name="xxx"
	var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
	var nd = new Date(utc + (3600000*+5.5));
	var time =  nd.toLocaleString();
	var ticket_number = get_number()+i;
	ticket_array.push(ticket_number);
	i=i+1;
	res.render("ticket_display.ejs",{rest:rest,ticket_number:ticket_number,time:time})
})

router.get("/check",middleware.checkOwnership,function(req,res){
	res.render("conductor_check.ejs",{ticket_array:ticket_array})
})


	
router.get("/payment", function(req,res){
	res.render("payment.ejs");
});


function get_amount(){
	var no_of_ppl1=rest[0].no_of_ppl;
	var amount=Math.floor((Math.random()*15)+5)*no_of_ppl;
	return amount;
}

module.exports = router;