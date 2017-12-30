let monthCtrl = $("#");
let yearCtrl = $("#");

function load(){
    throw "ids must be set..."
    let tbl = $("#");
    let csv = tbl.find("tr").map(function(trow) {
        return $(trow).find("td").map(function(tcell){
            return tcell.textContent; // obtenemos el texto de cada celda
        }).join(","); // unimos todas las celdas de la fila con comas
    }).join("\n"); // unimos las filas de la tabla por saltos de linea
    console.log("result:", csv);
    let storageName = getStorageName(ano_ctrl.value(),mes_ctrl.value())
    localStorage.setItem(storageName, csv);

}

function getStorageName(year,month){
    return `cfdi_data[${year}_${month}]`;
}