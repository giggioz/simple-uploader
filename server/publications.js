
/*
CLIENT : asks for some ids or ALL (ids=undefined)
SERVER : puts some overrides
    - if owner is set return only owner files
    - if list is set return
        - ids filtered by access list
        - access list if asked for ALL
    - otherwise ('all')
        - return ALL if !ids
        - return ids if ids
*/


Meteor.publish('_supCollection', function (ids) {

    if (supSecurityOptions.access === 'owner') {
        ids  = [this.userId];
    }

    if (supSecurityOptions.access === 'list') {
        if (ids) {
            ids  = _.intersection(ids, supSecurityOptions.accessList());
        } else {
            ids = supSecurityOptions.accessList();
        }
    }

    if ( ! ids) {
        return _supCollection.find({});
    }

    return _supCollection.find({'metadata.userId' : {$in : ids}});
});
