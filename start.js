 import investigator from "async_investigator";  
  
const websites = [  
    {  
        "reason":"Currency conversion CAD to BRL",  
        "url": "https://www.xe.com/currencyconverter/convert/?Amount=1&From=BRL&To=CAD",  
        "textFound": "1 CAD",  
        "foundCallback": (website, html) => {  
            const x = html.indexOf('1 CAD = ')  
            const subhtml = html.substr(x)  
            const y = subhtml.substr(0, subhtml.indexOf('BRL'))  
            console.log(website.reason, ':', y)  
        },  
        "notFoundCallback": (website, html) => {  
            console.log( website.textFound, 'notFoundCallback')  
        }  
    },  
    {  
        "reason":"Flight ticket Toronto/São Paulo",  
        "url": "https://www.aircanada.com/en-ca/flights-from-toronto-to-sao-paulo",  
        "textFound": "CAD ",  
        "foundCallback": (website, html) => {  
            const x = html.indexOf(website.textFound)  
            const subhtml = html.substr(x)  
            const y = subhtml.substr(0, 9)  
            console.log(website.reason, ':', y)  
        },  
        "notFoundCallback": (website, html) => {  
            console.log( website.textFound, 'notFoundCallback')  
        }  
    }  
]  
  
investigator.get(websites)  