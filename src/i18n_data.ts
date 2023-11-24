export const resources = {
  en: {
    translation: {
      CE_BSC: 'Computer eng. BSc',
      EE_BSC: 'Electrical eng. BSc',
      BPROF: 'Computer eng. Bprof',
      CE_MSC: 'Computer eng. MSc',
      EE_MSC: 'Electrical eng. MSc',
      BI_MSC: 'Business info. MSc',
      HI_MSC: 'Healthcare eng. MSc',
      SE_MSC: 'Space eng. MSc',
      en: 'In English',
      hu: 'In Hungarian',
      navbar: {
        homePage: 'Home',
        consultations: 'Consultations',
        groups: 'Groups',
        requests: 'Requests',
        users: 'Users',
        subjects: 'Subjects',
        profile: 'Profile',
        login: 'Login'
      },
      home: {
        welcome: 'Welcome to Konzisite!',
        unratedConsultations: `You took part in these consultations but haven't rated the presenters.
          Please do so as soon as possible and provide valuable feedback!`,
        unratedPresenter: "You haven't rated one of the presenters!",
        nextConsultations: 'Next consultations',
        allConsultations: 'All consultations',
        noConsultations: 'There are no upcoming consultations',
        activeConsultationRequests: 'Active consultation requests',
        allConsultationRequests: 'All requests',
        noRequests: 'There are no active requests',
        presenters_one: 'Presenter: {{names}}',
        presenters_other: '{{count}} presenters',
        requestors_one: 'Requested by {{count}} person',
        requestors_other: 'Requested by {{count}} people',
        consultationsForRequest_one: '{{count}} consultation',
        consultationsForRequest_other: '{{count}} consultations'
      },
      errors: {
        unknown: 'Unknown error, please try again'
      },
      requests: {
        untilDeadline_one: 'Today is the deadline',
        untilDeadline_other: '{{count}} days until the deadline',
        sinceDeadline_one: '{{count}} day since the deadline',
        sinceDeadline_other: '{{count}} days since the deadline'
      }
    }
  },
  hu: {
    translation: {
      CE_BSC: 'Mérnökinfó BSc',
      EE_BSC: 'Villany BSc',
      BPROF: 'Üzemmérnök',
      CE_MSC: 'Mérnökinfó MSc',
      EE_MSC: 'Villany MSc',
      BI_MSC: 'Gazdinfó MSc',
      HI_MSC: 'Eü mérnök MSc',
      SE_MSC: 'Űrmérnök MSc',
      en: 'Angol nyelvű',
      hu: 'Magyar nyelvű',
      navbar: {
        homePage: 'Kezdőlap',
        consultations: 'Konzultációk',
        groups: 'Csoportok',
        requests: 'Konzi kérések',
        users: 'Felhasználók',
        subjects: 'Tárgyak',
        profile: 'Profil',
        login: 'Bejelentkezés'
      },
      home: {
        welcome: 'Üdvözlünk a Konzisite-on!',
        unratedConsultations: `Az alábbi konzultációkon részt vettél, de még nem értékelted az előadókat! Kérlek tedd meg minél előbb,
          hogy kapjanak visszajelzést!`,
        unratedPresenter: 'Még nem értékelted valamelyik előadót!',
        nextConsultations: 'Következő konzik',
        allConsultations: 'Összes konzi',
        noConsultations: 'Nincs kiírva egy konzi sem',
        activeConsultationRequests: 'Aktív konzi kérések',
        allConsultationRequests: 'Összes kérés',
        noRequests: 'Nincs egy aktív kérés se',
        presenters_one: 'Konzitartó: {{names}}',
        presenters_other: '{{count}} konzitartó',
        requestors: '{{count}} ember kérte',
        consultationsForRequest: '{{count}} konzi'
      },
      consultationListPage: {
        title: 'Konzultációk',
        filter: 'Szűrés',
        newKonzi: 'Új konzultáció',
        major: 'Szak',
        allMajors: 'Minden szak',
        language: 'Nyelv',
        allLanguages: 'Bármely',
        hungarian: 'Magyar',
        english: 'Angol',
        from: 'Kezdés',
        to: 'Befejezés',
        list: 'Lista',
        calendar: 'Naptár',
        noKonzi: 'Nincsenek konzultációk!'
      },
      calendar: {
        todayButton: 'ma',
        weekButton: 'hét',
        monthButton: 'hónap',
        week: 'Heti nézet',
        month: 'Havi nézet',
        today: 'Ugrás a mai naphoz',
        next: 'Következő',
        prev: 'Előző'
      },
      consultationDetailsPage: {
        takePart: 'Részt veszek',
        tookPart: 'Részt vettem',
        dontTakePart: 'Nem veszek részt',
        didntTakePart: 'Nem vettem részt',
        achivedNoDownload: 'A konzi archiválva lett, már nem lehet letölteni a fájlt.',
        unratedNoDownload: 'Akkor tudod letölteni a fájlt, ha már értékelted az előadókat!',
        downloadAttachment: 'Jegyzet letöltése',
        exportToCalndar: 'Exportálás naptárba',
        presenters: 'Konzitartók',
        participants: 'Résztvevők',
        noParticipants: 'Még nincs egy résztvevő se.'
      },
      editKonziPage: {
        createdSuccess: 'Konzultáció sikeresen létrehozva!',
        updatedSuccess: 'Konzultáció sikeresen módosítva!',
        noAccess: 'Nincs jogod',
        authorEditOnly: 'A konzit csak a tulajdonosa szerkesztheti',
        newKonzi: 'Új konzultáció',
        editKonzi: '{{title}} szerkesztése',
        untitledKonzi: 'Névtelen konzi',
        createNewKonzi: 'Új konzultáció létrehozása',
        konziTitle: 'Konzultáció neve',
        nameEmpty: 'Név nem lehet üres!',
        nameTooLong: 'Név túl hosszú!',
        namePlaceholder: 'Digit vizsgára készülés',
        location: 'Helyszín',
        locationEmpty: 'Helyszín nem lehet üres!',
        locationTooLong: 'Helyszín túl hosszú!',
        language: 'Nyelv',
        hungarian: 'Magyar',
        english: 'Angol',
        fullfillRequest: 'Kérés teljesítése',
        requestDesc: `Amennyiben valakinek a konzi kérését valósítod meg, pipáld be a fenti dobozt, majd válaszd ki a kérést. Így
        értesítést fognak kapni azok a felhasználók, akik támogatták a kérést. Konzi kérés kiválasztása meghatározza a konzi tárgyát is.`,
        desc: 'Leírás',
        back: 'Vissza',
        create: 'Létrehozás',
        save: 'Mentés'
      },
      selectors: {
        request: 'Konzi kérés',
        subject: 'Tárgy',
        presenters: 'Előadók',
        groups: 'Célcsoportok',
        groupDesc: `Ha megadsz egy vagy több célcsoportot, akkor csak azok a felhasználók fogják látni a konzit, akik legalább
        az egyik célcsoportnaktagjai.`,
        addGroup: 'Célcsoport hozzáadása',
        you: 'Te',
        delete: 'Törlés',
        atLeastOnePresenter: 'Legalább egy előadónak kell lennie',
        addPresenter: 'Előadó hozzáadása',
        noneSelectedRequest: 'Nincs kérés kiválasztva',
        noneSelectedSubject: 'Nincs tárgy kiválasztva',
        subjectSelector: 'Tárgy választás',
        requestSelector: 'Konzi kérés választás',
        searching: 'Keresés...',
        noResult: 'Nincs találat'
      },
      markdown: {
        edit: 'Szerkesztés',
        preview: 'Előnézet',
        help: 'Markdown útmutató itt.',
        placeholder: 'Add meg a markdown formátumú szöveged itt...',
        noEmpty: 'Szöveg nem lehet üres!',
        tooLong: 'Szöveg túl hosszú!'
      },
      konziDateForm: {
        date: 'Időpont',
        start: 'Kezdés',
        end: 'Vége',
        noPastStart: 'Nem lehet múltbeli kezdés',
        noEndBeforeStart: 'Befejezés nem lehet korábban, mint kezdés'
      },
      groupListPage: {
        title: 'Csoportok',
        newGroup: 'Új csoport',
        createGroup: 'Csoport létrehozása',
        groupCreated: 'Csoport sikeresen létrehozva',
        groupDesc: ` Ha szeretnél csak bizonyos hallgatóknak (például egy tankörnek) konzultációt tartani, először hozz létre egy
        csoportot. A csoportokba bárki jelentkezhet, de a jelentkezést a csoport tulajdonosának vagy valamelyik adminjának el kell fogadnia,
         mielőtt végleges lesz. Ha konzi létrehozása közben megadsz egy vagy több célcsoportot, akkor csak azok a felhasználók fogják látni
          a konzit, akik legalább az egyik célcsoportnak tagjai.`,
        ownGroups: 'Saját csoportok',
        noOwnGroups: 'Még nem vagy egy csoport tagja sem!',
        otherGroups: 'Többi csoport',
        noOtherGroups: 'Nincs több csoport',
        groupName: 'Csoport neve',
        cancel: 'Mégse',
        save: 'Mentés',
        tooLong: 'Túl hosszú!'
      },
      groupList: {
        joined: 'Csatlakoztál a csoporthoz!',
        withdrawn: 'Visszavontad a jelentkezésed!',
        pending: 'Függőben',
        withdraw: 'Kérelem visszavonása',
        join: 'Csatlakozás'
      },
      userList: {
        allRating: 'Összesített értékelés',
        ratingsForKonzi: 'Értékelés erre a konzira',
        rating: 'Értékelés: '
      },
      userRating: {
        ratingSuccess: 'Sikeresen értékeltél!',
        ratingUpdateSuccess: 'Sikeresen frissítetted az értékelést!',
        konziNotFound: 'Te értékelésed:',
        yourRating: 'Te értékelésed:',
        edit: 'Módosítás',
        rateAfterStart: 'A konzi kezdete után tudod értékelni az előadót.',
        rate: 'Értékelés',
        ratingOf: '{{user}} értékelése',
        comment: 'Megjegyzés (opcionális)',
        rating: 'Értékelés...',
        anonymus: 'Értékelés névtelenül',
        anonymusMessage:
          'Attól még, hogy név nélkül értékelsz, az oldal adminjai továbbra is látni fogják a neved. Kérlek értelmes kritikát írj!',
        save: 'Mentés'
      },
      errors: {
        unknown: 'Ismeretlen hiba, kérjük próbáld újra'
      },
      requests: {
        untilDeadline_one: 'Ma jár le',
        untilDeadline_other: '{{count}} nap van hátra',
        sinceDeadline: '{{count}} napja járt le'
      }
    }
  }
}
