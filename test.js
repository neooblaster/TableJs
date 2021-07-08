#!/usr/bin/env node

clog = console.log;

const TableJs = require("./bin/TableJs");

let fields = ['Nom', 'Prénom', 'Age'];
let data = [
    ['DUPRE', 'Nicolas', '33'],
    ['DUPRE', 'Aurélie', '38'],
    ['MURET', 'Kévin', '32'],
    ['JESTIN', 'Arnaud', '33'],
    ['DUPONT', 'Sonya', '29']
];


// Setting Up
//
//      let table = new TableJs()
//      let table = new TableJs(aFields)
//      let table = new TableJs(aFields, aData)
//
//
// Setting Up Fields
//
//      let table.fields()
//
//
//  Setting Up Keys
//
//


// Mode step by step
// let dataTab1 = new TableJs();
// dataTab1.fields().set(fields);
// dataTab1.data().set(data);

// Quick Setup
// let dataTab2 = new TableJs(fields, data);




// let testFields1 = new TableJs(fields);
// let testFields2 = new TableJs();
//     testFields2.fields().set(fields);
// let testFields3 = new TableJs();
//     testFields3.fields().set('Nom', 'Prénom', 'Age');
// let testFields4 = new TableJs();
//     testFields4.fields().set(['Nom', 'Prénom'], 'Age');
//     testFields4.fields().add(['DateNaiss', 'LieuNaiss'], 'Nom', 'CdPost');
//     testFields4.keys();
//     testFields4.data().set(data);


let table = new TableJs()
    .fields('FirstName', 'LastName', 'BirthDate', 'BirthCity')
    .keys('FirstName', 'LastName')
    .data(data);

// clog(table)
// table.fields().get();
clog(table.fields().get());
clog(table.keys().get());
clog(table.data().get());


// clog("Test 1 - From Empty");
// let DataTable_empty = new TableJs();
// clog(DataTable_empty.data());
//
// clog("\nTest 2 - From Array");
// let DataTable_array = new TableJs(['A', 'B', 'C']);
// clog(DataTable_array.data());
//
// clog("\nTest 3 - From String");
// let DataTable_other = new TableJs('A');
// clog(DataTable_other.data());


