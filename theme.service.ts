import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public lightTheme = "light";
  public darkTheme = "dark";

  private _theme$ = new BehaviorSubject<string>(this.getDefaultBrowserTheme());
  public theme$ = this._theme$.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService
  ) {}

  getTheme() {
    return this._theme$.getValue();
  }

  switch(theme: string) {
    this._theme$?.next(theme);
    let themeLink = this.document.getElementById(
      "app-theme"
    ) as HTMLLinkElement;
    if (themeLink) {
      this.localStorageService.setItem("theme", theme);
      themeLink.href = theme + ".css";
    }
  }

  public getDefaultBrowserTheme() {
    const currentTheme = JSON.parse(this.localStorageService.getItem("theme"));
    if (!currentTheme) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.switch(this.darkTheme);
        return this.darkTheme;
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        this.switch(this.lightTheme);
        return this.lightTheme;
      } else {
        this.switch(this.lightTheme);
        return this.lightTheme;
      }
    } else {
      this.switch(currentTheme);
      return currentTheme;
    }
  }
}
