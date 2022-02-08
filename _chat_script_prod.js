export class ChatWidget {
  static defaultOptions = {
    size: '60',
    backgroundColor: '#61b736',
    imageUrl: 'btn.svg',
    height: '580',
    width: '300',
  }

  static resizeChat(options) {
    let isMobile = window.matchMedia(
      'only screen and (max-width: 760px)'
    ).matches
    if (isMobile) {
      let el = document.getElementById('chatwidget__block')
      el.style.height = window.innerHeight + 'px'
      document.getElementById('chatwidget__iframe').style.width = '100%'
      document.getElementById('chatwidget__iframe').style.height = '100vh'
    } else {
      let el = document.getElementById('chatwidget__block')
      el.style.height = 'fit-content'
      document.getElementById('chatwidget__iframe').style.width =
        (options?.width ?? this.defaultOptions.width) + 'px'
      document.getElementById('chatwidget__iframe').style.height =
        (options?.height ?? this.defaultOptions.height) + 'px'
    }
  }

  static async create(options) {
    let htmlTemplate = await fetch('__chattemplate.html').then((html) =>
      html.text()
    )
    htmlTemplate = htmlTemplate.replace(
      'chatwidget_btn_img_url',
      options?.imageUrl ?? ChatWidget.defaultOptions.imageUrl
    )
    const template = document.createElement('template')
    template.innerHTML = htmlTemplate.trim()

    document.body.append(template.content)
    document.documentElement.style.setProperty(
      '--chatwidget-main-color',
      options?.backgroundColor ?? ChatWidget.defaultOptions.backgroundColor
    )
    document.documentElement.style.setProperty(
      '--chatwidget-btn-size',
      (options?.size ?? ChatWidget.defaultOptions.size) + 'px'
    )
    const toggleButton = document.querySelector('[data-isOpenChatButton]')
    const closeButton = document.querySelector('[data-isCloseChatButton]')
    const chatWindow = document.querySelector('[data-chatToggle]')
    toggleButton.addEventListener('click', function () {
      chatWindow.classList.toggle('closed')
      toggleButton.classList.toggle('chatwidget__isOpen')
      ChatWidget.resizeChat(options)
    })
    const els = document.querySelectorAll('.notransition')
    setTimeout(() => {
      els.forEach((el) => {
        el.classList.remove('notransition')
      })
    }, 250)

    closeButton.onclick = () => {
      chatWindow.classList.toggle('closed')
      toggleButton.classList.toggle('chatwidget__isOpen')
    }

    window.onresize = (_) => this.resizeChat(options)
  }
}
