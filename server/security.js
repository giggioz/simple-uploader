/*jshint -W020 */

supSecurityOptions = {
    access : 'all',
    accessList : function(){
        return;
    }
};


supSecurityOptions.checkOptions = function(){

    var allowedAccessValues = ['all','owner','list'];

    if ( allowedAccessValues.indexOf(this.access) === -1){
        throw new Error('setAccess, wrong value');
    }

    if ( this.access === 'list' &&
        ( typeof this.accessList !== 'function' || this.accessList().length === 0 || this.accessList().length === 0)){
        throw new Error('setAccess, access set to list but accessList is badly set.');
    }

};

Meteor.startup(function(){
    supSecurityOptions.checkOptions();
});
