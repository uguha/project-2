document.addEventListener("DOMContentLoaded", function(event) {

    let list = document.getElementById('the-list');
    let addBtn = document.getElementById('addBtn');
    let sortIcon = document.getElementById('sorting');
    let descSortIcon = document.getElementById('descSorting');

    function createDiv(){
        let div = document.createElement('div');
        div.classList.add('the-list-li');
        div.innerHTML = `<input type="text" maxlength="31" class="input">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="icon cross">
                                    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                                    <path d="M6 6L14 14" stroke="#C4C4C4"/>
                                    <path d="M6 14L14 6" stroke="#C4C4C4"/>
                            </svg>`;
        return div
    }

    function addDiv(){
        let div = createDiv();
        list.append(div);
        setCloser(div.lastChild);
    }

    function btnListener(){
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addDiv();
        });
    }

    function setCloser(el){
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            el.parentElement.remove();
        });
    }

    function sortListener(){
        sortIcon.addEventListener('click', (e) => {
            swapSortIcon();
            sorting(true);
        });
        descSortIcon.addEventListener('click', (e) => {
            swapSortIcon();
            sorting(false);
        });
    }

    function swapSortIcon(){
        let hiddenIcon = 'hiddenIcon';
        if (descSortIcon.classList.contains(hiddenIcon)){
            descSortIcon.classList.remove(hiddenIcon);
            sortIcon.classList.add(hiddenIcon);
        } else {
            sortIcon.classList.remove(hiddenIcon);
            descSortIcon.classList.add(hiddenIcon);
        }
    }

    function sorting(asc){
        let nodeList = document.querySelectorAll('.the-list-li');

        for (let i = 0; i < nodeList.length; i++){
            list.removeChild(nodeList[i]);
        }

        let res = Array.from(nodeList).sort((a, b) => {
            let input1 = a.querySelector('input').value;
            let input2 = b.querySelector('input').value;
            if (asc) {
                return input1 - input2;
            } else {
                return input2 - input1;
            }
        });

        for (let i = 0; i < res.length; i++){
            list.appendChild(res[i]);
        }
    }

    addDiv();
    sortListener();
    btnListener();

});