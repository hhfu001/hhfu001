const cities = [{
    key: 'hangzhou',
    name: '浙江杭州'
}, {
    key: 'shanghai',
    name: '上海'
}, {
    key: 'beijing',
    name: '北京'
}, {
    key: 'chengdu',
    name: '四川成都'
}, {
    key: 'nanning',
    name: '广西南宁'
}, {
    key: 'changsha',
    name: '湖南长沙'
}, {
    key: 'changsanjiao',
    name: '长三角',
    names: [
        '浙江杭州', '浙江温州', '浙江宁波', '浙江台州',
        '浙江嘉兴', '浙江金华', '浙江绍兴', '浙江湖州',
        '浙江丽水', '浙江衢州', '浙江舟山', '上海', '江苏南京'
    ]
}, {
    key: 'guangzhou',
    name: '广东广州'
}, {
    key: 'shenzhen',
    name: '广东深圳'
}, ];



let config = {
    mongodb_url: process.env.MONGOHQ_URL || 'mongodb://localhost/cellphonepics',
    port: process.env.PORT || 3000,
    douban_cookie: 'll="108296"; bid=HLOzsNQj1bE; gr_user_id=cdf64fcc-bade-4f36-9636-044aa5c9b3e5; viewed="10733304_1467587"; _vwo_uuid_v2=EE3082146D6C93AECD0C1E4633337C70|cfec367472d8558e01dfa2b7373ce683; ap=1; __ads_session=KRZHuOfUwAg5X6wBvQA=; ps=y; ck=d1Rb; push_noty_num=0; push_doumail_num=0; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1468566234%2C%22http%3A%2F%2Flocalhost%3A3000%2Fall%22%5D; _pk_id.100001.8cb4=afcbec078861f4a5.1467875268.8.1468566234.1468561842.; _pk_ses.100001.8cb4=*; __utma=30149280.1214664806.1467020529.1468561845.1468566235.6; __utmb=30149280.8.4.1468566235; __utmc=30149280; __utmz=30149280.1468566235.6.3.utmcsr=localhost:3000|utmccn=(referral)|utmcmd=referral|utmcct=/all; __utmv=30149280.4686; ct=y',
    gaid: 'UA-26476625-4',
    cities: cities
};

exports = module.exports = config;