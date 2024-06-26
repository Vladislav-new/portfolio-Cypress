import { blockRequests } from "../../helpers/blockList";
import elementsPageLocators from "../../pageObjects/elementsPage/locators/elementsLocators";
import mainPageLocators from "../../pageObjects/mainPage/locators/mainPageLocators";
import { MainPage } from "../../pageObjects/mainPage/mainPage";
import formsPageLocators from "../../pageObjects/formsPage/locators/formsPageLocators";
import alertsPageLocators from "../../pageObjects/alertsAndFramesPage/locators/alertsPageLocators";
import widgetsPageLocators from "../../pageObjects/widgetsPage/locators/widgetsPagesLocators";
import interactionPageLocators from "../../pageObjects/interactionsPage/locators/interactionPageLocators";
import bookStorePageLocators from "../../pageObjects/bookStoreAppPage/locators/bookStorePageLocators";

const mainPage = new MainPage();

context('Main page openen and click on cards', () => {
    beforeEach(() => {
        blockRequests();
        cy.visit('', { failOnStatusCode: false })
    })
    it('Open Elements page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Text Box", "Check Box", "Radio Button", "Web Tables", "Buttons", "Links", "Broken Links - Images", "Upload and Download", "Dynamic Properties"]
        mainPage.clickOn(mainPageLocators.elements)
        cy.url().should('match', /elements/)
        //find all elements and find containment array of names to those elements
        columnsArray.forEach((item) => {
            cy.get(elementsPageLocators.columnNames)
                .should('contain.text', item)
        })
    })
    it('Open Forms page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Practice Form"]
        mainPage.clickOn(mainPageLocators.forms)
        cy.url().should('match', /forms/)
        columnsArray.forEach((item) => {
            cy.get(formsPageLocators.columnNames)
                .should('contain.text', item)
        })
    })
    it('Open Alerts, Frame & Windows page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Browser Windows", "Alerts", "Frames", "Nested Frames", "Modal Dialogs"]
        mainPage.clickOn(mainPageLocators.alerts)
        cy.url().should('match', /alertsWindows/)
        columnsArray.forEach((item) => {
            cy.get(alertsPageLocators.columnNames)
                .should('contain.text', item)
        })
    })
    it('Open Widgets page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Accordian", "Auto Complete", "Date Picker", "Slider", "Progress Bar", "Tabs", "Tool Tips", "Menu", "Select Menu"]
        mainPage.clickOn(mainPageLocators.widgets)
        cy.url().should('match', /widgets/)
        columnsArray.forEach((item) => {
            cy.get(widgetsPageLocators.columnNames)
                .should('contain.text', item)
        })
    })
    it('Open Interactions page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Sortable", "Selectable", "Resizable", "Droppable", "Dragabble"]
        mainPage.clickOn(mainPageLocators.interactions)
        cy.url().should('match', /interaction/)
        columnsArray.forEach((item) => {
            cy.get(interactionPageLocators.columnNames)
                .should('contain.text', item)
        })
    })
    it('Open Book Store Application page', { tags: ['UI', 'smoke'] }, () => {
        const columnsArray = ["Login", "Book Store", "Profile", "Book Store API"]
        mainPage.clickOn(mainPageLocators.bookStore)
        cy.url().should('match', /books/)
        columnsArray.forEach((item) => {
            cy.get(bookStorePageLocators.columnNames)
                .should('contain.text', item)
        })
    })
})