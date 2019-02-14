// 云沃客
const axios = require('../../utils/axios');

module.exports = async (ctx) => {
    const timestamp = Date.parse(new Date());

    const response = await axios({
        method: 'get',
        url: `https://www.clouderwork.com/api/v2/jobs/search?ts=${timestamp}&keyword=&budget_range=&work_status=1&pagesize=20&pagenum=1&sort=1&scope=`,
    });

    const items = response.data.jobs.map((item) => {
        if (item.pattern === '驻场项目' || item.applicants >= 10) {
            return undefined;
        } else {
            return {
                title: item.name,
                link: `https://www.clouderwork.com/jobs/${item.id}`,
                pubDate: new Date(item.publish_at * 1000).toUTCString(),
                description: `
                    <strong>类型:</strong> ${item.pattern}<br>
                    <strong>周期:</strong> ${item.period}天<br>
                    <strong>预算:</strong> ${item.min_budget}<br>
                    <strong>描述:</strong> ${item.summary}<br>
                    <strong>浏览量:</strong> ${item.views_count}<br>
                `,
                guid: item.id,
            };
        }
    });

    ctx.state.data = {
        title: `云沃客项目`,
        link: 'https://www.clouderwork.com/jobs',
        description: '云沃客项目',
        item: items.filter((item) => item !== undefined),
    };
};
