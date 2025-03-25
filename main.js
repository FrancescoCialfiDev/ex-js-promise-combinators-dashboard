//ESERCIZIO SENZA BONUS
"use strict"
const baseUrl = "https://boolean-spec-frontend.vercel.app/freetestapi";

async function fetchData(url) { // Funzione di supporto per eseguire la richiesta http e restituire una promise con un oggetto nel corpo della richiesta.
    const fetchData = await fetch(url);
    const objParsed = await fetchData.json();
    return objParsed[0];
}
//
// async function getDashboardData(query) {
//
//     try {
//         const name = fetchData(baseUrl + `/destinations?search=${query}`); // Effettuiamo le richieste http creando le promise da restituire all Promise.all()
//         const weather = fetchData(baseUrl + `/weathers?search=${query}`);
//         const airPortName = fetchData(baseUrl + `/airports?search=${query}`);
//         const result = await Promise.all([name, weather, airPortName]); // Risolviamo in parallelo le promise restituite precedentemente.
//
//         const obj = { // Returniamo un oggetto con le proprietà e i valori catturati.
//             city: result[0].name,
//             country: result[0].country,
//             temperature: result[1].temperature,
//             weather: result[1].weather_description,
//             airport: result[2].name
//         }
//
//         return obj;
//     } catch (error) {
//         throw new Error("Impossibile recuperare i dati:" + " " + error.message)
//     }
//
// }
//
// (async () => {
//     const data = await getDashboardData("Paris");
//     console.log("DashBoardData:", data);
//     console.log(`${data.city} is in ${data.country}.\n` +
//         `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//         `The main airport is ${data.airport}.\n`)
// })()

// BONUS 1

// async function getDashboardData(query) {
//     try {
//         const name = fetchData(baseUrl + `/destinations?search=${query}`); // Effettuiamo le richieste http creando le promise da restituire all Promise.all()
//         const weather = fetchData(baseUrl + `/weathers?search=${query}`);
//         const airPortName = fetchData(baseUrl + `/airports?search=${query}`);
//         const result = await Promise.all([name, weather, airPortName]); // Risolviamo in parallelo le promise restituite precedentemente.
//         console.log(result[0])
//
//         const obj = { // Returniamo un oggetto con le proprietà e i valori catturati.
//             city: result[0]?.name ?? null,
//             country: result[0]?.country ?? null,
//             temperature: result[1]?.temperature ?? null,
//             weather: result[1]?.weather_description ?? null,
//             airport: result[2]?.name ?? null,
//         }
//
//         return obj
//     } catch (error) {
//         throw new Error("Impossibile recuperare i dati:" + " " + error.message)
//     }
//
// }
//
// (async () => {
//     const data = await getDashboardData("Vienna");
//     console.log('Dashboard data:', data);
//     let frase = '';
//     if (data.city !== null && data.country !== null) {
//         frase += `${data.city} is in ${data.country}.\n`;
//     }
//     if (data.temperature !== null && data.weather !== null) {
//         frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
//     }
//     if (data.airport !== null) {
//         frase += `The main airport is ${data.airport}.\n`;
//     }
//     console.log(frase);
// })()


// BONUS 2

async function getDashboardData(query) {

    try {
        const name = fetchData(baseUrl + `/destinations?search=${query}`); // Effettuiamo le richieste http creando le promise da restituire all Promise.all
        const weather = fetchData(baseUrl + `/weathers?search=${query}`);
        const airPortName = fetchData(baseUrl + `/airports?search=${query}`);
        const result = await Promise.allSettled([name, weather, airPortName]); // Risolviamo in parallelo le promise restituite precedentemente.
        console.log(result)

        const data = {}
        if (result[0].status === "rejected") {
            console.error(result[0].reason)
            data.city = null
            data.country = null
        } else {
            data.city = result[0].value?.name ?? null,
                data.country = result[0].value?.country ?? null
        }
        if (result[1].status === "rejected") {
            console.error("Errore in wheater", result[1].reason)
            data.temperature = null
            data.weather = null
        } else {
            data.temperature = result[1].value?.temperature ?? null,
                data.weather = result[1].value?.weather_description ?? null
        }
        if (result[2].status === "rejected") {
            console.error("Errore in AirPort", result[2].reason)
            data.city = null
            data.country = null
        } else {
            data.airport = result[2].value?.name ?? null
        }

        return data
    } catch (error) {
        throw new Error("Impossibile recuperare i dati:" + " " + error.message)
    }
}

(async () => {
    const data = await getDashboardData("Vienna");
    console.log('Dashboard data:', data);
    let frase = '';
    if (data.city !== null && data.country !== null) {
        frase += `${data.city} is in ${data.country}.\n`;
    }
    if (data.temperature !== null && data.weather !== null) {
        frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
    }
    if (data.airport !== null) {
        frase += `The main airport is ${data.airport}.\n`;
    }
    console.log(frase);
})()