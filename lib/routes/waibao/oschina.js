// 开源中国
const axios = require('../../utils/axios');

module.exports = async (ctx) => {
    const today = new Date();
    const response = await axios({
        method: 'get',
        url: 'https://zb.oschina.net/project/contractor-browse-project-and-reward',
        params: {
            applicationAreas: '',
            sortBy: 30,
            pageSize: 10,
            currentPage: 1,
            currentTime: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
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
            guid: item.name + today.getDate(),
        };
    });

    ctx.state.data = {
        title: '开源中国',
        link: 'https://zb.oschina.net/projects/list.html',
        description: '开源中国',
        item: items.filter((item) => item !== undefined),
    };
};
