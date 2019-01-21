const parseGroups = function(collection = []) {
  return collection.map(group => ({
    name: group.name,
  }));
};

exports.parseGroups = parseGroups;

const parseMembers = function(collection = []) {
  return collection.map(user => ({
    accountId: user.accountId,
    userKey: user.userKey,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
  }));
};

exports.parseMembers = parseMembers;