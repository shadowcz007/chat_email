const Imap = require('node-imap');
const { simpleParser } = require('mailparser');

function connectToImap(config) {
  return new Imap(config);
}

function openInbox(imap, cb) {
  imap.openBox('INBOX', true, cb);
}

function fetchUnseenEmails(imap, callback) {
  imap.search(['UNSEEN'], function(err, results) {
    if (err) return callback(err);
    const f = imap.fetch(results, { bodies: '' });
    f.on('message', function(msg, seqno) {
      msg.on('body', function(stream, info) {
        simpleParser(stream, (err, parsed) => {
          if (err) return callback(err);
          callback(null, parsed);
        });
      });
    });
    f.once('error', function(err) {
      callback(err);
    });
    f.once('end', function() {
      imap.end();
    });
  });
}

module.exports = {
  connectToImap,
  openInbox,
  fetchUnseenEmails
};
