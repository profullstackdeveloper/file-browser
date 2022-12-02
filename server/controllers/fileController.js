const fs = require('fs');

const getRoot = async (req, res) => {
    const url = req.body.url;
    let baseRoot = process.env.BASE_ROOT;
    fs.readdir(baseRoot + url, async (err, files) => {
        if (files && files.length > 0) {
            const result = await Promise.all(files.map((file) => {
                return new Promise((resolve, reject) => {
                    fs.lstat(baseRoot + url + '/' + file, (err, status) => {
                        if (!err) {
                            const isFile = status.isFile();
                            resolve({
                                name: file,
                                type: isFile ? 'file' : 'directory',
                                url: url === '/' ? url + file : url + '/' + file
                            })
                        }
                        if (err) {
                            reject(err);
                        }
                    })
                });
            }));

            res.json(result);
        }

    })

}

module.exports = {
    getRoot
}