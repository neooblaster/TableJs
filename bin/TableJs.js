clog = console.log;


/**
 * Callback System :
 *  - Core.add() :
 *      - pre,  receive {Arguments},    must return {Arguments}.
 *      - push, receive {String|Array}, must return {String|Array}.
 *
 */

/**
 *
 * @param $fields
 * @param $array
 * @return {TableJs}
 * @constructor
 */


function TableJs($fields, $array) {
    let self = this;

    self._fields = [];
    self._keys = [];
    self._data = [];
    self._indexes = {};

    /**
     * Fields, Keys & Data have the same working process.
     * - Pooling by using Core
     * - Specialisation using callbacks
     *
     * @return ...
     */
    self.core = function () {
        // For better usage, each variant can be called directly
        // Call directly, return instance.
        // Call with empty parameter will return sub-methods
        if (arguments.length > 0) {
            return self.core.apply(this).set.apply(this, arguments);
        }

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
                return self.core.apply(this).add.apply(this, arguments);
            },

            /**
             * Add to the end arguments values in bound variable name (this.data).
             *
             * @return {TableJs}
             */
            add: function () {
                let data      = self[`_${this.data}`];

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

            values: function () {

                return [];
            }
        }, this.returns);

        // Create methods to get from fields
        let coreContext = this;
        self._fields.forEach(function ($field) {
            returning[$field] = function () {
                return self.core.apply(this).values.call(this, $field, arguments);
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
    };

    /**
     * Field Manager.
     *
     * @return ...
     */
    self.fields = function () {
        let functions = {
            createMethod: function ($field) {
                self[$field] = function () {
                    return self.core.apply(this).values.call(this, $field, arguments);
                }.bind(this);

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

        return self.core.apply(extended, arguments);
    };

    /**
     * Keys Manager.
     *
     * @return ...
     */
    self.keys = function () {
        let functions = {

        };

        let extended = {
            data: 'keys',
            callbacks: {},
            returns: functions
        };

        return self.core.apply(extended, arguments);
    };

    /**
     * Data Manager.
     *
     * @return ...
     */
    self.data = function () {
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
                return self.core.apply(extended).add.apply(extended, arguments);
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

        return self.core.apply(extended, arguments);
    };




    /** ------------------------------------------------------------------
     *   Internal Processing
     * -------------------------------------------------------------------
     */
    // Setting Up Fields
    if ($fields !== undefined) {
        self.fields($fields);
    }

    if ($array !== undefined)  {
        self.data($array);
    }

    return self;
}

module.exports = TableJs;

/**
 * new TableData()
 * new TableData(['Field_1', 'Field_2', 'Field_3'])
 * new TableData(['Field_1', 'Field_2', 'Field_3'], [['A', '2', '3']])
 * new TableData().setFields()
 *
 *
 */