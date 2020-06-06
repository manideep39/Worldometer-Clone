
window.addEventListener("load", function(params) {
    getSummary()
})

function getSummary(params) {
    var url = "https://api.covid19api.com/summary"
    xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", function(params) {
        if (xhr.readyState == 4) {
            var summary = JSON.parse(xhr.responseText).Global
            displaySummary(summary)
        }
    })
    xhr.open("get", url)
    xhr.send()
}

function displaySummary(obj) {
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