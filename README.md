# TableJs

> An enhanced Array with extra features to works as 2D Table

``TableJs`` is a little library to create a **2D Array** (Rows with Cells) to
simplify data selection. The strength of this library is the instantiated
``TableJs`` is a standard `Array` with enhanced features.
That means all your knowledge regarding ``Array`` can be applied for
this object. You have just keep in mind your are working with a 2D Array


## Summary



## Getting Started


### Initializing a new ``TableJs``

Please considering the following table data :

| Brand | Camera       | Date | Format      | Purpose          |
|:-----:|:------------:|:----:|:-----------:|:----------------:|
| Nikon | D3           | 2007 | Full Frame | Professional      |
| Nikon | D750         | 2014 | Full Frame | Action            |
| Nikon | D800         | 2011 | Full Frame | Semi-Professional |
| Nikon | D810A        | 2015 | Full Frame | Astro             |
| Nikon | D7100        | 2013 | APS-C      | Expert            |
| Nikon | D6           | 2020 | Full Frame | Professional      |
| Canon | 1Ds Mark III | 2007 | Full Frame | Professional      |
| Canon | 5D Mark II   | 2008 | Full Frame | Semi-Professional |
| Canon | 60Da         | 2012 | APS-C      | Astro             |
| Canon | 250D         | 2019 | APS-C      | Compact           |

To create a new ``TableJs`` you can instantiate it step by step<sup style="color: red">_*_</sup> 
when the content is full dynamic or in one shot like this :

<sup style="color: red">_*_</sup> See Detailed Documentation

````js
let cameras = new TableJs(
    // List of Fields
    ['Brand', 'Camera', 'Data', 'Format', 'Purpose'],
    
    // Indicating which fields compose the key
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
)
````

Result is the following Array :

````js
console.log(cameras);
````

````plaitext
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
  [ 'Canon', '250D', '2019', 'APS-C', 'Compact' ]
]
````



### Get distinct values

From this enhanced ``Array``,
you can easily get distinct values
by calling method where the name is one of field set previously
without parameters :

````js
console.log('Brand List:', cameras.Brand());
console.log('Camera List:', cameras.Camera());
console.log('Date List:', cameras.Date());
console.log('Format List:', cameras.Format());
console.log('Purpose List:', cameras.Purpose());
````

Result :

````plaintext
Brand List: [ 'Nikon', 'Canon' ]

Camera List: [
  'D3',           'D750',
  'D800',         'D810A',
  'D7100',        'D6',
  '1Ds Mark III', '5D Mark II',
  '60Da',         '250D'
]

Date List: [
  '2007', '2008',
  '2011', '2012',
  '2013', '2014',
  '2015', '2019',
  '2020'
]

Format List: [ 'Full Frame', 'APS-C' ]

Purpose List: [
  'Professional',
  'Action',
  'Semi-Professional',
  'Astro',
  'Expert',
  'Compact'
]
````



### Get rows

The main purpose of ``TableJs`` is to retrieve
rows where the field value is equal to specified value(s).

**Important**: ``TableJs`` can select rows for one field at the same time.
But you can chain fields to complete your selection.

Below, an example to return 
all ``Professionnal`` cameras from brand ``Nikon`` :

````js
let NikonProCam = cameras.Brand('Nikon').Purpose('Professional');
console.log('Table Result: ', NikonProCam);
console.log('New Camera List: ', NikonProCam.Camera());
````

The result is a new ``TableJs``<sup style="color: red">_*_</sup> reflecting a part of our initial table
where this part is our result :

<sup style="color: red">_*_</sup> This means all features stay available.

````plaintext
Table Result: [
  [ 'Nikon', 'D3', '2007', 'Full Frame', 'Professional' ],
  [ 'Nikon', 'D6', '2020', 'Full Frame', 'Professional' ]
]

New Camera List: [ 'D3', 'D6' ]
````



### Get field value of row

When you are handling a row of your table,
you can also call method where the name is one of field set,
but instead of returning distinct value, it returns the value
of the field.

````js
// Return the camera name of the first entry
let cameraName = NikonProCam[0].Camera();
console.log("Camera name of the first row:", cameraName);
```` 

Result :

````plaintext
Camera name of the first row: D3
````

Remember, you can use all existing method of Array.
So please find below an example to display camera name
using ``forEach`` method

````js
NikonProCam.forEach(function($row){
    console.log('Camera: ', $row.Camera());
});
````

Result :

````plaintext
Camera:  D3
Camera:  D6
````


### Appending new rows

Take acknowledge that the unique method which has been rewrote 
regarding the standard Array method is the ``push`` method.

In native arrays, ``push`` method add a new value in the table.
The rewrote method now push a new row instead of unique value.
So, if you push a unique value, the result will be a new row
where the first field contains your single value and all other fields with
an empty value.
If you push an array, if the number of values in your array
will not match with field number, empty field will be push at the end.
In case of you have more fields than those defined in ``TableJs``, 
they stay here, but you will not have any method to retrieve them.

Example by pushing a single value :

````js
cameras.push('Sony Alpha');
console.log("Updated Cameras table:", camera);
````

result :

````plaintext
Updated Cameras table: [
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
  [ 'Sony Alpha', '', '', '', '' ]
]
````

Example by pushing a row 

````js
cameras.push([
    "Sony Alpha", "α 9 II", "2019", "Full Frame", "Sport-Pro"
]);
console.log("Updated 2 Cameras table:", cameras);
````

Result :

````plaintext
Updated 2 Cameras table: [
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
  [ 'Sony Alpha', '', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame', 'Sport-Pro' ]
]
````

Pushing a new row will automatically update indexes table.

````js
console.log("Updated Cameras List:", cameras.Camera());
````

Result :

````plaintext
Updated Cameras List: [
  'D3',           'D750',
  'D800',         'D810A',
  'D7100',        'D6',
  '1Ds Mark III', '5D Mark II',
  '60Da',         '250D',
  '',             'α 9 II'
]
````


### Setting (Updating) field value of one row

**Important**: Keep in mind when you get a new array next to filtering using 
'field methods', updating a row in the secondary array will update the
main table.

````js
let sonyCamera = cameras.Brand('Sony Alpha');

// Update Row where there is no Camera Name
let inc = 1;
sonyCamera.Camera('').forEach(function($row){
    // Camera field is a component of key,
    // So we have to set a "unique" name for brand (here sony)
    $row.Camera(`Camera ${inc}`);
    inc++;
});

console.log("Updated Sony Alpha Camera", cameras.Brand('Sony Alpha'));
console.log("Updated Camera Table", cameras);
````

Result next to the update :

````plaintext
Updated Sony Alpha Camera Table [
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame', 'Sport-Pro' ]
]

Updated Camera Table [
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
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame', 'Sport-Pro' ]
]
````



### Setting (Updating) field value of result of rows



### Make a copy of table

As saw previously in chapter ``Setting (Updating) field value of one row``
and as it in standard, Arrays work with references.
Updating a row in intermediate variable will update the table.

``TableJs`` comes with a dedicated method named `copy`
to get a full new table where reference are broken.

Please find below normal bahavior usinf reference

````js
let D3Cam  = cameras.Camera('D3');          // Table with 1 row
let D3Cam2 = D3Cam;                         // This is not a copy
D3Cam2[0].Camera('D3Rename');               // Rename the camera name

console.log("D3Cam:  ", D3Cam);             // D3 --> D3Rename
console.log("D3Cam2: ", D3Cam2);            // D3 --> D3Rename
console.log("Cameras Table: ", cameras);    // D3 --> D3Rename
````

Result

````plaintext
D3Cam:   [ [ 'Nikon', 'D3Rename', '2007', 'Full Frame', 'Professional' ] ]

D3Cam2:  D3Rename

Cameras Table:  [
  [ 'Nikon', 'D3Rename', '2007', 'Full Frame', 'Professional' ],       << Also updated
  [ 'Nikon', 'D750', '2014', 'Full Frame', 'Action' ],
  [ 'Nikon', 'D800', '2011', 'Full Frame', 'Semi-Professional' ],
  [ 'Nikon', 'D810A', '2015', 'Full Frame', 'Astro' ],
  [ 'Nikon', 'D7100', '2013', 'APS-C', 'Expert' ],
  [ 'Nikon', 'D6', '2020', 'Full Frame', 'Professional' ],
  [ 'Canon', '1Ds Mark III', '2007', 'Full Frame', 'Professional' ],
  [ 'Canon', '5D Mark II', '2008', 'Full Frame', 'Semi-Professional' ],
  [ 'Canon', '60Da', '2012', 'APS-C', 'Astro' ],
  [ 'Canon', '250D', '2019', 'APS-C', 'Compact' ],
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame', 'Sport-Pro' ]
]
````

Now the same process using ``copy()`` :

````js
let D6Cam  = cameras.Camera('D6');          // Table with 1 row
let D6Cam2 = D6Cam.copy();                  // Make a true copy of the table
D6Cam2[0].Camera('D6Rename');               // Rename the camera name

console.log("D6Cam:  ", D6Cam);             // D6 --> D6
console.log("D6Cam2: ", D6Cam2);            // D6 --> D6Rename
console.log("Cameras Table: ", cameras);    // D6 --> D6
````

Result :

````plaintext
D6Cam:   [ [ 'Nikon', 'D6', '2020', 'Full Frame', 'Professional' ] ]

D6Cam2:  [ [ 'Nikon', 'D6Rename', '2020', 'Full Frame', 'Professional' ] ]

Cameras Table:  [
  [ 'Nikon', 'D3', '2007', 'Full Frame', 'Professional' ],
  [ 'Nikon', 'D750', '2014', 'Full Frame', 'Action' ],
  [ 'Nikon', 'D800', '2011', 'Full Frame', 'Semi-Professional' ],
  [ 'Nikon', 'D810A', '2015', 'Full Frame', 'Astro' ],
  [ 'Nikon', 'D7100', '2013', 'APS-C', 'Expert' ],
  [ 'Nikon', 'D6', '2020', 'Full Frame', 'Professional' ],              << Unchange
  [ 'Canon', '1Ds Mark III', '2007', 'Full Frame', 'Professional' ],
  [ 'Canon', '5D Mark II', '2008', 'Full Frame', 'Semi-Professional' ],
  [ 'Canon', '60Da', '2012', 'APS-C', 'Astro' ],
  [ 'Canon', '250D', '2019', 'APS-C', 'Compact' ],
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame', 'Sport-Pro' ]
]
````







 
