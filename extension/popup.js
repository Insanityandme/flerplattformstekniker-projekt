const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;

storage.local.get(['links']).then((result) => {
  const links = result.links || []
  links.forEach((link) => {

    // URL button
    const a = document.createElement('a')
    a.href = link.longLink
    a.className = 'list-group-item list-group-item-action btn btn-secondary'
    a.textContent = link.shortLink.substring(20)
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.type = 'button'

    // Copy button
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn btn-secondary'
    btn.textContent = 'Copy'

    // Click to copy the URL
    btn.addEventListener('click', () => {
      navigator.clipboard
        .writeText(link.shortLink)
        .then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => {
            btn.textContent = 'Copy'
          }, 1500)
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
        })
    })

    // btn-group
    const btnGroup = document.createElement('div')
    btnGroup.className = 'btn-group'
    btnGroup.setAttribute('role', 'group')
    btnGroup.setAttribute('aria-label', 'Basic example')

    btnGroup.appendChild(a)
    btnGroup.appendChild(btn)

    document.querySelector('.list-group').appendChild(btnGroup)
  })
})
