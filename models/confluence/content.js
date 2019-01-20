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