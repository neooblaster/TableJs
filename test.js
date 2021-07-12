#!/usr/bin/env node

clog = console.log;
cdir = function ($val) {
    console.dir($val, {
        depth: null
    })
};

const TableJs = require("./bin/TableJs");

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

// -------------------------------------------------------------------------
// ---[ I ]-----------------------------------------------------------------
// -------------------------------------------------------------------------
clog("-------------------------------------------------------");
console.log(">>>> Initializing a new TableJs: \n\n");

let cameras = new TableJs(
    // List of Fields
    ['Brand', 'Camera', 'Date', 'Format', 'Purpose'],

    // Indicating which field compose the keys
    ['Camera', 'Brand'],

    // Table Data
    [
        [ 'Nikon', 'D3', '2007', 'Full Frame', 'Professional' ],
        [ 'Nikon', 'D750', '2014', 'Full Frame', 'Action' ],
        [ 'Nikon', 'D800', '2011', 'Full Frame', 'Semi-Professional' ],
        [ 'Nikon', 'D810A', '2015', 'Full Frame', 'Astro' ],
        [ 'Nikon', 'D7100', '2013', 'APS-C', 'Expert' ],
        [ 'Nikon', 'D6', '2020', 'Full Frame', 'Professional' ],
        [ 'Canon', '1Ds Mark III', '2007', 'Full Frame', 'Professional' ],
        [ 'Canon', '5D Mark II', '2008', 'Full Frame', 'Semi-Professional' ],
        [ 'Canon', '60Da', '2012', 'APS-C', 'Astro' ],
        [ 'Canon', '250D', '2019', 'APS-C', 'Compact' ],
    ]
);

console.log(cameras);
clog("\n-------------------------------------------------------");



// -------------------------------------------------------------------------
// ---[ II ]----------------------------------------------------------------
// -------------------------------------------------------------------------
console.log(">>>> Get distinct values: \n\n");

console.log('Brand List:', cameras.Brand());
console.log('Camera List:', cameras.Camera());
console.log('Date List:', cameras.Date());
console.log('Format List:', cameras.Format());
console.log('Purpose List:', cameras.Purpose());
clog("\n-------------------------------------------------------");



// -------------------------------------------------------------------------
// ---[ III ]---------------------------------------------------------------
// -------------------------------------------------------------------------
console.log(">>>> Get rows: \n\n");

let NikonProCam = cameras.Brand('Nikon').Purpose('Professional');
console.log('Table Result:', NikonProCam);
console.log('New Camera List:', NikonProCam.Camera());
clog("\n-------------------------------------------------------");



// -------------------------------------------------------------------------
// ---[ IV ]----------------------------------------------------------------
// -------------------------------------------------------------------------
console.log(">>>> Get field value of row: \n\n");

// Return the camera name of the first entry
let cameraName = NikonProCam[0].Camera();
console.log("Camera name of the first row:", cameraName);


NikonProCam.forEach(function($row){
    console.log('Camera: ', $row.Camera());
});
clog("\n-------------------------------------------------------");



// -------------------------------------------------------------------------
// ---[ V ]------------+----------------------------------------------------
// -------------------------------------------------------------------------
console.log(">>>> Appending new rows: \n\n");

cameras.push('Sony Alpha');
console.log("Updated Cameras table:", cameras);

cameras.push([
    "Sony Alpha", "α 9 II", "2019", "Full Frame", "Sport-Pro"
]);
console.log("Updated 2 Cameras table:", cameras);
console.log("Updated Cameras List:", cameras.Camera());

clog("\n-------------------------------------------------------");



// -------------------------------------------------------------------------
// ---[ VI ]------------+----------------------------------------------------
// -------------------------------------------------------------------------
console.log(">>>> Setting (Updating) field value: \n\n");

// cdir(cameras.instance)

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


// let table = new TableJs(
//     // Fields
//     ['MATNR', 'WERKS', 'EKORG', 'VKORG'],
//
//     // Keys
//     [ 'MATNR', 'WERKS'  ],
//
//     // Data
//     [
//         ['A12345', 'F500', 'A500', 'V500'],
//         ['B23456', 'F500', 'A500', 'V500'],
//         ['C34567', 'F100', 'A100', 'V101'],
//         ['D45678', 'F100', 'A100', 'V102'],
//         ['E56789', 'F100', 'A110', 'V110'],
//     ]
// );
//
// clog(table.pop().MATNR());

// table.push(['F67891', 'F110', 'A111', 'V111']);

// table.WERKS('F500').forEach(function ($row) {
//     // clog($row.MATNR())
// });

// clog(table.WERKS('F500').MATNR('B23456').data().getRow(0).MATNR());

// clog(table.WERKS('F500').forEach(function ($row) {
//     clog($row.MATNR())
// }));

// table.WERKS('F100').EKORG('A100').VKORG('V102').forEach(function ($row) {
//     clog($row, $row.MATNR())
// });

// clog(table.WERKS('F100').EKORG('A100').VKORG('V102').data().getRow(0).MATNR());


// table.push('A', 'B', ['A1', 'B1']);

// clog(table.MATNR('A12345'));

// let A = ['A'];

// clog(A[0])

// let a = [1,2,4];
//
// clog(a)
//
// a.forEach(function ($v) {
//     return $v *= 2;
// });
//
// clog(a);



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


