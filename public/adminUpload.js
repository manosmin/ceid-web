function fileUploaded() {
    var myUploadedFile = document.getElementById("myFile").files[0];
    var script = document.createElement('script');
    var reader = new FileReader();
    reader.readAsText(myUploadedFile, "UTF-8");
    reader.onload = function(evt) {
      script.innerHTML = evt.target.result;
    };
    script.type = "text/javascript";
    console.log("Running the script: " + myUploadedFile.name);
    document.body.appendChild(script);
  };
  
  document.getElementById("myFile").addEventListener("change", fileUploaded, false);