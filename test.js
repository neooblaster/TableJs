#!/usr/bin/env node

clog = console.log;

const TableJs = require("./bin/TableJs");
const TableJsV2 = require("./bin/TableJsV2");

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


// let table = new TableJs()
//     .fields('FirstName', 'LastName', 'BirthDate', 'BirthCity')
//     .keys('FirstName', 'LastName')
//     .data(data);

// table.data().append(['Nom', 'Prénom'], ['A', 'B'], '1', '2', [
//     ['MOLAS', 'FREDERIC'],
//     ['RASSIAS', 'SEBASTIEN']
// ]);

// clog(table)
// table.fields().get();
// clog(table.fields().get());
// clog(table.keys().get());
// clog(table.data().get());
// table.FirstName();
// clog(table.FirstName('DUPRE'));
// clog(table.data().FirstName('MURET'));
// clog(table._indexes.byFields.FirstName);


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



// let table = new TableJsV2(
let table = new TableJs(
    // Fields
    ['MATNR', 'WERKS', 'EKORG', 'VKORG'],

    // Data
    [
        ['A12345', 'F500', 'A500', 'V500'],
        ['B23456', 'F500', 'A500', 'V500'],
        ['C34567', 'F100', 'A100', 'V100'],
        ['D45678', 'F100', 'A100', 'V100'],
        ['E56789', 'F100', 'A110', 'V110'],
    ]
);

table.push('A', 'B', ['A1', 'B1']);

clog(table.MATNR('A12345'));

// let A = ['A'];

// clog(A[0])



// table.WERKS('F100').EKORG('A110').forEach(function ($row) {
//     clog($row[0])
// });

// let materials = table.WERKS('F100').EKORG('A110');
// clog('Material:', materials);

// for (let r in materials){
//     let row = materials[r];
//     let material = row[0];
// }



// let f500_data  = table.WERKS('F500');
// let f100_data  = table.WERKS('F100');
// let f100_ekorg = table.EKORG('A100', 'A110');

// clog('F500_DATA:',  f500_data, "\n");
// clog('F100_DATA:',  f100_data, "\n");
// clog('F100_EKORG:', f100_ekorg, "\n");

// let f100_a100_data = f100_data.EKORG('A100');
// clog('F100_A100_DATA:', f100_a100_data)

// --------------------------------------------------------------------------
// Will be returne in for let in
// Array.prototype.mymethod = function () {
//     clog("Array.mymethod()");
// };



// let tab = new Array();
//
// // Object.defineProperty( targ, "myVal", { enumerable: false, writable: true } );
//
// Object.defineProperty(tab, 'mymethod', { enumerable: false, writable: true });
// tab.mymethod = function () {
//     clog("Array.mymethod() next to defineProperty");
// };
//
// tab.push("A");
// tab.push("B");
//
// tab.mymethod();
//
// tab.forEach(function (pty) {
//     clog('foreach', pty);
// });
//
// for (let pty in tab) {
//     clog("for let in", pty)
// }


