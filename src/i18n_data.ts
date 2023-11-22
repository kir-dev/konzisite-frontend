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
