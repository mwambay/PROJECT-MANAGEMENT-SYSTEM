
const orgaKeyDialog = document.getElementById('orga-key');
document.getElementById('openDialogOrga').addEventListener('click', ()=>{
    orgaKeyDialog.showModal();
})

function copyToClipboard() {
    var copyText = document.getElementById("generatedKey");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Pour les mobiles
    document.execCommand("copy");
    orgaKeyDialog.close();

    //alert("Clé copiée: " + copyText.value);
}

document.querySelectorAll('.renoncerBtn').forEach((button, index) => {
    //console.log(button)

    const dialog = document.getElementById(`renoncerDialog-${index}`);
    const modifieProject = document.getElementById(`modifieDialog-${index}`);

    button.addEventListener('click', () => {
        dialog.showModal();
    });


    document.getElementById(`closeDialog${index}`).addEventListener('click', () => {
        dialog.close();
    });

    document.getElementById(`modifier${index}`).addEventListener('click', () => {
        modifieProject.showModal();
    });
    
    document.getElementById(`cancelUpdate${index}`).addEventListener('click', () => {
        modifieProject.close();
    });


})
//const openButton = document.getElementById('openDialog')


