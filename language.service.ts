import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private _locale$ = new BehaviorSubject<string>(
    this.translateService.getBrowserLang() ?? "fr"
  );
  public locale = this._locale$.asObservable();

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this._locale$.next(this.getBrowserLang());
  }

  setLocale(locale: string) {
    this.localStorageService.setItem("locale", locale);
    this._locale$.next(locale);
  }
  getLocale() {
    return this._locale$.getValue();
  }
  addLangs(langs: string[]) {
    this.translateService.addLangs(langs);
  }
  use(locale: string = this.getLocale()) {
    return this.translateService.use(locale);
  }
  setDefaultLang(locale: string) {
    this.translateService.setDefaultLang(locale);
  }
  getTranslation(locale: string) {
    return this.translateService.getTranslation(locale);
  }
  getBrowserLang() {
    return (
      JSON.parse(this.localStorageService.getItem("locale")) ??
      this.translateService.getBrowserLang()
    );
  }
  instant(key: string | string[], interpolateParams?: Object) {
    return this.translateService.instant(key, interpolateParams);
  }
}
