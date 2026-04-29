import { Component, HostListener, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-language-switcher',
  standalone: false,
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {
  isOpen = false;
  selectedLang = 'en';
  currentFlag = '🇬🇧';
  currentLangCode = 'EN';
  
  languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', shortCode: 'EN' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', shortCode: 'FR' },
    { code: 'es', name: 'Español', flag: '🇪🇸', shortCode: 'ES' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', shortCode: 'DE' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', shortCode: 'IT' }
  ];
  
  // Constructor must be inside the class, not outside
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.loadSavedLanguage();
    
    // Force check every second to ensure button shows correct language
    setInterval(() => {
      const saved = localStorage.getItem('preferred_language');
      if (saved && saved !== this.selectedLang) {
        this.updateButtonDisplay(saved);
      }
    }, 1000);
  }
  
  loadSavedLanguage() {
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang) {
      this.updateButtonDisplay(savedLang);
      if (savedLang !== 'en') {
        setTimeout(() => {
          this.applyTranslation(savedLang);
        }, 500);
      }
    }
  }
  
  updateButtonDisplay(langCode: string) {
    const langObj = this.languages.find(l => l.code === langCode);
    if (langObj) {
      this.selectedLang = langCode;
      this.currentFlag = langObj.flag;
      this.currentLangCode = langObj.shortCode;
      this.cdr.detectChanges(); // Force Angular to update the view
      console.log('Button updated to:', langCode, langObj.flag, langObj.shortCode);
    }
  }
  
  applyTranslation(langCode: string) {
    const langMap: { [key: string]: string } = {
      'en': 'en',
      'fr': 'fr',
      'es': 'es',
      'de': 'de',
      'it': 'it'
    };
    
    const triggerTranslate = () => {
      // Try to find the Google Translate dropdown
      const selectBox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectBox) {
        const targetLang = langMap[langCode];
        if (selectBox.value !== targetLang) {
          selectBox.value = targetLang;
          selectBox.dispatchEvent(new Event('change'));
          console.log('Translation applied to:', langCode);
        }
        return true;
      }
      return false;
    };
    
    // Try multiple times
    if (!triggerTranslate()) {
      let attempts = 0;
      const interval = setInterval(() => {
        if (triggerTranslate() || attempts > 30) {
          clearInterval(interval);
        }
        attempts++;
      }, 200);
    }
    
    // Also set cookie for persistence
    document.cookie = `googtrans=/en/${langMap[langCode]}; path=/; max-age=31536000`;
  }
  
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  
  @HostListener('document:click')
  closeDropdown(): void {
    this.isOpen = false;
  }
  
  changeLanguage(langCode: string): void {
    console.log('Changing to:', langCode);
    
    // Update button immediately
    this.updateButtonDisplay(langCode);
    
    // Save to localStorage
    localStorage.setItem('preferred_language', langCode);
    
    // Apply translation
    this.applyTranslation(langCode);
    
    // Close dropdown
    this.isOpen = false;
    
    // Force another update after a moment
    setTimeout(() => {
      this.updateButtonDisplay(langCode);
    }, 100);
  }
}