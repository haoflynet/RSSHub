// 开源中国
const axios = require('../../utils/axios');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'https://zb.oschina.net/project/contractor-browse-project-and-reward',
        params: {
            applicationAreas: '',
            sortBy: 30,
            pageSize: 20,
            currentPage: 1,
        },
    });

    const items = response.data.data.data.map((item) => {
        const skills = [];
        item.skillList.map(function(item) {
            skills.push(item.value);
        });
        return {
            title: item.name,
            link: `https://zb.oschina.net/project/detail.html?id=${item.id}`,
            pubDate: item.publishTime,
            description: `
                <strong>报名人数</strong>: ${item.applyCount},
                <strong>技能</strong>: ${skills.toString()}
            `,
            guid: item.id,
        };
    });

    ctx.state.data = {
        title: '开源中国',
        link: 'https://zb.oschina.net/projects/list.html',
        description: '开源中国',
        item: items.filter((item) => item !== undefined),
    };
};
