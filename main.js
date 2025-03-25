//ESERCIZIO SENZA BONUS
"use strict"
const baseUrl = "https://boolean-spec-frontend.vercel.app/freetestapi";

async function fetchData(url) { // Funzione di supporto per eseguire la richiesta http e restituire una promise con un oggetto nel corpo della richiesta.
    const fetchData = await fetch(url);
    const objParsed = await fetchData.json();
    return objParsed[0];
}

// async function getDashboardData(query) {
// 
//     const name = fetchData(baseUrl + `/destinations?search=${query}`); // Effettuiamo le richieste http creando le promise da restituire all Promise.all()
//     const weather = fetchData(baseUrl + `/weathers?search=${query}`);
//     const airPortName = fetchData(baseUrl + `/airports?search=${query}`);
//     const result = await Promise.all([name, weather, airPortName]); // Risolviamo in parallelo le promise restituite precedentemente.
// 
//     const obj = { // Returniamo un oggetto con le proprietà e i valori catturati.
//         city: result[0].name,
//         country: result[0].country,
//         temperature: result[1].temperature,
//         weather: result[1].weather_description,
//         airport: result[2].name
//     }
// 
//     return obj;
// }
// 
// (async () => {
//     const data = await getDashboardData("Paris");
//     console.log("DashBoardData:", data);
//     console.log(`${data.city} is in ${data.country}.\n` +
//         `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//         `The main airport is ${data.airport}.\n`)
// })()

// BONUS 1 + BONUS 2

async function getDashboardData(query) {

    const name = fetchData(baseUrl + `/destinations?search=${query}`); // Effettuiamo le richieste http creando le promise da restituire all Promise.all()
    const weather = fetchData("https://www.meteofittizio.it");
    const airPortName = fetchData(baseUrl + `/airports?search=${query}`);
    const result = await Promise.allSettled([name, weather, airPortName]); // Risolviamo in parallelo le promise restituite precedentemente.
    result.forEach(element => {
        if (element.status === "rejected") {
            console.error(element.reason)
        }
    });

    const obj = { // Returniamo un oggetto con le proprietà e i valori catturati.
        city: result[0].value ? result[0].value.name : null,
        country: result[0].value ? result[0].value.country : null,
        temperature: result[1].value ? result[1].value.temperature : null,
        weather: result[1].value ? result[1].value.weather_description : null,
        airport: result[2].value ? result[2].value.name : null,
    }

    return obj;
}

(async () => {
    const data = await getDashboardData("Vienna");
    let msg = `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`

    if (!data.temperature || !data.weather) {
        msg = ""
    }

    console.log("DashBoardData:", data);
    console.log(`${data.city} is in ${data.country}.\n` +
        msg +
        `The main airport is ${data.airport}.\n`)
})() 
