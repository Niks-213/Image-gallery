const express = require('express');
const router = express.Router();
const dynamicFileUploadController = require('../controller/dynamicUploadController');

router.post('/dynamic-upload', dynamicFileUploadController.uploadFile);

router.post('/', dynamicFileUploadController.createFileEntry);

router.get('/', dynamicFileUploadController.getAllFileEntries);

router.put('/:id', dynamicFileUploadController.updateFileEntry);

router.delete('/:id', dynamicFileUploadController.deleteFileEntryById);

router.get('/:id', dynamicFileUploadController.getFileEntryById);


module.exports = router;

