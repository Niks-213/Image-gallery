const fs = require("fs");
const path = require("path");
const host = "https://localhost.com";
const HttpStatus = require("http-status-codes");
const File = require('../model/File');


const uploadFile = async (req, res) => {
  let filesArray = [];
  try {
    let fileName = "";
    let arrayFiles = [];
    let uploads = [];
    uploads = req.body;
    const backendFolderPath = process.cwd(); // Replace this with the actual path to your backend folder
    const frontendFolderPath = path.join(backendFolderPath, '../frontend/public/images');
    var body = req.body,
      { cust_doc_content, cust_doc, foldername } = body;
    const ext = path.extname(cust_doc);
    fileName = `${Date.now()}`;
    await new Promise((resolve, reject) => {
      try {
        fs.writeFile(
          frontendFolderPath + "/" + cust_doc,
          cust_doc_content,
          "base64",
          function (err) {
            console.log(err);
            if (err) {
              console.log(err);
              res.locals.errors = err.message;
              const errorCode =
                res.locals.errorCode || HttpStatus.BAD_REQUEST;
              const obj = {
                status: "failure",
                data: res.locals.data || {},
                errors: res.locals.errors || {},
                message: res.locals.message || "",
                errorCode: errorCode,
              };
              res.status(402).send(obj);
            } else {
              let fpath = frontendFolderPath +
                "/" +
                cust_doc;
              fs.chmodSync(fpath, 0o755);
              let filepath = `${host}/${foldername}/${cust_doc}`;
              let obj = {
                fileName: cust_doc,
                filepath,
                filePath: filepath,
              };
              arrayFiles.push(obj);
              res.locals.data = arrayFiles;
              resolve(true);
              res.locals.message = "Uploaded Successfully";
              let obj1 = {
                status: "success",
                data: {},
                errors: {},
                message: "",
              };

              if (
                res.locals.data &&
                res.locals.data.length &&
                (res.locals.data[0]["e"] || res.locals.data[0]["error"])
              ) {
                res.locals.errors = res.locals.data[0]["e"]
                  ? res.locals.data[0]["e"]
                  : res.locals.data[0]["error"]
                    ? res.locals.data[0]["error"]
                    : null;
                res.locals.message = res.locals.errors;
                JSONERROR(req, res);
              } else {
                if (res.locals.data) {
                  obj1.data = res.locals.data;
                }
                if (res.locals.errors) {
                  obj1.errors = res.locals.errors;
                }
                if (res.locals.message) {
                  obj1.message = res.locals.message;
                }
                res.status(HttpStatus.OK).send(obj1);
              }
            }
          }
        );
      } catch (e) {
        console.log("e", e);
        reject(e);
      }
    });

  } catch (e) {
    res.locals.errors = e.message;
    const errorCode = res.locals.errorCode || HttpStatus.BAD_REQUEST;
    const obj = {
      status: "failure",
      data: res.locals.data || {},
      errors: res.locals.errors || {},
      message: res.locals.message || "",
      errorCode: errorCode,
    };
    res.status(402).send(obj);
  }
};

const createFileEntry = async (req, res) => {
  try {
    const { file_name, file_path } = req.body;
    const file = await File.create({ file_name, file_path });
    return res.json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting all users
const getAllFileEntries = async (req, res) => {
  try {
    const files = await File.findAll();
    return res.json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateFileEntry = async (req, res) => {
  try {

    const fileId = req.params.id;
    const { file_name, file_path } = req.body;

    const updatedUser = await File.update(
      { file_name, file_path },
      { where: { file_id: fileId } }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = await File.findByPk(fileId);
    return res.json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteFileEntryById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUserCount = await File.destroy({ where: { file_id: userId } });

    if (deletedUserCount === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFileEntryById = async (req, res) => {
  try {
    const userId = req.params.id;

    const file = await File.findByPk(userId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadFile,
  createFileEntry,
  getFileEntryById,
  deleteFileEntryById,
  updateFileEntry,
  getAllFileEntries
};
