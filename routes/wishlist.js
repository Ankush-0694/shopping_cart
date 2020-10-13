const express = require('express')
const route = express.Router()
const w_item = require('../model/wishlist_item')


route.get('/', (req, res) => {
    res.render('wishlist', {
                style: 'wishlist.css',
                layout: 'layouts/main',
                javascript: 'wishlistClient.js',
                username: req.user.username
    })
})



module.exports = {
    route
}