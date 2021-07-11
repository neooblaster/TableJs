clog = console.log;


/**
 * Callback System :
 *  - Core.add() :
 *      - pre,  receive {Arguments},    must return {Arguments}.
 *      - push, receive {String|Array}, must return {String|Array}.
 *      - post, receive {Array},        must return {Array}.
 *
 */

/**
 *
 * @param $fields
 * @param $array
 * @return {TableJs}
 * @constructor
 */


function TableJsV2($fields, $array) {
    let self = this;

    self._data = [];
    self._fields = [];
    self._keys = [];
    self._indexes = {
        byKeys: {},
        byFields: {}
    };

    Object.defineProperties(self._data, {
        self: {
            enumerable: false,
            writable: false,
            value: self
        },

        /**
         * Rewrite native Push method to add table row instead of unique value.
         *
         * @return {Number} return the next index number (as original one).
         */
        push: {
            enumerable: false,
            writable: false,
            value: function () {
                let nextIndex = this.length;

                for (let a in arguments) {
                    if(!arguments.hasOwnProperty(a)) continue;
                    let argv = arguments[a];

                    if (!(argv instanceof Array)) {
                        argv = [argv];
                    }

                    this[nextIndex] = this.data().consolidate(argv);
                    nextIndex++;
                }

                return nextIndex;
            }
        },

        /**
         * Fields, Keys & Data have the same working process.
         * - Pooling by using Core
         * - Specialisation using callbacks
         *
         * @return ...
         */
        core: {
            enumerable: false,
            writable: false,
            value: function () {
                // For better usage, each variant can be called directly
                // Call directly, return instance.
                // Call with empty parameter will return sub-methods
                if (arguments.length > 0) {
                    return self._data.core.apply(this).set.apply(this, arguments);
                }

                // Return basic method + those for call (fields, keys or data)
                let returning = Object.assign({
                    /**
                     * Flush & Set provided arguments values in bound variable name (this.data).
                     *
                     * @return {TableJs}
                     */
                    set: function () {
                        let data = self[`_${this.data}`];

                        // Refresh data
                        data = [];

                        // Add Data
                        return self._data.core.apply(this).add.apply(this, arguments);
                    },

                    /**
                     * Add to the end arguments values in bound variable name (this.data).
                     *
                     * @return {TableJs}
                     */
                    add: function () {
                        let data = self[`_${this.data}`];

                        // Pre processor for arguments
                        if (this.callbacks && this.callbacks.add && this.callbacks.add.pre) {
                            arguments = this.callbacks.add.pre.apply(this, arguments);
                        }

                        // Process arguments
                        for (let a = 0; a < arguments.length; a++) {
                            let argv = arguments[a];

                            // Argument value is an Array
                            if (argv instanceof Array) {
                                argv.forEach(function ($value) {
                                    if (data.lastIndexOf($value) < 0) {
                                        if (this.callbacks && this.callbacks.add && this.callbacks.add.push) {
                                            $value = this.callbacks.add.push.call(this, $value);
                                        }
                                        data.push($value);
                                    }
                                }.bind(this));
                            }
                            // Argument value is a String
                            if (typeof argv === 'string') {
                                if (data.lastIndexOf(argv) < 0) {
                                    if (this.callbacks && this.callbacks.add && this.callbacks.add.push) {
                                        argv = this.callbacks.add.push.call(this, argv);
                                    }
                                    data.push(argv);
                                }
                            } else {
                                // What can we do for other type ?
                            }
                        }

                        // Post Processing
                        if (this.callbacks && this.callbacks.add && this.callbacks.add.post) {
                            data = this.callbacks.add.post.call(this, data);
                        }

                        // Indexing Data
                        self._data.core.apply(this).indexing();

                        return self;
                    },

                    /**
                     * Return values stored in bounded variable name (this.data).
                     *
                     * @return {Array}
                     */
                    get: function () {
                        return self[`_${this.data}`];
                    },

                    // WIP
                    indexing: function () {
                        // Flush Indexes
                        self._indexes = {
                            byKeys: {},
                            byFields: {}
                        };

                        // Reading Data
                        for (let r = 0; r < self._data.length; r++) {
                            let row = self._data[r];

                            // Reading for fields
                            for (let f = 0; f < self._fields.length; f++) {
                                let field = self._fields[f];
                                let value = row[f];

                                if (!self._indexes.byFields[field]) self._indexes.byFields[field] = {};
                                if (!self._indexes.byFields[field][value]) self._indexes.byFields[field][value] = [];
                                self._indexes.byFields[field][value].push(r);
                            }

                            //
                        }
                    },

                    // WIP
                    values: function () {
                        let field = arguments[0];
                        let requestedValues = arguments[1];
                        let values = [];
                        let data = [];

                        // Process All argument (except first which is field)
                        for (let a = 0; a < requestedValues.length; a++) {
                            let forValue = requestedValues[a];

                            // For common processing, transform string to array
                            if (!(forValue instanceof Array)) {
                                forValue = [forValue];
                            }

                            // Manage duplicated values
                            forValue.forEach(function ($value) {
                                if(values.lastIndexOf($value) < 0) values.push($value);
                            });
                        }

                        // Retrieve rows for provided values
                        values.forEach(function ($value) {
                            self._indexes.byFields[field][$value].forEach(function ($index) {
                                if (self._data[$index]) data.push(self._data[$index]);
                            });
                        });

                        // Extend Array to have method for each field to continue selection
                        self._fields.forEach(function ($field) {
                            Object.defineProperty(data, $field, {enumerable: false, writable: true });
                            data[$field] = function () {
                                // Re-implement TableJs for partial game data
                                return localTable = new TableJs(
                                    self._fields,
                                    data
                                )[$field].apply(this, arguments);
                            }.bind(this);
                        });

                        return data;
                    },

                    value: function () {

                    }

                }, this.returns);

                // Create methods to get from fields
                let coreContext = this;
                self._fields.forEach(function ($field) {
                    returning[$field] = function () {
                        return self._data.core.apply(this).values.call(this, $field, arguments);
                    }.bind(coreContext);
                });

                // To standardize & for extended functions,
                // Make function wrapper to bind "this"
                for (let fName in returning) {
                    if (!returning.hasOwnProperty(fName)) continue;

                    let fn = returning[fName];
                    returning[fName] = function () {
                        return fn.apply(this, arguments);
                    }.bind(this);
                }

                return returning;
            }
        },

        /**
         * Field Manager.
         *
         * @return ...
         */
        fields: {
            enumerable: false,
            writable: false,
            value: function () {
                let functions = {
                    createMethod: function ($field) {
                        Object.defineProperty(self._data, $field, {
                            enumerable: false,
                            writable: false,
                            value: function () {
                                return self._data.core.apply(this).values.call(this, $field, arguments);
                            }
                        });

                        return $field;
                    }
                };

                let extended = {
                    data: 'fields',
                    callbacks: {
                        add: {
                            push: functions.createMethod
                        }
                    },
                    returns: functions
                };

                return self._data.core.apply(extended, arguments);
            }
        },

        /**
         * Keys Manager.
         *
         * @return ...
         */
        keys: {
            enumerable: false,
            writable: false,
            value: function () {
                let functions = {

                };

                let extended = {
                    data: 'keys',
                    callbacks: {},
                    returns: functions
                };

                return self._data.core.apply(extended, arguments);
            }
        },

        /**
         * Data Manager.
         *
         * @return ...
         */
        data: {
            enumerable: false,
            writable: false,
            value: function () {
                let functions = {
                    /**
                     * Add to the end values in the table data.
                     * - String value stands for one line
                     * - Array of string stands for one line
                     * - Array of Array stands for data matrix
                     * All here before type can be mixted at once
                     *
                     * @return ...
                     */
                    append: function () {
                        return self._data.core.apply(extended).add.apply(extended, arguments);
                    },

                    /**
                     * Wraps array of string into an array to become data matrix.
                     *
                     * @return {IArguments}
                     */
                    preprocArgs: function () {
                        for (let i in arguments) {
                            if(!arguments.hasOwnProperty(i)) continue;
                            let argv = arguments[i];

                            if (argv instanceof Array) {
                                if (argv.length > 0) {
                                    if (typeof argv[0] === 'string') {
                                        arguments[i] = [argv];
                                    }
                                }
                            }
                        }

                        return arguments;
                    },

                    /**
                     * Complete row according to number of set fields.
                     *
                     * @param {Array} $row  Data matrix row to process
                     *
                     * @return {Array} Consolidated row
                     */
                    consolidate: function ($row) {
                        if (typeof $row === 'string') {
                            $row = [$row];
                        }

                        let fieldsNumber = self._fields.length;
                        let rowNumber = $row.length;
                        let missingCell = fieldsNumber - rowNumber;

                        if (missingCell > 0) {
                            for (let i = 0; i < missingCell; i++) {
                                $row.push('');
                            }
                        }

                        return $row;
                    }
                };

                let extended = {
                    data: 'data',
                    callbacks: {
                        add: {
                            pre: functions.preprocArgs,
                            push: functions.consolidate
                        }
                    },
                    returns: functions
                };

                return self._data.core.apply(extended, arguments);
            }
        }
    });



    /** ------------------------------------------------------------------
     *   Internal Processing
     * -------------------------------------------------------------------
     */
    // Setting Up Fields
    if ($fields !== undefined) {
        self._data.fields($fields);
    }

    // Setting Up Data
    if ($array !== undefined)  {
        self._data.data($array);
    }

    return self._data;
}

module.exports = TableJsV2;

/**
 * new TableData()
 * new TableData(['Field_1', 'Field_2', 'Field_3'])
 * new TableData(['Field_1', 'Field_2', 'Field_3'], [['A', '2', '3']])
 * new TableData().setFields()
 *
 *
 */