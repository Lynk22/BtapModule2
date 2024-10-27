const $details = document.getElementById('details');
document.getElementById('addDetails').onclick = function(){
    const $NewDetail = document.createElement('div');
    $NewDetail.classList.add('form-check');
    $NewDetail.innerHTML = `<input class="form-check-input myCheckbox" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label myLabel" for="flexCheckDefault">
                            ${$details.value}
                            </label>
                            <button class="delete-one">delete</button>`;
    document.getElementById('AllDetails').appendChild($NewDetail);
    $details.value = '';
    upDateCheckbox();
    updateLocalStorage();
    deleteDetail();
}

function upDateCheckbox(){
    document.querySelectorAll('.myCheckbox').forEach(function(checkbox,index) {
        checkbox.addEventListener('change', function() {
            let label = document.querySelectorAll('.myLabel')[index];
            if (this.checked) {
                label.style.textDecoration = 'line-through';
            } else {
                label.style.textDecoration = 'none';
            }
            updateLocalStorage();
        });
    }); 
}

function deleteDetail(){
    document.querySelectorAll('.delete-one').forEach(function(button,) {
        button.addEventListener('click', function() {
            button.parentNode.remove();
            updateLocalStorage();
            upDateCheckbox()
            deleteDetail()
        });
    });
}

function updateLocalStorage() {
    const details = [];
    document.querySelectorAll('.form-check').forEach(function(div) {
        const checkbox = div.querySelector('.myCheckbox');
        const label = div.querySelector('.myLabel');
        details.push({
            text: label.textContent,
            checked: checkbox.checked
        });
    });
    localStorage.setItem('details', JSON.stringify(details));
}
function loadDetails() {
    const details = JSON.parse(localStorage.getItem('details')) || [];
    details.forEach(function(detail) {
        const $NewDetail = document.createElement('div');
        $NewDetail.classList.add('form-check');
        $NewDetail.innerHTML = `
            <input class="form-check-input myCheckbox" type="checkbox" ${detail.checked ? 'checked' : ''} id="flexCheckDefault">
            <label class="form-check-label myLabel" for="flexCheckDefault">
                ${detail.text}
            </label>
            <button class="delete-one">delete</button>
        `;
        document.getElementById('AllDetails').appendChild($NewDetail);
    });
    upDateCheckbox();
    deleteDetail();
}

const $searchClass = document.getElementById('search');
const $deleteButton = document.getElementById('delete-button');

document.getElementById('all').onclick = function(){
    if($searchClass.classList.contains('hide-class')){
        $searchClass.classList.remove('hide-class');
        $searchClass.classList.add('d-flex');
    }
    $deleteButton.style.display = 'none';
    document.querySelectorAll('.delete-one').forEach(function(button){
            button.style.display = 'none';
    })  
    document.querySelectorAll('.myCheckbox').forEach(function(checkbox){
        checkbox.parentNode.style.display = 'block';
    })
}

document.getElementById('active').onclick = function(){
    if($searchClass.classList.contains('hide-class')){
        $searchClass.classList.remove('hide-class');
        $searchClass.classList.add('d-flex');
    }
    $deleteButton.style.display = 'none';
    document.querySelectorAll('.delete-one').forEach(function(button){
        button.style.display = 'none';
    })
    document.querySelectorAll('.myCheckbox').forEach(function(checkbox){
        if(checkbox.checked){
            checkbox.parentNode.style.display = 'none';
        } else {
            checkbox.parentNode.style.display = 'block';
        }
    })
}

document.getElementById('completed').onclick = function(){
    if($searchClass.classList.contains('d-flex')){
        $searchClass.classList.remove('d-flex');
        $searchClass.classList.add('hide-class');
    }
    $deleteButton.style.display = 'flex';
    document.querySelectorAll('.delete-one').forEach(function(button){
        button.style.display = 'inline';
    })
    document.querySelectorAll('.myCheckbox').forEach(function(checkbox){
        if(checkbox.checked){
            checkbox.parentNode.style.display = 'block';
        } else {
            checkbox.parentNode.style.display = 'none';
        }
    })
    deleteDetail()
}

$deleteButton.onclick = function(){
    document.querySelectorAll('.myCheckbox').forEach(function(checkbox){
        if(checkbox.checked){
            checkbox.closest('.form-check').remove();
            
        }
    })
    updateLocalStorage();
}

loadDetails();