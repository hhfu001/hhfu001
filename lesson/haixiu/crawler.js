const superagent = require('superagent');
const async = require('async');
const cheerio = require('cheerio');
const Model = require('./models/haixiu');
const config = require('./config');

const group = 'http://www.douban.com/group/haixiuzu/';


superagent.get(group)
    .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
    .set('Cookie', config.douban_cookie)
    .end(function (err, sres) {
        if (err) console.log(err);

        let topicUrls = [];
        const $ = cheerio.load(sres.text);

        $('.ckd-title').each(function (i, item) {
            const url = $(item).attr('href');

            if (/topic\/\d{8}/.test(url)) {
                topicUrls.push(url);
            }
        });
// console.log(topicUrls)

        let _data;
        // topicUrls = topicUrls.slice(0, 1);
        async.mapLimit(topicUrls, 10, function (url, callback) {

            superagent.get(url)
                .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
                .set('Cookie', config.douban_cookie)
                .end(function (err, res) {

                    const $ = cheerio.load(res.text);

                    let imgs = [];

                    $('.topic-figure img').each(function (i, img) {
                        const img_url = $(img).attr('src');

                        img_url.replace(/^https:/, 'http:');
                        imgs.push(img_url)
                    })

                    const $author = $('.author-title');
                    const data = {
                        title: $('title').text(),
                        url: url,
                        imgs: imgs,
                        author: $author.text(),
                        author_url: $author.attr('href'),
                        author_location: '',
                        create_at: new Date($('.author-desc').text())
                    }

                    _data = new Model(data);

                    // Model.findByUrl(url, function(err, res){
                    //     console.log(err, res)
                    // })

                    _data.save(function (err, dt) {
                        if (err) console.log(err);
                    });
                    callback(null, data);

                });

        }, function (err, result) {
            // console.log(result);

        });

    });