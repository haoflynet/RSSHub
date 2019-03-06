// 实现网
const axios = require('../../utils/axios');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'https://shixian.com/jobs',
    });
    const $ = cheerio.load(response.data);
    const items = [];

    $('div.job-list div.job').map(function(i, item) {
        const job = $(item);
        items.push({
            title: job
                .find('h5.title')
                .text()
                .trim(),
            link: 'https://shixian.com' + job.find('a').attr('href'),
            // pubDate:
            description: `
                <strong>类型: </strong> ${job
                    .find('span.type')
                    .text()
                    .trim()}<br>
                <strong>技能: </strong> ${job
                    .find('div.skill-tags')
                    .text()
                    .trim()}<br>
               ${job
                   .find('div.hidden-xs')
                   .text()
                   .trim()}
                <strong>详细描述: </strong> ${job
                    .find('p.describe')
                    .text()
                    .trim()}<br>
                <strong>发布时间: </strong> ${job
                    .find('span.publish-at')
                    .text()
                    .trim()}<br>
            `,
            guid: job
                .find('a')
                .attr('href')
                .split('/')[2],
        });
        return item;
    });

    ctx.state.data = {
        title: '实现网项目',
        link: 'https://shixian.com/jobs',
        description: '实现网项目',
        item: items.filter((item) => item !== undefined),
    };
};
