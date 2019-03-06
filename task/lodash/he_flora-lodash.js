var he_flora = {
    chunk: function(array, size = 1) {
        var result = []
        var temp = [] //临时数组
        for (var i = 0; i < array.length; i++) {
            temp.push(array[i])
            if (temp.length == size) {
                result.push(temp)
                temp = []
            }
        }
        if (array.length % size != 0) {
            result.push(temp)
        }
        return result
    },
    compact: function(array) {
        var Array2 = []
        for (i = 0; i < array.length; i++) {
            if (array[i]) {
                Array2.push(array[i])
            }
        }
        return Array2
    },
    difference: function(array, values) {
        for (var i = 0; i < array.length; i++) {
            for (j = 0; j < values.length; j++) {
                if (array[i] == values[j]) {
                    array.splice(i, 1);
                    i--
                    break
                }
            }
        }
        return array
    },
    drop: function(array, n = 1) {
        if (array.length < n) {
            var none = []
            return none
        } else if (n == 0) {
            return array
        } else {
            for (var i = 0; i < array.length; i++) {
                array.splice(i, n)
                return array
            }
        }
    },
    dropRight: function(array, n = 1) {
        if (array.length < n) {
            var none = []
            return none
        } else if (n == 0) {
            return array
        } else {
            var newArray = []
            for (var i = 0; i < array.length - n; i++) {
                newArray.push(array[i])
            }
            return newArray
        }
    },
    fill: function(array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    },
    flatten: function(array) {
        var newArray = []
        for (var i = 0; i < array.length; i++) {
            newArray = newArray.concat(array[i])
        }
        return newArray

    },
    flattenDeep: function(array) {
        var newArray = new Array()
        return forFlattenDeep(array)

        function forFlattenDeep(a) {
            for (var i = 0; i < a.length; i++) {
                if (!(a[i] instanceof Array)) {
                    newArray.push(a[i])
                } else {
                    forFlattenDeep(a[i])
                }
            }
            return newArray
        }
    },
    fromPairs: function(array) {
        var result = {}
        var a
        var b
        for (var i = 0; i < array.length; i++) {
            a = array[i][0]
            b = array[i][1]
            result[a] = b
        }
        return result
    },
    head: function(array) {
        if (array == null) {
            return underfined
        } else {
            var result
            result = array[0]
        }
        return result
    },
    initial: function(array) {
        for (var i = array.length - 1; i < array.length; i++) {
            array.splice(i, 1)
        }
        return array
    },
    last: function(array) {
        return array.pop()
    },
    pull: function(array, value1, value2) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (array[i] != value1 && array[i] != value2) {
                result.push(array[i])
            }
        }
        return result
    },
    pullAll: function(array, values) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[i] == values[j]) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    },

    parseJson: function(jsonStr) {
        var i = 0
        var str = jsonStr
        return parseValue()

        function parseValue() {
            if (str[i] === '{') {
                return parseObject()
            } else if (str[i] === '[') {
                return parseArray()
            } else if (str[i] === 'n') {
                return parseNull()
            } else if (str[i] === 't') {
                return parseTrue()
            } else if (str[i] === 'f') {
                return parseFalse()
            } else if (str[i] === '"') {
                return parseString()
            } else {
                return parseNumber()
            }
        }

        function parseString() {
            var result = ''
            i++
            while (str[i] != '"') {
                result += str[i++]
            }
            i++
            return result
        }

        function parseArray() {
            i++
            var result = []
            while (str[i] !== ']') {
                result.push(parseValue())
                if (str[i] === ',') {
                    i++
                }
            }
            i++
            return result
        }


        function parseNull() {
            var content = str.substr(i, 4)
            if (content === 'null') {
                i += 4
                return null
            } else {
                throw new Error('Unexpected char at pos: ' + i)
            }
        }

        function parseFalse() {
            var content = str.substr(i, 5)

            if (content === 'false') {
                i += 5
                return false
            } else {
                throw new Error('Unexpected char at pos: ' + i)
            }
        }

        function parseTrue() {
            var content = str.substr(i, 4)

            if (content === 'true') {
                i += 4
                return true
            } else {
                throw new Error('Unexpected char at pos: ' + i)
            }
        }

        function parseNumber() {
            var numStr = ''
            while (isNumberChar(str[i])) {
                numStr += str[i++]
            }
            return parseFloat(numStr)
        }

        function isNumberChar(c) {
            var chars = {
                '-': true,
                '+': true,
                'e': true,
                'E': true,
                '.': true
            }
            if (chars[c]) {
                return true
            }
            if (c >= '0' && c <= '9') {
                return true
            }
            return false
        }


        function parseObject() {
            i++
            var result = {}
            while (str[i] !== '}') {
                var key = parseString()
                i++
                var value = parseValue()
                result[key] = value
                if (str[i] === ',') {
                    i++
                }
            }
            i++
            return result
        }
    }


}
