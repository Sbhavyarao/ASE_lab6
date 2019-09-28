const fs =  require('fs');
const yargs = require('yargs');
const _ = require('lodash');
const customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const custIdOptions = {
    describe: 'ID of a customer',
    demand : true,
    alias : 'custID'
}

const custNameOptions = {
    describe: 'Name of a customer',
    demand : true,
    alias : 'custName'
}

const custEMailOptions = {
    describe: 'Email of a customer',
    demand : true,
    alias : 'custEmail'
}

const argv =  yargs

    .command('add','Add a new customer',{
        customer_id: custIdOptions,
        customer_name: custNameOptions,
        customer_email:custEMailOptions
    })
    .command('list','List all customers')
    .command('read','Read a customer',{
        customer_id: custIdOptions
    })
    .command('remove','Remove a customer',{
        customer_id: custIdOptions
    })
    .command('update','Update a customer',{
        customer_id: custIdOptions,
        customer_name: custNameOptions,
        customer_email:custEMailOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.custID,argv.custName,argv.custEmail);
    if (customer){
        customers.logCustomer(customer);
    } else{
        console.log("Customer already exists");
    }
}
else if (command === 'list') {
  var AllCustomers = customers.getAll();
  console.log(`Printing ${AllCustomers.length} customer(s).`);
    AllCustomers.forEach((customer)=>{
        customers.logCustomer(customer);
  });
}

else if (command === 'update') {
    var customer = customers.update(argv.custID,argv.custName,argv.custEmail);
    if(customer){
        console.log("Customer Updated successfully");
    }
    else{
        console.log("Customer not found");
    }
}
else if (command === 'read') {
   var customer = customers.getCustomer(argv.custID);
   if(customer){
       customers.logCustomer(customer);
          }
   else{
    console.log("Customer not found");
   }
}
else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.custID);
    var message = customerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
}
else{
  console.log('command note recognized'); 
}
