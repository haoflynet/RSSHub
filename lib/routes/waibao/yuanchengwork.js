// yuancheng.work
// .//node_modules/.bin/prettier --write "lib/routes/waibao/yuanchengwork.js"
const axios = require('../../utils/axios');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'https://yuancheng.work/',
    });

    const $ = cheerio.load(response.data);
    const items = [];

    $('div.job').map(function(i, item) {
        const job = $(item);
        items.push({
            title: job
                .find('div.job-body')
                .text()
                .replace(/\s+/g, ''),
            link: job.find('a.job-title').attr('href'),
            pubDate: job.find('div.job-date').attr('date'),
            description: job.find('div.job-content').html(),
            guid: job.find('div.job-brief').attr('data-id'),
        });
        return item;
    });

    ctx.state.data = {
        title: '远程.work',
        link: 'https://yuancheng.work/',
        description: '全职/兼职远程工作',
        item: items.filter((item) => item !== undefined),
    };
};
