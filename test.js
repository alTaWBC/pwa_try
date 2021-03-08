let fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", (event) => {
    const fileList = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        const buffer = event.target.result;
        const length = buffer.length || buffer.size;
        fetch(`$https://biovisualspeech.eu.pythonanywhere.com/postFileMp4/`, {
            headers: {
                name: `3${Math.random() * 10000}`,
                segment: 0,
                id: "123456",
                label: "l",
                gameId: "1",
                "Content-Length": length,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ data: window.btoa(buffer) }),
        });
    });
    reader.readAsDataURL(fileList);
});
