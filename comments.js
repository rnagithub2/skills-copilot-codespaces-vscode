// Create web server

var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var db = require('../db.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
router.get('/', function(req, res) {
  db.query('SELECT * FROM comments', function(err, rows) {
    if (err) {
      res.json({
        status: 'Error',
        message: 'Error getting comments: ' + err
      });
    } else {
      res.json({
        status: 'Success',
        data: rows
      });
    }
  });
});

// Get comment by id
router.get('/:id', function(req, res) {
  var id = req.params.id;

  db.query('SELECT * FROM comments WHERE id = ?', [id], function(err, rows) {
    if (err) {
      res.json({
        status: 'Error',
        message: 'Error getting comment: ' + err
      });
    } else {
      res.json({
        status: 'Success',
        data: rows
      });
    }
  });
});

// Create new comment
router.post('/', function(req, res) {
  var data = {
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    content: req.body.content,
    date: req.body.date
  };

  db.query('INSERT INTO comments SET ?', data, function(err, result) {
    if (err) {
      res.json({
        status: 'Error',
        message: 'Error creating comment: ' + err
      });
    } else {
      res.json({
        status: 'Success',
        data: result.insertId
      });
    }
  });
});

// Update comment
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var data = {
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    content: req.body.content,
    date: req.body.date
  };

  db.query('UPDATE comments SET ? WHERE id = ?', [data, id], function(err, result) {
    if (err) {
      res.json({
        status: 'Error',
        message: 'Error updating comment: ' + err
      });
    } else {

