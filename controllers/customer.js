const readline = require('readline');
const fs = require('fs');
const constants = require(__dirname + '/../utility/constants.json');
const geolib = require('geolib');

 

// Find the distance between two latitudes & longitudes
const findDistance = (customer) =>{
    return geolib.getDistance(
        { latitude: constants.dublinLatitude, longitude: constants.dublinLongitude },
        { latitude: customer.latitude, longitude: customer.longitude });
};

// Select customers as per the business logic
const fetchCustomer = (customerData) =>{
    const allowedList = [];
    customerData.forEach(a => {
      
        const distanceInKm = findDistance({latitude:a.latitude,longitude:a.longitude})/1000;
        if(distanceInKm < constants.maxDistance){
            allowedList.push({name:a.name,user_id: a.user_id });
        }        
        
    });

    return allowedList.sort((a,b) =>{
        return a.user_id-b.user_id;
    });
}

exports.getPosts = (req, res , next) => { 

    const customerData = [];  

    const rl = readline.createInterface({
        input:fs.createReadStream('customerData.txt')
      });

    rl.on('line',function(res){
         customerData.push(JSON.parse(res));
    }).on('close',function(){
        
    const fetchedCustomer = fetchCustomer(customerData);
      
     res.status(200).json(
        fetchedCustomer);    
    });
};
   


   
