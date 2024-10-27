import { NextApiRequest, NextApiResponse } from 'next';
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');

function openInbox(imap: any, cb: (err: Error | null, box: any) => void) {
  imap.openBox('INBOX', true, cb);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const imap = new Imap({
    user: email,
    password: password,
    host: 'your-email-host.com', // Replace with your email host
    port: 993,
    tls: true
  });

  imap.once('ready', function() {
    openInbox(imap, function(err: Error | null, box: any) {
      if (err) {
        res.status(500).json({ error: 'Failed to open inbox' });
        return;
      }
      imap.search(['UNSEEN'], function(err: Error | null, results: any) {
        if (err) {
          res.status(500).json({ error: 'Failed to search emails' });
          return;
        }
        const f = imap.fetch(results, { bodies: '' });
        const emails: any[] = [];
        f.on('message', function(msg: any, seqno: number) {
          msg.on('body', function(stream: any, info: any) {
            simpleParser(stream, (err: Error | null, parsed: any) => {
              if (err) {
                res.status(500).json({ error: 'Failed to parse email' });
                return;
              }
              emails.push(parsed);
            });
          });
        });
        f.once('error', function(err: Error) {
          res.status(500).json({ error: 'Fetch error: ' + err });
        });
        f.once('end', function() {
          imap.end();
          res.status(200).json(emails);
        });
      });
    });
  });

  imap.once('error', function(err: Error) {
    res.status(500).json({ error: err.message });
  });

  imap.once('end', function() {
    console.log('Connection ended');
  });

  imap.connect();
}
