/*jshint -W020 */

var store = new FS.Store.GridFS('supGrid');

_supCollection = new FS.Collection('supFs', {

    stores: [store]

    //FILTER IS SET WITH OPTIONS FROM TEMPLATE

});

_supCollection.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
 });

_supCollection.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});
