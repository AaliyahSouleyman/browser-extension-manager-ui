//  FETCH JSON DATA 
const extensionContainer = document.querySelector('#card-container')

const allButton = document.querySelector('#allButton')
allButton.addEventListener('click', filterAll)

const activeButton = document.querySelector('#activeButton')
activeButton.addEventListener('click', filterActive)

const inactiveButton = document.querySelector('#inactiveButton')
inactiveButton.addEventListener('click', filterInactive)

const theme = document.querySelectorAll('.theme')

for (const e of theme) {
    e.addEventListener('click', changeTheme)
}


fetch('data.json')
    .then(res => res.json())
    .then(data => {
        for(const extension of data){
            console.log(extension)

            const card = document.createElement('article')
            card.classList.add('card')

            const cardTop = document.createElement('div')
            cardTop.classList.add('card-top-row')

            const logo = document.createElement('img')
            logo.src = extension.logo


            const cardInfo = document.createElement('div')
            

            const name = document.createElement('h2')
            name.textContent = extension.name

            const description = document.createElement('p')
            description.textContent = extension.description

            cardInfo.append(name, description)

            cardTop.append(logo, cardInfo)


            const cardButtons = document.createElement('div')
            cardButtons.classList.add('card-buttons')


            const removeButton = document.createElement('button')
            removeButton.textContent = 'Remove'
            removeButton.classList.add('remove-btn')
            removeButton.addEventListener('click', removeExtension)
            
            const toggleButton = document.createElement('input')
            toggleButton.type = 'checkbox'
            toggleButton.id = extension.name
            toggleButton.addEventListener('change', changeActiveState)

            if (extension.isActive) {
                toggleButton.checked = true
            }

            const label = document.createElement('label')
            label.setAttribute('for', extension.name)

            extension.isActive ? card.classList.add('active') : card.classList.add('inactive') 

         

            cardButtons.append(removeButton, toggleButton, label)

            

            card.append(cardTop, cardButtons)
            extensionContainer.append(card)

           
        }
    })


function filterAll(e) {
    changeActiveBtn()
    e.target.classList.add('current')
    const extensions = document.querySelectorAll('.card')
    for (const data of extensions) {
        data.classList.remove('hidden')
    }
}

function filterActive(e) {
    changeActiveBtn()
    e.target.classList.add('current')
    const extensions = document.querySelectorAll('.card')
    for (const data of extensions) {
        
        data.classList.contains('active') ? data.classList.remove('hidden') : data.classList.add('hidden')
        
    }
}

function filterInactive(e) {
    changeActiveBtn()
    e.target.classList.add('current')
    const extensions = document.querySelectorAll('.card')
    for (const data of extensions) {
        
        data.classList.contains('inactive') ? data.classList.remove('hidden') : data.classList.add('hidden')
        
    }
}



function removeExtension(e) {
    const card = e.target.parentNode.parentNode
    card.classList.add('remove')
    
}


function changeActiveState(e) {

    const card = e.target.parentNode.parentNode
    if (e.target.checked) {
        card.classList.remove('inactive')
        card.classList.add('active')
    } else {
        card.classList.remove('active')
        card.classList.add('inactive')
    }
}

function changeTheme() {
    const themeBtn = document.querySelectorAll('.theme')
    for (const e of themeBtn) {
        e.classList.toggle('hidden')
    }
    const body = document.querySelector('body')
    body.classList.toggle('darkmode')
}

function changeActiveBtn() {
    const filterBtnList = document.querySelectorAll('.filter-btn')
    for (const btn of filterBtnList) {
        if (btn.classList.contains('current')) {
            btn.classList.remove('current')
        }
    }
}