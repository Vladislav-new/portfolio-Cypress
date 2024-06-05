import './commands';
import 'cypress-real-events'
import '@4tw/cypress-drag-drop'
import addContext from 'mochawesome/addContext'

const titleToFileName = (title) =>
  title.replace(/[:\/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent
    let filename = ''
    while (parent && parent.title) {
      filename = `${titleToFileName(
        parent.title,
      )} -- ${filename}`
      parent = parent.parent
    }
    filename += `${titleToFileName(
      test.title,
    )} (failed).png`
    addContext(
      { test },
      `../screenshots/${Cypress.spec.name}/${filename}`,
    )
  }
  // always add the video
  addContext({ test }, `../videos/${Cypress.spec.name}.mp4`)
})

//костыль чтоб ран не падал от ошибок в браузере
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
//делаем скрин после каждого фейла теста и отправляем его в репорт
// Cypress.on('test:after:run', (test, runnable) => {
//     if (test.state === 'failed') {
//         const screenshot = `${Cypress.config('screenshotsFolder')}\\${Cypress.spec.name
//             }\\${runnable.parent.title} -- ${test.title} (failed)`;
//        // cy.screenshot(`${Cypress.spec.name}\\${runnable.parent.title} -- ${test.title} (fail)`)
//         cy.readFile(`${screenshot}.png`, 'base64')
//             .then(file => {
//                 //@ts-ignore
//                 cy.error(`${test.title}: has failed`, {
//                     name: `${runnable.parent.title} -- ${test.title} (failed).png`,
//                     type: 'image/png',
//                     content: file,
//                 })
//             })
//     }
// })

// Hide fetch/XHR requests
if (Cypress.env('hideXHR')) {
  const app = window.top;
  if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
      '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
}