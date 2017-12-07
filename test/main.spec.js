/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888/';

describe('Mortgage Calculator', function () {
  this.timeout(30000);
  this.slow(5000);

  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200)));

  describe('HTML', () => {
    let pageObject;

    before(() => {
      pageObject = nightmare().goto(url);
    });

    it('should have the correct page title', () =>
      pageObject
        .evaluate(() => document.querySelector('body').innerText)
        .then((text) => {
          expect(text).to.contain('Mortgage Calculator');
        })
    );
  });

  describe('Integration', () => {
    let pageObject;

    beforeEach(() => {
      pageObject = nightmare();
    });

    it('should display correct mortgage payment', () =>
      pageObject
        .goto(url)
        .type('input[name=balance]', '420000')
        .type('input[name=rate]', '3.75')
        .select('select[name=term]', '30')
        .click('button[name=submit]')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerHTML)
        .end()
        .then(result => expect(result).to.contain('1945.09', 'Expected mortgage payment didn\'t match'))
    );

    it('should display correct mortgage payment', () =>
      pageObject
        .goto(url)
        .type('input[name=balance]', '670000')
        .type('input[name=rate]', '4.25')
        .select('select[name=term]', '15')
        .click('button[name=submit]')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerHTML)
        .end()
        .then(result => expect(result).to.contain('5040.27', 'Expected mortgage payment didn\'t match'))
    );
  });
});
