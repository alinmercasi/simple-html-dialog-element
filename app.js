'use strict'
;(function () {
  const openDialogButton = document.querySelector('[data-role="open-dialog"]')
  const closeDialogBUtton = document.querySelector('[data-role="close-dialog"]')
  const dialog = document.querySelector('.modal')
  let lastActive = null

  const hideOnAnimationEnd = () => {
    // just for safety remove data-closing attribute before closing the dialog to avoid any unwanted conflicts
    dialog.removeAttribute('data-closing')
    dialog.close()
  }
  const onAnimationEnd = () =>
    // set it to once because we want this to run only when we close it
    dialog.addEventListener('animationend', hideOnAnimationEnd, { once: true })

  const openModal = () => {
    lastActive = document.activeElement
    dialog.showModal()
    // Focus the input for accessibility
    // I think I will stay with autofocus html attribute
    // input.focus()
  }

  const closeModal = event => {
    // We don't want to close the dialog when the user clicks the backdrop because it seems counterintuitive. If I am wrong with this please let me know
    // check for escape key, if there is any other key pressed stop the function
    if (event.type === 'keydown' && event.keyCode !== 27) return

    // prevent the default action on escape key. We need to run our own closeDialog function
    event.preventDefault()

    // set this only to make it easier to manipulate animations, transitions and other stuff from css when is closing
    // I could also use a class and toggle it, but I see it more intuitive like this
    dialog.setAttribute('data-closing', 'true')
    onAnimationEnd()
    // focus the last active element before opening the dialog
    lastActive.focus()
  }

  window.addEventListener('keydown', closeModal)
  closeDialogBUtton.addEventListener('click', closeModal)
  openDialogButton.addEventListener('click', openModal)
})()
