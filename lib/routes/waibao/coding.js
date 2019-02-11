const axios = require('../../utils/axios');

module.exports = async (ctx) => {
    const roles = ctx.params.roles;
    const maxBids = 5;

    const response = await axios({
        method: 'get',
        url: 'https://codemart.com/api/project',
    });

    const items = response.data.rewards.map((item) => {
        if (roles === undefined || item.roles === roles) {
            if (item.applyCount !== undefined && item.applyCount < maxBids) {
                return {
                    title: item.name,
                    link: `https://codemart.com/project/${item.id}`,
                    pubDate: new Date(item.pubTime / 1000).toUTCString(),
                    description: `
                        <img src="${item.cover}"><br>
                        <strong>描述</strong>${item.description}<br>
                        <strong>招募</strong>${item.roles}<br>
                        <strong>周期</strong>${item.duration}<br>
                        <strong>类型</strong>${item.typeText}<br>
                        <strong>报名人数</strong>${item.applyCount}<br>
                    `,
                    guid: item.id,
                };
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    });

    ctx.state.data = {
        title: roles === undefined ? '码市项目' : `码市项目-${roles}`,
        link: 'https://codemart.com/projects',
        description: '码市项目',
        item: items.filter((item) => item !== undefined),
    };
};
