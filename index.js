require('dotenv').config();
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');

const imap = new Imap({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) throw err;
    imap.search(['UNSEEN'], function(err, results) {
      if (err) throw err;
      const f = imap.fetch(results, { bodies: '' });
      f.on('message', function(msg, seqno) {
        msg.on('body', function(stream, info) {
          simpleParser(stream, (err, parsed) => {
            if (err) throw err;
            console.log('Parsed email:', parsed);
          });
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();
