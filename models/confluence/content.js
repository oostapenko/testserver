const ejs = require('ejs');
const fs = require('fs');
const moment = require('moment');

const parseSpaces = function(collection = []) {
  return collection.map(space => ({
    id: space.id,
    key: space.key,
    name: space.name,
  }));
};

exports.parseSpaces = parseSpaces;

const parseSpaceContent = function(collection = []) {
  return collection.map(page => ({
    id: page.id,
    title: page.title,
    ancestors: page.ancestors.map(_page => ({
      id: _page.id,
      title: _page.title,
    }))
  }));
};

exports.parseSpaceContent = parseSpaceContent;

const parsePages = function(collection = []) {
  return collection.map(page => ({
    id: page.id,
    title: page.title,
    version: {
      number: page.version.number,
      createdAt: page.version.when,
      by: {
        id: page.version.by.accountId,
        username: page.version.by.username,
        email: page.version.by.email,
        displayName: page.version.by.displayName,
      }
    },
    body: page.body.storage.value,
  }));
};

exports.parsePages = parsePages;

const getChildPages = function(collection = []) {
  return collection.map(page => ({
    ...page
  }));
};

exports.getChildPages = getChildPages;

const generateContent = function() {
  const participants = [
    { userKey: '402849c962a1cbad0162f27bbf5e0012' },
    { userKey: '402849c963296fd8016381a270c10013' },
    { userKey: '402849c95f6e46d10160dc86a8bf002e' },
    { userKey: '402849c95ef90c97015ef90dfc880019' },
    { userKey: '402849c962a1cbad0162ce015ee9000c' },
  ];

  const actions = [
    { status: 'incomplete', text: 'clean technical dept' },
    { status: 'incomplete', text: 'if we have any problem with UX we need communicate with Christin and Lisa' },
    { status: 'complete', text: 'start run tests at night' },
    { status: 'incomplete', text: 'choose some smoke tests from available and run them on pre-push hook' },
  ];
  const positiveHeader = 'What did we do well?';
  const negativeHeader = 'What needs improvement (and what will we do better next sprint)?';
  const positiveImprovements = [
    { text: 'continue improving testing process' },
    { text: 'Case Form Activities integration' },
    { text: 'Command work and all needed help provided' },
  ];
  const negativeImprovements = [
    { text: 'Header changes constantly (4 times for 2 weeks) - already escalated' },
    { text: 'CRM Agent is slow (already have follow-up in tech debt epic to address that)' },
    { text: 'Agent Zero user was broken periodically during this sprint' },
  ];

  const storageData = ejs.render(
    fs.readFileSync('views/confluence/layout.html', 'utf-8'),
    {
      participants,
      positiveImprovements,
      negativeImprovements,
      positiveHeader,
      negativeHeader,
      actions,
      date: moment().format('YYYY-MM-DD')
    },
    {
      filename: 'views/confluence/layout.html'
    },
  );

  return storageData.replace(/\n/g, '');
};

exports.generateContent = generateContent;