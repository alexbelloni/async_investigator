import fetch from 'node-fetch';

const AsyncInvestigator = () => {

    function get(websites, callback) {
        const promises = websites.map(website => {
            return new Promise((resolve, reject) => {
                fetch(website.url)
                    .then(s => s.text())
                    .then(s => {
                        resolve({ website, html: s })
                    })
                    .catch(e => reject(e))
            })
        })

        Promise.all(promises)
            .then(resolves => {
                resolves.forEach(resolve => {
                    const { website, html } = resolve
                    if (!website.textFound || html.indexOf(website.textFound) >= 0) {
                        website.foundCallback(website, html)
                    } else {
                        website.notFoundCallback(website, html)
                    }
                });
            })
            .catch(e => { console.log('error::::', e); callback(); })
    }

    return {
        get
    }

}

// const websites = [
//     {
//         "reason":"",
//         "url": "",
//         "textFound": "",
//         "foundCallback": (website, html) => {
//         },
//         "notFoundCallback": (website, html) => {
//         }
//     }}

export default AsyncInvestigator()



