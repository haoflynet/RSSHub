// jiefanghao
// .//node_modules/.bin/prettier --write "lib/routes/waibao/jfh.js"
const axios = require('../../utils/axios');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'post',
        url: 'https://www.jfh.com/jfportal/workMarket/getRequestData',
        data: {
            orderCondition: 1,
            orderConfig: 1,
            pageNo: 1,
            fitCode: 0,
            login: 1,
        },
    });

    const items = response.data.resultList.map((item) => {
        return {
            title: item.orderName,
            link: `https://www.jfh.com/jfportal/all/detail/jf${item.orderNo}`,
            pubDate: item.putTime,
            description: `
                <strong>类型:</strong> ${item.techDirection}<br>
                <strong>报名人数:</strong> ${item.bookCount}<br>
                <strong>价格:</strong> ${item.price}<br>
            `,
            guid: item.orderNo,
        };
    });

    ctx.state.data = {
        title: '解放号项目',
        link: 'https://www.jfh.com/jfportal/market/index',
        description: '解放号项目',
        item: items.filter((item) => item !== undefined),
    };
};
