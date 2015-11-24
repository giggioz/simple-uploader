
Template.supViewer.onCreated(function(){

    var self = this;

    self.autorun(function () {

        var ids = Template.currentData() && Template.currentData().ids;
        if (ids === null) {return;}

        if ( ! ids ) {
             self.subscribe('_supCollection');
             return;
        }

        //TODO CHECK IF ARRAY ELSE RETURN
        self.subscribe('_supCollection', ids);

    });

});

Template.supViewer.helpers({
    images: function () {
        return _supCollection.find();
    }
});
