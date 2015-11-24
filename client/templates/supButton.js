Template.supButton.onCreated(function(){

    var
        content = Template.instance().data.content,
        size= Template.instance().data.size;

    //if content undefined accept all contents
    //if size undefined accept all sizes

    _supCollection.filters({

        maxSize: size,

        allow: function(){
            if (content){
                return {
                    contentTypes: [ content ]
                };
            }
            return {};
        }(),

        onInvalid: function(message){
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }

    });

});

Template.supButton.helpers({

    style : function(){

        var
            allowedStyles = ['ionic', 'inputfile-1','inputfile-2','inputfile-3','inputfile-4','inputfile-5','inputfile-6'],
            style = Template.instance().data.style;

        if ( allowedStyles.indexOf(style) === -1) {
            style = 'inputfile-1';
        }

        return style;
    }
});


Template.supButton.events({

    'change .inputfile': function(event, tpl) {

        var
            overwrite = tpl.data.overwrite || false,
            userId =  Meteor.userId(),
            fileToRemove;

        if (overwrite && ! userId) {
            console.warn('simpleUploader: overwrite is set true but there is no userId');
        }

        FS.Utility.eachFile(event, function(file) {

            var newFile = new FS.File(file);

            if ( userId ) {
                 newFile.metadata = {userId:  userId};
            }

            if (overwrite && userId){
                fileToRemove = _supCollection.findOne({ 'metadata.userId': userId});
            }

            //collectionFS does not have an update/upsert method
            //first we add then remove because we can have errors (like file too big)
            if (fileToRemove){

                _supCollection.insert(newFile,function (err){

                    if (err) {console.error(err);  return;}

                    _supCollection.remove({_id: fileToRemove._id},function (err){

                        if (err) {console.error(err); return;}

                    });

                });
            } else {

                _supCollection.insert(newFile,function (err){

                    if (err) {console.error(err);  return;}

                });
            }
        });

   }
});

Template.supButton.onRendered(function(){

    var inputs = document.querySelectorAll( '.inputfile' );

        Array.prototype.forEach.call( inputs, function( input ){

            var label    = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener( 'change', function( e )
            {
                var fileName = '';
                if( this.files && this.files.length > 1 )
                    {fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );}
                else
                    {fileName = e.target.value.split( '\\' ).pop();}

                if( fileName )
                    {label.querySelector( 'span' ).innerHTML = fileName;}
                else
                    {label.innerHTML = labelVal;}
            });

            // Firefox bug fix
            input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
            input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });

        });

});

