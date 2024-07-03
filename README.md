a task:

* set up an express project
* write an api that will input two files from the user one is source and second is object that would be remove from source image
* integrate a free http://phot.ai account with service to call the third-party api Object remove
* handle the apis error on your side in a proper format.

## Installation
```bash
$ nvm use 20
$ npm install
$ npm run start:dev
```

## Comments
* I have used the Phot.ai API to remove the object from the image.
* The API needs 3 parameters: source image path (link), object image (base64), and the name of the image.
* I have used AWS S3 to store the images, get the link of the image, and pass it to the API.

## API
* POST /api/v1/image-processing/remove-object

## Improvements
* I can add MongoDB to store the images and the responses from the API.
* Save the history of the images and the actions performed on them.
* I can add authentication with JWT.
* Add unit tests.
