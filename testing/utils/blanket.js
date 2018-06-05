const path = require('path');
const fs = require('fs');

const COVERAGE_FILE = path.resolve('./.nyc_output/out.json');

async function loadCoverage(browser, file = COVERAGE_FILE) {
    try {
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file);
            const coverage = JSON.parse(data);

            await browser.execute(cov => {
                if (window.__coverage__) {
                    window.__coverage__.value = cov.value;
                } else if (window) {
                    window.__coverage__ = cov;
                }
            }, coverage);

            console.log(`> Coverage [${data.length}] loaded.`);
        }
    } catch (err) {
        console.error(err);
    }
}

async function saveCoverage(browser, file = COVERAGE_FILE) {
    try {
        const coverage = await browser.execute(() => window.__coverage__);

        const data = JSON.stringify(coverage);
        fs.writeFileSync(file, data);

        console.log(`> Coverage [${data.length}] saved to: ${file}`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    saveCoverage,
    loadCoverage
};
