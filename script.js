
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
    coronaCases_h1.textContent = coronaCases
    var deaths_h1 = document.querySelector("#deaths h1")
    deaths_h1.textContent = deaths
    var recovered_h1 = document.querySelector("#recovered h1")
    recovered_h1.textContent = recovered
}


function displayCountSummary(obj, glob_obj) {
    var tbody = document.querySelector("table > tbody")

    // appending first row, i.e., world summary row
    var tr = document.createElement("tr")
    var tr_empty = document.createElement("td")
    var country = document.createElement("td")
    country.textContent = "World"
    var totalCases = document.createElement("td")
    totalCases.textContent = glob_obj.TotalConfirmed
    var newConformed = document.createElement("td")
    newConformed.textContent = "+" + glob_obj.NewConfirmed
    var totalDeaths = document.createElement("td")
    totalDeaths.textContent = glob_obj.TotalDeaths
    var newDeaths = document.createElement("td")
    newDeaths.textContent = "+" + glob_obj.NewDeaths
    var totalRecov = document.createElement("td")
    totalRecov.textContent = glob_obj.TotalRecovered
    var activeCases = document.createElement("td")
    activeCases.textContent = glob_obj.TotalConfirmed - glob_obj.TotalDeaths - glob_obj.TotalRecovered
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
        totalCases.textContent = obj[i].TotalConfirmed
        var newCases = document.createElement("td")

        if (obj[i].NewConfirmed) {
            newCases.textContent = "+" + obj[i].NewConfirmed
            newCases.style.backgroundColor = "#feeeaa"
        } else {
            newCases.textContent = ""
        }

        var totalDeaths = document.createElement("td")
        totalDeaths.textContent = obj[i].TotalDeaths
        var newDeaths = document.createElement("td")

        if (obj[i].NewDeaths) {
            newDeaths.textContent = "+" + obj[i].NewDeaths
            newDeaths.style.backgroundColor = "#ff0000"
            newDeaths.style.color = "white"
        } else {
            newDeaths.textContent = ""
        }
        
        var totalRecov = document.createElement("td")
        totalRecov.textContent = obj[i].TotalRecovered
        var activeCases = document.createElement("td")
        activeCases.textContent = obj[i].TotalConfirmed - obj[i].TotalDeaths - obj[i].TotalRecovered

        if (obj[i].TotalConfirmed == obj[i].TotalRecovered) {
            tr.style.backgroundColor = "#e9f8d5"
        }

        tr.append(count, country, totalCases, newCases, totalDeaths, newDeaths, totalRecov, activeCases)
        tbody.append(tr)
    }
}
