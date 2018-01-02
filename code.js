(function () {

    let monthCtrl = $("#ctl00_MainContent_CldFecha_DdlMes");
    let yearCtrl = $("#DdlAnio");

    function load() {
        let tbl = $("#ctl00_MainContent_tblResult");
        let csv = tbl.find("tr").map(function (i, trow) {
            return $(trow).find("td").map(function (j, tcell) { // map no es el nativo de array, es un obj-array jQuery.
                return tcell.textContent; // obtenemos el texto de cada celda
            }).get().join(','); // unimos todas las celdas de la fila con comas
        }).get().join('\n'); // unimos las filas de la tabla por saltos de linea
        console.log("result:", csv);
        let storageName = getStorageName(yearCtrl.val(), monthCtrl.val())
        localStorage.setItem(storageName, csv);
    }

    function getStorageName(year, month) {
        return `cfdi_data[${year}_${month}]`;
    }

    function endProcess() {
        let year = yearCtrl.val();
        let data = getJoinedCSV(year);
    }

    function getJoinedCSV(year){
        let csvArr = [];
        for (let month = 1; month <= 12; month++) {
            let csv = localStorage.getItem(getStorageName(year, month));
            if (csv) csvArr.push(csv);
        }
        return csvArr.join('\n');
    }

    return { load, getStorageName, endProcess, getJoinedCSV };
})();