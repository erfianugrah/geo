addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    let html_style = "body {padding:6em; font-family: sans-serif;} h1 {color:#f6821f} h2 {color:#f6821f}"

    const newResponse = await fetch(html, request)
    const requestHeaders = JSON.stringify(Object.fromEntries(request.headers), null, 2)
    const responseHeaders = JSON.stringify(Object.fromEntries(newResponse.headers), null, 2)

    let list = ''

    let html_content = [
        `IP: ${request.headers.get('cf-connecting-ip')}`,
        `ASN: ${request.cf.asn}`,
        `Colo: ${request.cf.colo}`,
        `Country: ${request.cf.country}`,
        `City: ${request.cf.city}`,
        `Continent: ${request.cf.continent}`,
        `Latitude: ${request.cf.latitude}`,
        `Longitude: ${request.cf.longitude}`,
        `Postal Code: ${request.cf.postalCode}`,
        `Metro Code: ${request.cf.metroCode}`,
        `Region: ${request.cf.region}`,
        `Region Code: ${request.cf.regionCode}`,
        `Time-zone: ${request.cf.timezone}`,
        `Device: ${request.headers.get('cf-device-type')}`
    ]

    html_content.forEach(function (param) {
        list += `<ul>${param}</ul>`
    })

    let html = 
        `<!DOCTYPE html>
        <body>  
            <head>
            <title> Geolocation Data and Request/Response Parameters: Hello World </title>
            <style> ${html_style} </style>  
            </head>
    
        <h1> Geolocation Data and Request/Response Parameters: Hello World </h1>  
            <p>You now have access to geolocation data about where your user is visiting from.</p>  
                <ul>${list}</ul>
        <h2>Request Headers</h2>
            <pre>${requestHeaders}</pre>
        <h2>Response Headers</h2>
            <pre>${responseHeaders}</pre>
        </body>`

    let response = new Response(newResponse.body, newResponse)
    response.headers.set("cf-edge-cache", "no-cache")
    response.headers.set("content-type", "text/html;charset=UTF-8")
    return response
}
