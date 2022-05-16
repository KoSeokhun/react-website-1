const express = require('express');
const router = express.Router();
// const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const axios = require('axios');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const log = console.log;


//=================================
//             Data
//=================================

router.get("/ytn", auth, (req, res) => {
    const getData = async () => {
        try {
            const html = await axios.get("https://www.yna.co.kr/sports/all");
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.list-type038 ul li").children("div.item-box01");

            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('div.news-con a.tit-wrap strong.tit-news').text(),
                    url: $(this).find('div.news-con a.tit-wrap').attr('href'),
                    image_url: $(this).find('figure.img-con a img').attr('src'),
                    image_alt: $(this).find('figure.img-con a img').attr('alt'),
                    summary: $(this).find('p.lead').text().slice(0, -11),
                    date: $(this).find('div.info-box01 span.txt-time').text()
                };
            });

            const data = ulList.filter(n => n.title);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return getData()
        .then(data => {
            if (data) {
                return res.status(200).json({
                    fetchSuccess: true,
                    data: data,
                });
            }
            else {
                return res.status(400).json({
                    fetchSuccess: false,
                });
            }
        })
});

router.get("/saramin", auth, (req, res) => {
    const getData = async () => {
        try {
            const html = await axios.get("https://www.yna.co.kr/sports/all");
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.list-type038 ul li").children("div.item-box01");

            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('div.news-con a.tit-wrap strong.tit-news').text(),
                    url: $(this).find('div.news-con a.tit-wrap').attr('href'),
                    image_url: $(this).find('figure.img-con a img').attr('src'),
                    image_alt: $(this).find('figure.img-con a img').attr('alt'),
                    summary: $(this).find('p.lead').text().slice(0, -11),
                    date: $(this).find('div.info-box01 span.txt-time').text()
                };
            });

            const data = ulList.filter(n => n.title);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return getData()
        .then(data => {
            if (data) {
                return res.status(200).json({
                    fetchSuccess: true,
                    data: data,
                });
            }
            else {
                return res.status(400).json({
                    fetchSuccess: false,
                });
            }
        })
});

module.exports = router;