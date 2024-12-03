# TableJs

> An enhanced Array with extra features to work as 2D Table.

> The library is currently in DEV and README.md as well.
> You can use it for development and tests (for feedback).
> Main features are available.
> Version v1.0.0 will be released when
> coverage test will be done.

``TableJs`` is a little library to create a **2D Array** (Rows with Cells)
from an ``Array of Array`` or `Array of Object`
to simplify data selection. The strength of this library is the instantiated
``TableJs`` is a standard `Array` with enhanced features.
That means all your knowledge regarding ``Array`` can be applied for
this object. You have to keep in mind you are working with a 2D Array.

It can be also used in for Website using the following CDN :

````html
<!-- Do not use "Latest" in production -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/neooblaster/TableJs@main/releases/latest.min.js"></script>
````

````html
<!-- Use a specified version in production -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/neooblaster/TableJs@main/releases/v0.1.x.min.js"></script>
````


## Summary

[](BeginSummary)
* [Summary](#summary)
* [Getting Started](#getting-started)
    * [Initializing a new ``TableJs``](#initializing-a-new-tablejs)
    * [Get distinct values](#get-distinct-values)
    * [Get rows](#get-rows)
    * [Get field value of row](#get-field-value-of-row)
    * [Appending new rows](#appending-new-rows)
    * [Setting (Updating) field value of one row](#setting-updating-field-value-of-one-row)
    * [Setting (Updating) field value of result of rows](#setting-updating-field-value-of-result-of-rows)
    * [Delete rows from the table](#delete-rows-from-the-table)
    * [Make a copy of table](#make-a-copy-of-table)
* [Detailed documentation](#detailed-documentation)
    * [Minimal Instantiation](#minimal-instantiation)
    * [Managing fields](#managing-fields)
        * [Method ``set``](#method-set)
        * [Method ``add``](#method-add)
        * [Method ``get``](#method-get)
    * [Managing keys](#managing-keys)
        * [Method ``set``](#method-set)
        * [Method ``add``](#method-add)
        * [Method ``get``](#method-get)
    * [Managing Data](#managing-data)
        * [Method ``set``](#method-set)
        * [Method ``add`` (Alias `append`)](#method-add-alias-append)
        * [Method ``get``](#method-get)
        * [Method ``getRow``](#method-getrow)
    * [Dynamic Methods](#dynamic-methods)
        * [Method ``MyField()`` on the Array](#method-myfield-on-the-array)
        * [Method ``MyField()`` on a row of the Array](#method-myfield-on-a-row-of-the-array)
    * [Extra method](#extra-method)
        * [Method ``setDeprecated``](#method-setdeprecated)
        * [Method ``deleteRow``](#method-deleterow)
[](EndSummary)



## Getting Started

You can confer to file ``demo.js`` to retrieve back / execute the
**Getting Started** documentation.


### Initializing a new ``TableJs``

Please consider the following table data :

| Brand |    Camera    | Date |   Format   |      Purpose      |
|:-----:|:------------:|:----:|:----------:|:-----------------:|
| Nikon |      D3      | 2007 | Full Frame |   Professional    |
| Nikon |     D750     | 2014 | Full Frame |      Action       |
| Nikon |     D800     | 2011 | Full Frame | Semi-Professional |
| Nikon |    D810A     | 2015 | Full Frame |       Astro       |
| Nikon |    D7100     | 2013 |   APS-C    |      Expert       |
| Nikon |      D6      | 2020 | Full Frame |   Professional    |
| Canon | 1Ds Mark III | 2007 | Full Frame |   Professional    |
| Canon |  5D Mark II  | 2008 | Full Frame | Semi-Professional |
| Canon |     60Da     | 2012 |   APS-C    |       Astro       |
| Canon |     250D     | 2019 |   APS-C    |      Compact      |

To create a new ``TableJs`` you can instantiate it step by step<sup style="color: red">_*_</sup> 
when the content is full dynamic or in one shot like this :

<sup style="color: red">_*_</sup> See Detailed Documentation

````js
let cameras = new TableJs(
    // List of Fields (At least one required)
    ['Brand', 'Camera', 'Date', 'Format', 'Purpose'],
    
    // Indicating which fields compose the key
    // → Optional, but at least empty Array must be passed
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
````

The Result is the following Array :

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

**Important** : As field name will become methods for the table, 
the name must respect **JavaScript** function naming convention.



### Get distinct values

From this enhanced ``Array``,
you can get distinct values
by calling method where the name is one of fields set previously
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
console.log("Updated Cameras table:", cameras);
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

To prevent you to make a ``forEach`` loop on the array,
you can use method ``update()`` to set new field(s) value
of you table or you filtered selection.

Below an example to update the **Format** ``Full Frame``
to a detailed version ``Full Frame (24x36)`` :

````js
cameras.Format('Full Frame').update({
    Format: 'Full Frame(24x36)'
});
console.log("Updated Table:", cameras);
````

Properties of the object passed to the method ``update()``
are the name of defined field.

The result is :

````plaintext
// <<< is pointing updated lines
Updated Table: [
  [ 'Nikon', 'D3', '2007', 'Full Frame(24x36)', 'Professional' ],              <<<
  [ 'Nikon', 'D750', '2014', 'Full Frame(24x36)', 'Action' ],                  <<<
  [ 'Nikon', 'D800', '2011', 'Full Frame(24x36)', 'Semi-Professional' ],       <<<
  [ 'Nikon', 'D810A', '2015', 'Full Frame(24x36)', 'Astro' ],                  <<<
  [ 'Nikon', 'D7100', '2013', 'APS-C', 'Expert' ],
  [ 'Nikon', 'D6', '2020', 'Full Frame(24x36)', 'Professional' ],              <<<
  [ 'Canon', '1Ds Mark III', '2007', 'Full Frame(24x36)', 'Professional' ],    <<<
  [ 'Canon', '5D Mark II', '2008', 'Full Frame(24x36)', 'Semi-Professional' ], <<<
  [ 'Canon', '60Da', '2012', 'APS-C', 'Astro' ],
  [ 'Canon', '250D', '2019', 'APS-C', 'Compact' ],
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame(24x36)', 'Sport-Pro' ]         <<<
]

````



### Delete rows from the table

In the same way of method ``update()`` which allows you to make a mass update,
you can massively delete rows next to a selection.
The method is ``delete()`` and it purposed to used next to a selection
made by calling _'field method'_.
Called on the main table, it will drop entirely the table.

Below an example to clear all ``APS-C`` Camera in the table :

````js
cameras.Format('APS-C').delete();
console.log(cameras);
````

result :

````plaintext
[
  [ 'Nikon', 'D3Rename', '2007', 'Full Frame(24x36)', 'Professional' ],
  [ 'Nikon', 'D750', '2014', 'Full Frame(24x36)', 'Action' ],
  [ 'Nikon', 'D800', '2011', 'Full Frame(24x36)', 'Semi-Professional' ],
  [ 'Nikon', 'D810A', '2015', 'Full Frame(24x36)', 'Astro' ],
  [ 'Nikon', 'D6', '2020', 'Full Frame(24x36)', 'Professional' ],
  [ 'Canon', '1Ds Mark III', '2007', 'Full Frame(24x36)', 'Professional' ],
  [ 'Canon', '5D Mark II', '2008', 'Full Frame(24x36)', 'Semi-Professional' ],
  [ 'Sony Alpha', 'Camera 1', '', '', '' ],
  [ 'Sony Alpha', 'α 9 II', '2019', 'Full Frame(24x36)', 'Sport-Pro' ]
]
````





### Make a copy of table

As saw previously in chapter ``Setting (Updating) field value of one row``
and as it in standard, Arrays work with references.
Updating a row in intermediate variable will update the table.

``TableJs`` comes with a dedicated method named `copy`
to get a full new table where reference are broken.

Please find below normal behavior using reference

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


For more features, please confer to **detailed documentation**.

<hr />



### Using objects as the source of data for TableJs

``TableJs`` is able to handle objects as the source of the data.

Indeed, depending on your needs,
you can prefer working with objects that are easier to manipulate
and use in your application.

In that case, ``TableJs`` offer all features to
filter, get and set while keeping the object as is.
Both are bound together and all modifications are
reflected to the other.

There are only three requirements to work with objects: 

- Field names must be defined before setting data or at the
same time during global initialization.
- Objects are wrapped in an array : ``Array of Object``
- Objects in the array must have the same definition of properties

Please find below an example with cameras, 
but data structured in a ``Array of Object`` : 

````js
let aObjectCamera = [
    {'Brand': 'Nikon', 'Camera': 'D3', 'Date': '2007', 'Format': 'Full Frame', 'Purpose': 'Professional'},
    {'Brand': 'Nikon', 'Camera': 'D750', 'Date': '2014', 'Format': 'Full Frame', 'Purpose': 'Action'},
    {'Brand': 'Nikon', 'Camera': 'D800', 'Date': '2011', 'Format': 'Full Frame', 'Purpose': 'Semi-Professional'},
    {'Brand': 'Nikon', 'Camera': 'D810A', 'Date': '2015', 'Format': 'Full Frame', 'Purpose': 'Astro'},
    {'Brand': 'Nikon', 'Camera': 'D7100', 'Date': '2013', 'Format': 'APS-C', 'Purpose': 'Expert'},
    {'Brand': 'Nikon', 'Camera': 'D6', 'Date': '2020', 'Format': 'Full Frame', 'Purpose': 'Professional'},
    {'Brand': 'Canon', 'Camera': '1Ds Mark III', 'Date': '2007', 'Format': 'Full Frame', 'Purpose': 'Professional'},
    {'Brand': 'Canon', 'Camera': '5D Mark II', 'Date': '2008', 'Format': 'Full Frame', 'Purpose': 'Semi-Professional'},
    {'Brand': 'Canon', 'Camera': '60Da', 'Date': '2012', 'Format': 'APS-C', 'Purpose': 'Astro'},
    {'Brand': 'Canon', 'Camera': '250D', 'Date': '2019', 'Format': 'APS-C', 'Purpose': 'Compact'}
];

let cameras = new TableJs(
    // List of Fields (At least one required)
    ['Brand', 'Camera', 'Date', 'Format', 'Purpose'],

    // Indicating that fields compose the key
    // -> Optional, but at least empty Array must be passed
    ['Camera', 'Brand'],

    // Table Data : Array of Object
    aObjectCamera
);

clog("Witness:");
clog("aObjectCamera[0].Brand (Expected Nikon):", aObjectCamera[0].Brand);
clog("cameras[0].Brand() (Expected Nikon):", cameras[0].Brand());
clog("---------------------------------------------------------------");
clog("Statement: cameras[0].Brand('test')");
// Modification from TableJs using methods
cameras[0].Brand('test');
clog("aObjectCamera[0].Brand (Expected test):", aObjectCamera[0].Brand);
clog("cameras[0].Brand() (Expected test):", cameras[0].Brand());
clog("---------------------------------------------------------------");
clog("Statement: aObjectCamera[0].Brand = 'demo'");
// Modification from original array providing data, modifying the property
aObjectCamera[0].Brand = 'demo';
clog("aObjectCamera[0].Brand (Expected demo):", aObjectCamera[0].Brand);
clog("cameras[0].Brand() (Expected demo):", cameras[0].Brand());
````

Below the result of output : 

````plaintext
Witness:
aObjectCamera[0].Brand (Expected Nikon): Nikon
cameras[0].Brand() (Expected Nikon): Nikon
---------------------------------------------------------------
Statement: cameras[0].Brand('test')
aObjectCamera[0].Brand (Expected test): test
cameras[0].Brand() (Expected test): test
---------------------------------------------------------------
Statement: aObjectCamera[0].Brand = 'demo'
aObjectCamera[0].Brand (Expected demo): demo
cameras[0].Brand() (Expected demo): demo

````






## Detailed documentation

From this point, you will find the detailed documentation with all
user method. Internal method will not be detailed (even if they are callable).


### Minimal Instantiation

You can easily create a new **TableJs** instance like this :

````js
let cameras = new TableJs(); // Will return an empty Array
````



### Managing fields

Field can be managed later next to the **TableJs** instantiation.
That allows you to use **TableJs** dynamically.

Fields manager is available from your array and return some sub method : 
``cameras.fields()``.



#### Method ``set``

The method ``set()`` defines the field list.
This method will overwrite existing field list.
If you only want to add a new field, please confer to method
``add()``.

It accept none to many argument with following type :
* **String**
* **Array** of **String**

**Important**: Field name must respect the naming convention of functions name.
For instance, a field can not start with a number.

Sample :

````js
let cameras = new TableJs(); // Will return an empty Array

cameras.fields().set( 'Field1', 'Field2', ['Field3', 'Field4'] );
````

Each defined field will generates a method on the **Array** and
on each **rows** of the Array.
Please confer chapter ``Dynamic Methods`` in this **detailed documentation**.



#### Method ``add``




#### Method ``get``






### Managing keys


#### Method ``set``

#### Method ``add``

#### Method ``get``






### Managing Data


#### Method ``set``

#### Method ``add`` (Alias `append`)

#### Method ``get``

#### Method ``getRow``






### Dynamic Methods

Each defined field will generates a method on the **Array** and
on each **rows** of the Array.


#### Method ``MyField()`` on the Array


#### Method ``MyField()`` on a row of the Array






### Extra method

#### Method ``setDeprecated``

#### Method ``deleteRow``


 
