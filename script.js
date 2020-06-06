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

window.addEventListener("load", function(params) {
    getGlobalSummary()

})

function getGlobalSummary(params) {
    var url = "https://api.covid19api.com/summary"
    xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", function(params) {
        if (xhr.readyState == 4) {
            var globSummary = JSON.parse(xhr.responseText).Global
            var countSummary = JSON.parse(xhr.responseText).Countries
            displayGlobalSummary(globSummary)
            displayCountSummary(countSummary, globSummary)
        }
    })
    xhr.open("get", url)
    xhr.send()
}

function displayGlobalSummary(obj) {
    var coronaCases = obj.TotalConfirmed
    var deaths = obj.TotalDeaths
    var recovered = obj.TotalRecovered
    var coronaCases_h1 = document.querySelector("#coronaCases h1")
    coronaCases_h1.textContent = addComma(String(coronaCases))
    var deaths_h1 = document.querySelector("#deaths h1")
    deaths_h1.textContent = addComma(String(deaths))
    var recovered_h1 = document.querySelector("#recovered h1")
    recovered_h1.textContent = addComma(String(recovered))
}


function displayCountSummary(obj, glob_obj) {
    var tbody = document.querySelector("table > tbody")

    // appending first row, i.e., world summary row
    var tr = document.createElement("tr")
    var tr_empty = document.createElement("td")
    var country = document.createElement("td")
    country.textContent = "World"
    var totalCases = document.createElement("td")
    totalCases.textContent = addComma(String(glob_obj.TotalConfirmed))
    var newConformed = document.createElement("td")
    newConformed.textContent = "+" + addComma(String(glob_obj.NewConfirmed))
    var totalDeaths = document.createElement("td")
    totalDeaths.textContent = addComma(String(glob_obj.TotalDeaths))
    var newDeaths = document.createElement("td")
    newDeaths.textContent = "+" + addComma(String(glob_obj.NewDeaths))
    var totalRecov = document.createElement("td")
    totalRecov.textContent = addComma(String(glob_obj.TotalRecovered))
    var activeCases = document.createElement("td")
    var temp = glob_obj.TotalConfirmed - glob_obj.TotalDeaths - glob_obj.TotalRecovered
    activeCases.textContent = addComma(String(temp))
    tr.append(tr_empty, country, totalCases, newConformed, totalDeaths, newDeaths, totalRecov, activeCases)
    tbody.append(tr)
    // appending countries 
    for (var i in obj) {
        var tr = document.createElement("tr")
        var count = document.createElement("td")
        count.textContent = i
        var country = document.createElement("td")
        country.textContent = obj[i].Country
        var totalCases = document.createElement("td")
        totalCases.textContent = addComma(String(obj[i].TotalConfirmed))
        var newCases = document.createElement("td")

        if (obj[i].NewConfirmed) {
            newCases.textContent = "+" + addComma(String(obj[i].NewConfirmed))
            newCases.style.backgroundColor = "#feeeaa"
        } else {
            newCases.textContent = ""
        }

        var totalDeaths = document.createElement("td")
        totalDeaths.textContent = addComma(String(obj[i].TotalDeaths))
        var newDeaths = document.createElement("td")

        if (obj[i].NewDeaths) {
            newDeaths.textContent = "+" + addComma(String(obj[i].NewDeaths))
            newDeaths.style.backgroundColor = "#ff0000"
            newDeaths.style.color = "white"
        } else {
            newDeaths.textContent = ""
        }
        
        var totalRecov = document.createElement("td")
        totalRecov.textContent = addComma(String(obj[i].TotalRecovered))
        var activeCases = document.createElement("td")
        var temp = obj[i].TotalConfirmed - obj[i].TotalDeaths - obj[i].TotalRecovered
        activeCases.textContent = addComma(String(temp))

        if (obj[i].TotalConfirmed == obj[i].TotalRecovered) {
            tr.style.backgroundColor = "#e9f8d5"
        }

        tr.append(count, country, totalCases, newCases, totalDeaths, newDeaths, totalRecov, activeCases)
        tbody.append(tr)
    }
}
