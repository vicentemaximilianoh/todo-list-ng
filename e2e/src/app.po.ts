import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTodosList(): Promise<string> {
    return element(by.css('app-root .todos-list')).getText();
  }
}
