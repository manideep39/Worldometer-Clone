
var num = 0

function addComma(number) {
    var new_str = reverseString(number)
    var comma_string = ""
    comma_string += new_str[0]

    for (var i = 1; i < new_str.length; i++) {
        if (i % 3 == 0) {
            comma_string += "," + new_str[i]
        } else {
            comma_string += new_str[i]
        }
    }

    comma_string = reverseString(comma_string)
    return comma_string
}

function reverseString(number) {
    num = String(number)
    var new_str = ""
    for (var i = num.length - 1; i >= 0; i--) {
        new_str += num[i]
    }
    return new_str
}

console.log(addComma(num))