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
    var AllNotes = notes.getAll();
    console.log(`Printing ${AllNotes.length} note(s).`);
    AllNotes.forEach((note)=>{                                //list all note(s)
        notes.logNote(note);
    });
}

else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);                                //read a note
    }
    else{
        console.log("Note not found");
    }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}

else{
    console.log('command note recognized');
}
