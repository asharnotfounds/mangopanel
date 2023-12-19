
function findJSFilesInFolder(folderPath, relativePath ) {
    // Check if the folder path exists
    if (!fs.existsSync(folderPath)) {
      console.error(`Folder does not exist: ${folderPath}`);
      return [];
    }
  
    // Read the contents of the folder
    const folderContents = fs.readdirSync(folderPath);
  
    // Filter out only the .js files
    const jsFiles = folderContents.filter(file => path.extname(file) === '.js');
  
    // Create an array of full paths relative to the "routes" folder
    const jsFilePaths = jsFiles.map(file => path.join(relativePath, file));
  
    // Recursively search through subdirectories
    const subdirectories = folderContents.filter(file =>
      fs.statSync(path.join(folderPath, file)).isDirectory()
    );
  
    subdirectories.forEach(subdirectory => {
      const subdirectoryPath = path.join(folderPath, subdirectory);
      const subdirectoryRelativePath = path.join(relativePath, subdirectory);
      const subdirectoryFiles = findJSFilesInFolder(subdirectoryPath, subdirectoryRelativePath);
      jsFilePaths.push(...subdirectoryFiles);
    });

    return jsFilePaths;
}

module.exports.findJSFilesInFolder = findJSFilesInFolder