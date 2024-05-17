function setEnv() {
  fs = require("fs");
  writeFile = fs.writeFile;

  targetPath = "./src/environments/environment.dev.json";
  envConfigFile = process.env.FIREBASE;

  console.log(
    `The file environment.staying.json will be written with the following content: ${envConfigFile} \n`,
  );

  writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        "Angular environment.prod.json file generated correctly at" +
          targetPath +
          "\n",
      );
    }
  });
}

setEnv();
