(function () {

    let UI = {};

    function load() {
        let tbl = $("#ctl00_MainContent_tblResult");
        let csv = tbl.find("tr").map(function (i, trow) {
            return $(trow).find("td").map(function (j, tcell) { // map no es el nativo de array, es un obj-array jQuery.
                return tcell.textContent ; // obtenemos el texto de cada celda
            }).get().join(','); // unimos todas las celdas de la fila con comas
        }).get().join('\n'); // unimos las filas de la tabla por saltos de linea
        console.log("result:", csv);
        let { year, month } = getDate();
        let storageName = getStorageName(year, month);
        localStorage.setItem(storageName, csv);
        UI.setMessage(`Datos de ${year}/${month} guardados correctamente.`);
    }
    // haber guardado referencias a $("#DdlAnio") no funciono correctamente; issue #5
    function getDate() {
        return {
            month: $("#ctl00_MainContent_CldFecha_DdlMes").val(),
            year: $("#DdlAnio").val()
        }
    }

    function getStorageName(year, month) {
        return `cfdi_data[${year}_${month}]`;
    }

    function endProcess() {
        let { year } = getDate();
        let data = getJoinedCSV(year);
        downloadFile(year + ".csv", data, "csv");
    }

    function getJoinedCSV(year) {
        let csvArr = [];
        for (let month = 1; month <= 12; month++) {
            let csv = localStorage.getItem(getStorageName(year, month));
            if (csv) csvArr.push(csv);
        }
        return csvArr.join('\n');
    }

    function downloadFile(name, textFile, type) {
        let content = `data:text/${type || "plain"};charset=utf-8,${textFile}`;
        let encodedUri = encodeURI(content);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", name);
        document.body.appendChild(link); // Required for FF
        link.click();
    }

    function createUI() {
        let ui = createUIControls();
        createUIMethods(ui);
        Object.assign(UI, ui);
    }
    function createUIControls() {
        let btnAddMonthCSV = createUIElement({
            id: "PCTC_agregar_mes",
            text: "Agregar mes",
            top: "100px",
            btnType: "info",
            click: () => load()
        });
        let btnEndProcess = createUIElement({
            id: "PCTC_end_process",
            text: "Terminar proceso",
            top: "150px",
            btnType: "warning",
            click: () => endProcess()
        });
        let alert = createUIElement({
            id: "PCTC_messages",
            text: "Terminar proceso",
            top: "200px",
            type: "div",
            classList: "alert alert-success",
            click: () => UI.messageVisible(false)
        });
        return { alert, btnAddMonthCSV, btnEndProcess };
    }
    /**
     * By default a button.
     */
    function createUIElement(properties) {
        if (!(properties && properties.id)) throw "Property ID must be set to create a button.";
        properties = Object.assign({
            top: "100px",
            right: "10px",
            type: "button",
            btnType: "default",
            classList: "",
        }, properties);

        var button = document.getElementById(properties.id);
        // 1. Create the button
        if (!button) {
            button = document.createElement(properties.type);
            // 2. Append somewhere
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(button);
        }
        // 3. Set Properties
        button.id = properties.id;
        button.innerHTML = properties.text;
        button.style.position = "fixed";
        button.style.zIndex = 100000;
        button.style.top = properties.top;
        button.style.right = properties.right;
        if (properties.type == "button") properties.classList += " btn btn-" + properties.btnType;
        if (properties.classList) button.classList += properties.classList;
        // 4. Add event handler

        if (properties.click) button.addEventListener("click", properties.click);
        return button;
    }

    function createUIMethods(ui) {
        ui.messageVisible = (visible) => {
            if (visible === undefined) visible = true;
            ui.alert.style.visibility = visible ? "visible" : "hidden";
        }
        let clickToDimiss = "<b> (Clik para ocultar) </b>"
        ui.setMessage = (msg) => {
            ui.alert.innerHTML = msg + clickToDimiss;
            ui.messageVisible();
        }
        return ui;
    }

    function start() {
        createUI();
        UI.setMessage("Listo para comenzar.")
    }

    return {
        start, load, getStorageName, endProcess, getJoinedCSV, downloadFile,
        createUI, createUIElement, UI,
    };
})();