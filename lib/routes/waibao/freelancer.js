// .//node_modules/.bin/prettier --write "lib/routes/waibao/freelancer.js"

const axios = require('../../utils/axios');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const type = ctx.params.type;
    const min_bids = ctx.params.min_bids ? ctx.params.min_bids : 10;

    const response = await axios({
        method: 'get',
        url: `https://www.freelancer.com/work/${type}/`,
    });

    const $ = cheerio.load(response.data);
    const items = [];

    $('div.JobSearchCard-item').map(function(i, item) {
        const job = $(item);
        const bids = job
            .find('div.JobSearchCard-secondary-entry')
            .text()
            .replace('bids', '')
            .trim();
        if (bids > min_bids) {
            return item;
        }
        items.push({
            title: job
                .find('a.JobSearchCard-primary-heading-link')
                .text()
                .trim(),
            link: 'https://www.freelancer.com' + job.find('a.JobSearchCard-primary-heading-link').attr('href'),
            description: job
                .find('p.JobSearchCard-primary-description')
                .text()
                .trim(),
            guid: job.find('a.JobSearchCard-primary-heading-link').attr('href'),
        });
        return item;
    });

    ctx.state.data = {
        title: 'freelancer',
        link: 'https://www.freelancer.com',
        description: '外国的freelancer',
        item: items.filter((item) => item !== undefined),
    };
};
