# SIMPLE-UPLOADER

## Description

This package offers a simple way to create fancy styled file inputs with some sugar about security.

It gives also a simple template viewer to see items in the collection in the case the user uploaded images.

This package is inspired (and based) by Osvaldas Valutis's awesome work 
http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way

## Features

- each uploaded file shall have a field 'metadata.userId' whenever applicable

- {{> supButton style=style content=content size=size overwrite=true/false}}
    template to show input file button

    -  style : 'ionic', inputfile-1','inputfile-2','inputfile-3','inputfile-4','inputfile-5','inputfile-6','inputfile-7'
        ionic needs ionic sass, the other styles are included. Default 'inputfile-1'

    - content: image/*, audio/*, video/* or other mime type. Default any content.

    - size: max size allowed in bytes. Default to no size limit.

    - overwrite: overwrite files with same userId. Default false.


- {{> supViewer ids=ids}}
    template to show images uploaded

    - ids: is an array of userId and it shows only images with related metadata.userId (this is combined also with supSecurityOptions, see below). Default to all userIds in the db.
    

- Server side security options: 

Default:

```
supSecurityOptions = {
    access : 'all', //'all', 'owner', 'accessList'
    accessList : function(){
        return; //override this function to return an array of userId
    }
};
```

- Workflow

CLIENT asks for some ids or ALL ( leaving ids undefined) files

SERVER filters the request with supSecurityOptions

    - if owner is set return only files owned by the user
    - if list is set return
        - ids filtered by access list
        - access list if asked for ALL
    - otherwise ('all')
        - return ALL if ! ids
        - return ids if ids

## TODO
- test package (how to test input file?)
- option for href (supViewer shows clickable images)
