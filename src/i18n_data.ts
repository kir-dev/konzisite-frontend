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
      PENDING: 'PENDING',
      MEMBER: 'MEMBER',
      ADMIN: 'ADMIN',
      OWNER: 'OWNER',
      NONE: 'NONE',
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
        unratedConsultations: `You took part in these consultations but haven't rated the tutors.
          Please do so as soon as possible and provide valuable feedback!`,
        unratedPresenter: "You haven't rated one of the tutors!",
        nextConsultations: 'Next consultations',
        allConsultations: 'All consultations',
        noConsultations: 'There are no upcoming consultations',
        activeConsultationRequests: 'Active consultation requests',
        allConsultationRequests: 'All requests',
        noRequests: 'There are no active requests',
        presenters_one: 'Tutor: {{names}}',
        presenters_other: '{{count}} tutors',
        requestors_one: 'Requested by {{count}} person',
        requestors_other: 'Requested by {{count}} people',
        consultationsForRequest_one: '{{count}} consultation',
        consultationsForRequest_other: '{{count}} consultations'
      },
      requests: {
        untilDeadline_one: 'Today is the deadline',
        untilDeadline_other: '{{count}} days until the deadline',
        sinceDeadline_one: '{{count}} day since the deadline',
        sinceDeadline_other: '{{count}} days since the deadline'
      },
      consultationListPage: {
        title: 'Consultations',
        filter: 'Filter',
        newKonzi: 'New consultation',
        major: 'Major',
        allMajors: 'All majors',
        language: 'Language',
        allLanguages: 'Any',
        hungarian: 'Hungarian',
        english: 'English',
        from: 'From',
        to: 'To',
        list: 'List',
        calendar: 'Calendar',
        noKonzi: 'There are no consultations!'
      },
      calendar: {
        todayButton: 'today',
        weekButton: 'week',
        monthButton: 'month',
        week: 'Weekly view',
        month: 'Monthly view',
        today: 'Jump to current date',
        next: 'Next',
        prev: 'Previous'
      },
      consultationDetailsPage: {
        takePart: "I'll take part",
        tookPart: "I've taken part",
        dontTakePart: "I won't take part",
        didntTakePart: "I haven't taken part",
        achivedNoDownload: 'The consultation has been archived, files cannot be downloaded anymore',
        unratedNoDownload: 'You can only download the file after rating your tutor!',
        downloadAttachment: 'Download attachments',
        exportToCalndar: 'Export to calendar',
        presenters: 'Tutors',
        participants: 'Participants',
        noParticipants: 'There are no participants yet.',
        konziDeleted: 'Consultation deleted!',
        attachmentUploaded: 'Attachment uploaded!',
        attachmentDeleted: 'Attachment deleted!',
        operations: 'Actions',
        edit: 'Edit',
        archivedMesage: 'The consultation has been archived, files cannot be uploaded anymore.',
        editAttachment: 'Edit attachment',
        uploadAttachment: 'Upload attachment',
        save: 'Save',
        deleteAttachment: 'Delete attachment',
        deleteConfirm: 'Are you sure you want to delete the uploaded file? Participants will not be able to view it anymore',
        delete: 'Delete',
        attachmentMessage: `The tutor or the creator of the consultation may upload a file to the consultation.
        This file can be downloaded by the participants after rating the tutor`,
        extensions: 'Allowed file formats: .jpg, .png, .pdf, .docx, .pptx, .zip',
        maxSize: 'Max file size: 10 MB',
        autoDeleteAlert: 'The file will be deleted 30 days after the end of the consultation and will not be available afterwards!',
        deleteKonzi: 'Delete consultation',
        confirmDeleteKonzi: 'Are you sure you want to delete this consultation?',
        targetGroups_one: 'Target group',
        tergetGroups_other: 'Target groups',
        joinedKonzi: 'You joined the consultation!',
        leftKonzi: 'You left the consultation!',
        konziNotFound: 'The consultation cannot be found!',
        konziNotFound2: "The consultation you searched for doesn't exist or you don't have the permission to view it!"
      },
      editKonziPage: {
        createdSuccess: 'Consultation successfully created!',
        updatedSuccess: 'Consultation successfully updated!',
        noAccess: 'Access denied',
        authorEditOnly: 'The consultation can only be edited by its owner',
        newKonzi: 'New consultation',
        editKonzi: 'Edit {{title}}',
        untitledKonzi: 'Unnamed consultation',
        createNewKonzi: 'Create new consultation',
        konziTitle: 'Consultation name',
        nameEmpty: 'Name cannot be empty!',
        nameTooLong: 'The name is too long!',
        namePlaceholder: 'Calculus exam preparation',
        location: 'Location',
        locationEmpty: 'Location cannot be empty!',
        locationTooLong: 'Location too long!',
        language: 'Language',
        hungarian: 'Hungarian',
        english: 'English',
        fullfillRequest: 'Fulfill request',
        requestDesc: `If you're fulfilling the consultation request of someone else, tick the box above.
        Users who endorsed this request will recieve a notification.
        Picking a request for the consultation will also determine it's subject.`,
        desc: 'Description',
        back: 'Back',
        create: 'Create',
        save: 'Save'
      },
      selectors: {
        request: 'Consultation request',
        subject: 'Subject',
        presenters: 'Tutors',
        groups: 'Groups',
        groupDesc: `If you provide one or more groups, only people who are part of the selected groups can view this consultation`,
        addGroup: 'Add group',
        you: 'You',
        delete: 'Delete',
        atLeastOnePresenter: 'There must be at least one tutor',
        addPresenter: 'Add tutor',
        noneSelectedRequest: 'No request selected',
        noneSelectedSubject: 'No subject selected',
        subjectSelector: 'Select subject',
        requestSelector: 'Select consultation request',
        searching: 'Search...',
        noResult: 'No results found'
      },
      markdown: {
        edit: 'Edit',
        preview: 'Preview',
        help: 'Markdown help.',
        placeholder: 'Type your Markdown text here...',
        noEmpty: 'Text cannot be empty!',
        tooLong: 'Text too long!'
      },
      konziDateForm: {
        date: 'Date',
        start: 'Start',
        end: 'End',
        noPastStart: 'The consultation cannot start in the past',
        noEndBeforeStart: 'End cannot be before start'
      },
      groupListPage: {
        title: 'Groups',
        newGroup: 'New group',
        createGroup: 'Create new group',
        groupCreated: 'Group successfully created',
        groupDesc: `If you wish to hold a consultation for certain students (e.g., for a studygroup) you may create a group first.
        Anyone can request to join your group, but the request must be approved by the owner or an admin of the group, before they are
        admitted. If you provide one or more groups when creating your consultation, it will only be visible to the people who are part of
        any of the given groups.`, //
        ownGroups: 'Your groups',
        noOwnGroups: 'You are not part of any group!',
        otherGroups: 'Other groups',
        noOtherGroups: 'No other groups',
        groupName: 'Group name',
        cancel: 'Cancel',
        save: 'Save',
        tooLong: 'Too long!'
      },
      groupList: {
        joined: 'You have joined the group!',
        withdrawn: 'Your request has been withdrawn!',
        pending: 'Pending',
        withdraw: 'Withdraw request',
        join: 'Join'
      },
      groupDetailsPage: {
        notFound: 'Group not found!',
        notFound2: 'No group with given name',
        notFound2Message: `The group you have searched doesn't exist, or has been deleted`,
        created: 'Created',
        role: 'Role',
        pendingMembers: 'Pending members',
        members: 'Members',
        groupJoined: 'You have joined the group!',
        groupDeleted: 'You have deleted the group!',
        requestWithdrawn: 'You have withdrawn your request!',
        leftGroup: 'Group left!',
        makeKonzi: 'Make a consultation',
        edit: 'Edit',
        editGroup: 'Edit group',
        groupEdited: 'Group successfully edited',
        delete: 'Delete',
        deleteGroup: 'Delete group',
        confirmDelete: 'Are you sure you want to delete the group?',
        leave: 'Leave',
        leaveGroup: 'Leave group',
        confirmLeave: 'Are you sure you want to leave this group?',
        withdrawReq: 'Withdraw request',
        join: 'Join',
        userAccpeted: 'User accepted',
        userRejected: 'User rejected',
        userPromoted: 'User promoted',
        userDemoted: 'User demoted',
        userKicked: 'User kicked',
        owner: 'Owner',
        you: 'You',
        joined: 'Join',
        accept: 'Accept',
        reject: 'Reject',
        demote: 'Demote',
        promote: 'Promote',
        kick: 'Kick',
        noMembers: 'No members',
        noPendingMembers: 'No pending members'
      },
      userList: {
        allRating: 'Cumulative rating',
        ratingsForKonzi: 'Ratings for this consultation',
        rating: 'Rating: '
      },
      userRating: {
        ratingSuccess: 'Rated successfully!',
        ratingUpdateSuccess: 'Rating successfully updated!',
        konziNotFound: 'Consultation not found!',
        yourRating: 'Your rating:',
        edit: 'Edit',
        rateAfterStart: 'You can rate the tutor after the start of the consultation.',
        rate: 'Rate',
        ratingOf: 'Rate {{user}}',
        comment: 'Comment (optional)',
        rating: 'Rating...',
        anonymus: 'Rate anonymously',
        anonymusMessage: 'Admins can still see your name when rating anonymously. Please be respectful with your message',
        save: 'Save'
      },
      requestListPage: {
        supportSuccess: 'You endorsed this request!', //
        unsupportSuccess: 'You no longer endorse this request!', //
        requests: 'Consultation requests',
        newRequest: 'Request new consultation',
        requestDesc: `Do you need help in a subject? Create a consultation request, and if someone
        responds to it, you will be notified via email. If a request already exists from the subject, you may
        endorse that request; you will still recieve an email notification.`, //
        noRequests: 'There are no requests!',
        unsupport: 'Undo endorsement',
        support: 'Endorse',
        fulfill: 'Fulfill request'
      },
      requestDetailsPage: {
        notFound: 'Request not found',
        notFoundDesc: 'The request you searched for does not exist, or you do not have permission to view it.',
        expired: 'Expired',
        unsupport: 'Undo endorsement',
        support: 'Endorse',
        fulfill: 'Fulfill',
        consultations: 'Consultations',
        initiator: 'Initiator',
        supporters: 'Endorsers',
        noSupporters: 'There are no endorsers yet.',
        deleteSuccess: 'Successfully deleted consultation request!',
        operations: 'Operations',
        edit: 'Edit',
        delete: 'Delete',
        deleteModalHeader: 'Delete consultation request',
        deleteModalBody: 'Are you sure you want to delete the consultation request?'
      },
      requestEditPage: {
        createdSuccess: 'Consultation request created successfully!',
        updatedSuccess: 'Consultation request edited successfully!',
        noAccess: 'You do not have permission',
        onlyAuthor: `The consultation request may only be edited by it's author`,
        newRequest: 'New request',
        untitledRequest: 'Untitled consultation request',
        editRequest: 'Edit {{name}}',
        createNewRequest: 'Create new request',
        title: 'Consultation request name',
        titleNotEmpty: 'Name cannot be empty!',
        titleTooLong: 'Name too long! ',
        titlePlaceholder: 'Calculus exam help',
        desc: 'Description',
        back: 'Back',
        create: 'Create',
        save: 'Save',
        deadline: 'Deadline',
        pastDeadline: 'Deadline cannot be in the past'
      },
      userBrowserPage: {
        users: 'Users',
        searchUsers: 'Search users',
        searching: 'Search...',
        prevPage: 'Previous page',
        nextPage: 'Next page',
        noUser: 'No user can be found with given name',
        you: 'You',
        presenations: 'Held consultations',
        avgRating: 'Average rating',
        participations: 'Consultations participations'
      },
      profilePage: {
        unauth: 'You are not logged in!',
        profile: 'Profile',
        signOut: 'Sign out',
        presenationsTab: 'Held consultations',
        requestsTab: 'Consultation requests',
        participationsTab: 'Consultation participations',
        privatePresDisclaimer: `Certain consultations aren't showing, because they were held for a private group`,
        privateParDisclaimer: `Certain consultations aren't showing, because they were held for a private group`,
        presentationText: '{{count}} participants, rating: {{rating}}',
        notRated: 'This consultation was not rated by any participants yet.',
        noPres: 'This user has not held a public consultation yet.',
        noPar: 'This user has not participated in a public consultation yet.',
        noReq: 'This user has not requested a consultation yet.',
        presLabel: 'Held consultations',
        presExpl: 'This user was a tutor on {{data}} consultation(s).',
        allParLabel: 'Consultation participants',
        allParExpl: 'The cumulative number of participants in the consultations this user held was {{data}}.',
        ratingCountLabel: 'Rating',
        ratingCountExpl: 'This user recieved {{data}} ratings in total for the consultations he held.',
        avgRatingLabel: 'Average rating',
        avgRatingExpl: `The average rating of this user's held consultations`,
        avgRatingExplNoRating: `This user's held consultations did not recieve ratings yet`,
        parCountLabel: 'Consultation participations',
        parCountExpl: `This user participated {{data}} times on someone's consultation`,
        reqCountLabel: 'Requests',
        reqCountExpl: 'The user requested or endorsed a request {{data}} times.',
        generateReport: 'Generate report',
        reportDesc: `You may generate a report here about your held consultations for the Student Representation's scholarship.`,
        start: 'Start date',
        end: 'End date',
        invalidRange: 'Invalid date period!',
        onlyFromPast: 'You can only generate a report from past consultations!',
        cancel: 'Cancel',
        generate: 'Generate',
        ratings: 'Ratings',
        noTextRating: 'The user has not provided a comment for the rating'
      },
      errors: {
        unknown: 'Unknown error, try again',
        downloadError: 'Error during file download',
        downloadErrorDesc: 'It might have been deleted, or you do not have permission to view it.',
        error: 'An error occured',
        unauth: 'You are not signed in',
        back: 'Back',
        invalid: 'Invalid parameter',
        noUser: 'No user can be found with the given identifier!', //
        401: 'You are not signed in',
        403: 'You do not have permission for this operation',
        500: 'Unknown error',
        desc500: 'Please notify the developer',
        pageNotFound: 'Page not found',
        notFoundMsg: `Whoops, you have reached a page that doesn't exist`
      },
      misc: {
        vikhk: 'VIK Student Representation',
        impressum: 'Impressum',
        impressum1: `The application was developed by the Kir-Dev team. As all our other projects, this one is also open-source.
        A NodeJS REST API is the foundation of the project, which stores the data in a PostgreSQL database.
        The NestJS framework is used for HTTP communication, while the Prisma framework helps with database communication.`,
        impressum2: 'The codebase of the backend can be browsed here.',
        impressum3: `The User Interface is made with React. The unified look was achieved with Chakra UI.`,
        impressum4: ' You can check out the frontend codebase here.',
        impressum5: "If you're interested in web development or want to learn more, visit our",
        impressum6: 'website',
        impressum7: ' or read our',
        impressum8: 'blog',
        impressum9: ' where',
        impressum10: 'we wrote a dedicated article about the development of Konzisite.',
        impressum11: `If you find any bugs with the application or have suggestions for improvments, don't hesitate to contact us via`,
        impressum12: 'email.',
        developers: 'Developers'
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
      PENDING: 'Függőben',
      MEMBER: 'Tag',
      ADMIN: 'Admin',
      OWNER: 'Tulajdonos',
      NONE: 'Nem tag',
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
        welcome: 'Üdvözlünk a Konzisite‑on!',
        unratedConsultations: `Az alábbi konzultációkon részt vettél, de még nem értékelted az előadókat! Kérlek, tedd meg minél előbb,
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
        noParticipants: 'Még nincs egy résztvevő se.',
        konziDeleted: 'Törölted a konzultációt!',
        attachmentUploaded: 'Jegyzet feltöltve!',
        attachmentDeleted: 'Törölted a jegyzetet!',
        operations: 'Műveletek',
        edit: 'Szerkesztés',
        archivedMesage: 'A konzi archiválva lett, már nem lehet feltölteni fájlt.',
        editAttachment: 'Jegyzet módosítása',
        uploadAttachment: 'Jegyzet feltöltése',
        save: 'Mentés',
        deleteAttachment: 'Jegyzet törlése',
        deleteConfirm: 'Biztosan törlöd a feltöltött fájlt? A résztvevők ezentúl nem fogják tudni letölteni.',
        delete: 'Törlés',
        attachmentMessage: `Előadóként vagy létrehozóként van lehetőséged egy fájl feltöltésére a konzihoz. Ezt a fájlt a konzi résztvevői
        a konzi kezdete után tudják letölteni, ha már értékelték az előadókat.`,
        extensions: 'Megengedett fájlformátumok: .jpg, .png, .pdf, .docx, .pptx, .zip',
        maxSize: 'Maximális fájlméret: 10 MB',
        autoDeleteAlert: 'A fájl a konzi vége után 30 nappal törlődik a szerverről, és nem lesz többé letölthető!',
        deleteKonzi: 'Konzultáció törlése',
        confirmDeleteKonzi: 'Biztos törölni szeretnéd a konzultációt?',
        targetGroups_one: 'Célcsoport',
        tergetGroups_other: 'Célcsoportok',
        joinedKonzi: 'Csatlakoztál a konzultációhoz!',
        leftKonzi: 'Kiléptél a konzultációból!',
        konziNotFound: 'A konzultáció nem található!',
        konziNotFound2: 'A konzultáció amit keresel nem létezik, vagy nincs jogosultságod megtekinteni.'
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
        az egyik célcsoportnak tagjai.`,
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
      groupDetailsPage: {
        notFound: 'A csoport nem található!',
        notFound2: 'Nincs ilyen csoport',
        notFound2Message: 'A csoport amit keresel már nem létezik, vagy nem is létezett',
        created: 'Létrehozva',
        role: 'Szerepköröd',
        pendingMembers: 'Függő tagok',
        members: 'Tagok',
        groupJoined: 'Csatlakoztál a csoporthoz!',
        groupDeleted: 'Törölted a csoportot!',
        requestWithdrawn: 'Visszavontad a csatlakozási kérelmed!',
        leftGroup: 'Kiléptél a csoportból!',
        makeKonzi: 'Konzi tartása',
        edit: 'Szerkesztés',
        editGroup: '"Csoport szerkesztése',
        groupEdited: 'Csoport sikeresen szerkesztve',
        delete: 'Törlés',
        deleteGroup: 'Csoport törlése',
        confirmDelete: 'Biztos törölni szeretnéd a csoportot?',
        leave: 'Kilépés',
        leaveGroup: 'Kilépés a csoportból',
        confirmLeave: 'Biztos ki szeretnél lépni a csoportból?',
        withdrawReq: 'Kérelem visszavonása',
        join: 'Csatlakozás',
        userAccpeted: 'Felhasználó elfogadva',
        userRejected: 'Felhasználó visszautasítva',
        userPromoted: 'Felhasználó előléptetve',
        userDemoted: 'Felhasználó visszaléptetve',
        userKicked: 'Felhasználó eltávolítva',
        owner: 'Tulajdonos',
        you: 'Te',
        joined: 'Csatlakozás',
        accept: 'Elfogadás',
        reject: 'Elutasítás',
        demote: 'Előléptetés',
        promote: 'Előléptetés',
        kick: 'Eltávolítás',
        noMembers: 'Nincsenek tagok',
        noPendingMembers: 'Nincsenek függő tagok'
      },
      userList: {
        allRating: 'Összesített értékelés',
        ratingsForKonzi: 'Értékelés erre a konzira',
        rating: 'Értékelés: '
      },
      userRating: {
        ratingSuccess: 'Sikeresen értékeltél!',
        ratingUpdateSuccess: 'Sikeresen frissítetted az értékelést!',
        konziNotFound: 'A konzultáció nem található!',
        yourRating: 'Te értékelésed:',
        edit: 'Módosítás',
        rateAfterStart: 'A konzi kezdete után tudod értékelni az előadót.',
        rate: 'Értékelés',
        ratingOf: '{{user}} értékelése',
        comment: 'Megjegyzés (opcionális)',
        rating: 'Értékelés...',
        anonymus: 'Értékelés névtelenül',
        anonymusMessage: `Attól még, hogy név nélkül értékelsz, az oldal adminjai továbbra is látni fogják a neved.
            Kérlek, értelmes kritikát írj`,
        save: 'Mentés'
      },
      requestListPage: {
        supportSuccess: 'Támogatod a kérést!',
        unsupportSuccess: 'Már nem támogatod a kérést!',
        requests: 'Konzultáció kérések',
        newRequest: 'Új konzi kérés',
        requestDesc: `Szükséged lenne segítségre valamelyik tárgyból? Készíts egy konzi kérést, és ha valaki megvalósítja azt,
        értesítünk emailben! Ha már létezik kérés a tárgyból, elég támogatnod azt, így is meg fogod kapni az értesítést.`,
        noRequests: 'Nincsenek kérések!',
        unsupport: 'Nem támogatom',
        support: 'Támogatom',
        fulfill: 'Megtartom'
      },
      requestDetailsPage: {
        notFound: 'Nem található a konzi kérés',
        notFoundDesc: 'A konzi kérés amit keresel nem létezik, vagy nincs jogosultságod megtekinteni.',
        expired: 'Lejárt',
        unsupport: 'Nem támogatom',
        support: 'Támogatom',
        fulfill: 'Megtartom',
        consultations: 'Konzultációk',
        initiator: 'Kezdeményező',
        supporters: 'Támogatók',
        noSupporters: 'Még nincs egy támogató se.',
        deleteSuccess: 'Sikeresen törölted a konzi kérést!',
        operations: 'Műveletek',
        edit: 'Szerkesztés',
        delete: 'Törlés',
        deleteModalHeader: 'Konzi kérés törlése',
        deleteModalBody: 'Biztos törölni szeretnéd a konzi kérést?'
      },
      requestEditPage: {
        createdSuccess: 'Konzi kérés sikeresen létrehozva!',
        updatedSuccess: 'Konzi kérés sikeresen módosítva!',
        noAccess: 'Nincs jogod',
        onlyAuthor: 'A konzi kérést csak a kezdeményezője szerkesztheti',
        newRequest: 'Új konzi kérés',
        untitledRequest: 'Névtelen konzi kérés',
        editRequest: '{{name}} szerkesztése',
        createNewRequest: 'Új konzi kérés létrehozása',
        title: 'Konzi kérés neve',
        titleNotEmpty: 'Név nem lehet üres!',
        titleTooLong: 'Név túl hosszú! ',
        titlePlaceholder: 'Digit vizsga segítség',
        desc: 'Leírás',
        back: 'Vissza',
        create: 'Létrehozás',
        save: 'Mentés',
        deadline: 'Határidő',
        pastDeadline: 'Nem lehet múltbeli határidő'
      },
      userBrowserPage: {
        users: 'Felhasználók',
        searchUsers: 'Felhasználók keresése',
        searching: 'Keresés...',
        prevPage: 'Előző oldal',
        nextPage: 'Következő oldal',
        noUser: 'Nem található felhasználó ilyen névvel',
        you: 'Te',
        presenations: 'Tartott konzi',
        avgRating: 'Átlagos értékelés',
        participations: 'Konzi részvétel'
      },
      profilePage: {
        unauth: 'Nem vagy bejelentkezve!',
        profile: 'Profil',
        signOut: 'Kijelentkezés',
        presenationsTab: 'Tartott konzik',
        requestsTab: 'Konzi kérések',
        participationsTab: 'Konzi részvételek',
        privatePresDisclaimer: 'Egyes konzik nem jelennek meg, mert a felhasználó egy privát csoportnak tartotta őket.',
        privateParDisclaimer: 'Egyes konzik nem jelennek meg, mert a felhasználó egy privát csoport tagjaként vett részt rajtuk.',
        presentationText: '{{count}} résztvevő, értékelés: {{rating}}',
        notRated: 'Ezt a konzit még nem értékelte senki.',
        noPres: 'A felhasználó még nem tartott publikus konzultációt.',
        noPar: 'A felhasználó még nem vett részt publikus konzultáción.',
        noReq: 'A felhasználó még nem kért konzultációt.',
        presLabel: 'Tartott konzi',
        presExpl: 'A felhasználó {{data}} konzultáción volt előadó.',
        allParLabel: 'Konzi résztvevő',
        allParExpl: 'Azokon a konzikon, ahol a felhasználó előadó volt, összesen {{data}} hallgató vett részt.',
        ratingCountLabel: 'Értékelés',
        ratingCountExpl: 'A felhasználó előadásaira összesen {{data}} értékelés érkezett.',
        avgRatingLabel: 'Átlagos értékelés',
        avgRatingExpl: 'A felhasználó előadásainak átlagértékelése {{data}}.',
        avgRatingExplNoRating: 'A felhasználó előadásaira még nem érkezett értékelés.',
        parCountLabel: 'Konzi részvétel',
        parCountExpl: 'A felhasználó összesen {{data}} alkalommal vett részt más konzultációján.',
        reqCountLabel: 'Kért konzi',
        reqCountExpl: 'A felhasználó összesen {{data}} konzi kérést kezdeményezett vagy támogatott.',
        generateReport: 'Riport generálása',
        reportDesc: 'HK-s ösztöndíjakhoz itt tudsz riportot generálni az általad tartott konzultációkról.',
        start: 'Időtartam kezdete',
        end: 'Időtartam vége',
        invalidRange: 'Érvénytelen időtartam!',
        onlyFromPast: 'Csak múltbeli konzikról lehet riportot generálni!',
        cancel: 'Mégse',
        generate: 'Generálás',
        ratings: 'Értékelések',
        noTextRating: 'A felhasználó nem adott szöveges értékelést'
      },
      errors: {
        unknown: 'Ismeretlen hiba, kérjük próbáld újra',
        downloadError: 'Hiba a fájl letöltése közben',
        downloadErrorDesc: 'Lehet hogy már törlésre került, vagy nincs jogod megtekinteni.',
        error: 'Hiba történt',
        unauth: 'Nem vagy bejelentkezve',
        back: 'Vissza',
        invalid: 'Érvénytelen paraméter',
        noUser: 'Nem található felhasználó ilyen azonosítóval!',
        401: 'Nem vagy bejelentkezve',
        403: 'Nincs jogosultságod a művelethez',
        500: 'Ismeretlen hiba',
        desc500: 'Kérlek jelezd a fejlesztők felé',
        pageNotFound: 'Az oldal nem található',
        notFoundMsg: 'Hupsz, olyan oldalra kerültél, ami nem létezik!'
      },
      requests: {
        untilDeadline_one: 'Ma jár le',
        untilDeadline_other: '{{count}} nap van hátra',
        sinceDeadline: '{{count}} napja járt le'
      },
      misc: {
        vikhk: 'VIK Hallgatói Képviselet',
        impressum: 'Impresszum',
        impressum1: `Az alkalmazást a HK felkérésére a Kir-Dev webfejlesztő kör készítette. Mint ahogy az összes többi projektünk,
        ez is nyílt forráskódú. A projekt alapja egy NodeJS REST API, mely egy PostgreSQL adatbázisban tárolja az adatokat.
        A webes kommunikációt a NestJS, az adatbázissal való kapcsolatot pedig a Prisma keretrendszer egyszerűsíti. A backend kódbázisa`,
        impressum2: 'itt böngészhető.',
        impressum3: `A felhasználói felület pedig React-tal készült, az egységes megjelenés a Chakra UI-nak köszönhető.
        A frontend kódbázisát `,
        impressum4: 'itt tudod megnézni.',
        impressum5: 'Ha érdekel a webfejlesztés és szeretnél többet megtudni rólunk, látogass el a',
        impressum6: 'weboldalunkra',
        impressum7: ', vagy olvass bele a',
        impressum8: 'blogunkba',
        impressum9: ', ahol',
        impressum10: 'külön posztot írtunk a Konzisite fejlesztésének folyamatáról.',
        impressum11: `Amennyiben hibát találtál az alkalmazás működésében, vagy lenne egy ötleted, hogy mit lehetne fejleszteni rajta,
        vedd fel velünk a kapcsolatot`,
        impressum12: 'emailben.',
        developers: 'Fejlesztők',
        min1file: 'Legalább egy fájl feltöltése szükséges!',
        max1File: 'Csak egy fájl feltöltése lehetséges!',
        maxSize: 'Maximális megengedett méret: {{size}} MB',
        requiredField: 'Kötelező mező',
        noFile: 'Nincs fájl kiválasztva',
        undoSelection: 'Választott fájl visszavonása',
        signIn: 'Jelentkezz be AuthSCH-n keresztül',
        authSch: 'AuthSCH bejelentkezés'
      }
    }
  }
}
