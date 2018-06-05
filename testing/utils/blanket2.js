const combine = require('istanbul-combine');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

// async function loadCoverage(browser, host = 'localhost', port = 8081) {
//     try {
//         const coverageObject = await browser.execute(() => window.__coverage__);
//         const coverage = JSON.stringify(coverageObject);
//         console.log(`\nLogging coverage of length ${coverage.length}.`);
//
//         const options = {
//             port,
//             host,
//             path: '/coverage/client',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         };
//
//         const request = http.request(options, response => {
//             let data = '';
//             response.on('data', d => {
//                 data += d;
//             });
//
//             response.once('end', () => {
//                 console.log('Done sending coverage.\n');
//             });
//         });
//
//         request.write(coverage);
//         request.end();
//     } catch (err) {
//         console.error(err);
//     }
// };

async function loadCoverage(browser) {
    try {
        await browser.execute(() => {
            const coverage = localStorage.getItem('coverage');
            if (coverage) {
                window.__coverage__.value = JSON.parse(coverage).value;
                console.log('> Coverage loaded.');
            }
        });
    } catch (err) {
        console.error(err);
    }
}

async function saveCoverage(browser) {
    try {
        await browser.execute(() => {
            localStorage.setItem('coverage', JSON.stringify(window.__coverage__));

        });
    } catch (err) {
        console.error(err);
    }
}

async function writeCoverageToFile(browser) {
    try {
        const coverageObject = await browser.execute(() => localStorage.getItem('coverage')) || {};
        if (coverageObject.value) {
            const coverage = JSON.stringify(coverageObject);

            const coveragePath = path.join(__dirname, '../coverage');
            const coverageFile = path.join(coveragePath, `coverage.json`);

            if (!fs.existsSync(coveragePath)) {
                mkdirp.sync(coveragePath);
            }

            fs.writeFileSync(coverageFile, coverage);

            console.log(`\n> Wrote coverage to file: ${coverageFile}`);
        } else {
            console.error(`Coverage is empty for session with ID: ${coverageObject.sessionId}.`);
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    saveCoverage,
    loadCoverage,
    writeCoverageToFile
};
