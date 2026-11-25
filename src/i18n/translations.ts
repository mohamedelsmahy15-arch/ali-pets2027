export const TRANSLATIONS = {
  ar: {
    seo: {
      homeTitle: 'ALI PETS — كلاب وجراوي وإكسسوارات في الإسكندرية',
      homeDescription:
        'صاحبك الجديد ممكن يكون هنا — شوف الكلاب والجراوي المتاحة، راجع تفاصيل كل كلب وأوراقه، واسألنا عن السعر والتوفر في ALI PETS بالإسكندرية.',
    },
    nav: {
      dogs: 'الكلاب',
      accessories: 'الإكسسوارات',
      howItWorks: 'بنشتغل إزاي',
      about: 'عن المحل',
      whatsapp: 'واتساب',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      cart: 'سلة الإكسسوارات',
      langSwitch: 'EN',
      langSwitchAria: 'Switch language to English',
    },
    demo: {
      bannerShort: 'معاينة تجريبية — ده مش كلب متاح للبيع',
      siteNotice:
        'ملحوظة: الصور والبيانات المعروضة دلوقتي نماذج تجريبية لتجربة الموقع بس، ومش كلاب حقيقية للبيع.',
      inquiryBlockedTitle: 'نموذج معاينة تجريبي',
      inquiryBlockedBody:
        'الكلب ده نموذج تجريبي لتجربة شكل الموقع وطريقة عرض البيانات («معاينة تجريبية — ده مش كلب متاح للبيع»). أول ما نضيف الكلاب الحقيقية بصورها وأوراقها، زر التواصل على واتساب هيشتغل هنا.',
      understandClose: 'تمام، فهمت',
      demoInquiryBtn: 'اعرف تفاصيل النموذج',
    },
    hero: {
      eyebrow: 'محل كلاب وجراوي وإكسسوارات · الإسكندرية',
      headline: 'صاحبك الجديد ممكن يكون هنا',
      subtitle:
        'شوف الكلاب والجراوي، اتعرف على تفاصيل كل واحد وأوراقه المتوفرة، واسألنا عن السعر والتوفر في ALI PETS بالإسكندرية.',
      primaryCta: 'شوف الكلاب المتاحة',
      secondaryCta: 'تصفح الإكسسوارات',
      quickAssurance: 'بتشوف الكلب وأوراقه على الطبيعة في الإسكندرية قبل أي قرار',
    },
    categories: {
      eyebrow: 'تصفح سريع',
      title: 'بتدور على حجم أو سن إيه؟',
      linkAll: 'شوف كل الكلاب',
      countLabel: (n: number) => {
        if (n === 0) return 'مش متاح دلوقتي';
        if (n === 1) return 'نموذج معاينة واحد';
        if (n === 2) return 'نموذجا معاينة';
        if (n <= 10) return `${n} نماذج معاينة`;
        return `${n} نموذج معاينة`;
      },
    },
    recentDogs: {
      eyebrow: 'قسم الكلاب · معاينة',
      title: 'كل كلب له حكاية.. ابدأ اختار صاحبك',
      subtitle:
        'شوف الصور والتفاصيل والأوراق المتوفرة لكل كلب. النماذج دي للتجربة بس عشان تستكشف شكل العرض.',
      viewAll: 'شوف كل الكلاب',
    },
    breeds: {
      eyebrow: 'دليل السلالات',
      title: 'سلالات بتناسب بيوت مختلفة',
      note: 'معلومات سريعة عن طباع كل سلالة لمساعدتك تقارن — ومش معناها إنها متاحة في المحل دلوقتي.',
      linkText: 'شوف المتاح من السلالة دي',
    },
    why: {
      eyebrow: 'الثقة والتوثيق',
      title: 'اختار وإنت مطمّن، واسأل عن التفاصيل',
      items: [
        {
          num: '01',
          title: 'بيانات وأوراق واضحة قدامك',
          body: 'بنوضح المعلومات والمستندات المتوفرة لكل كلب، من غير ما نخفي البيانات الناقصة أو نبالغ.',
        },
        {
          num: '02',
          title: 'مواصفات محددة لكل كلب',
          body: 'كل كلب له رقم مرجعي واضح، وسنّه ونوعه، والسعر لما يكون متحدد، من غير تخمين.',
        },
        {
          num: '03',
          title: 'معاينة على الطبيعة في الإسكندرية',
          body: 'احجز موعد عشان تشوف الكلب وتراجع أوراقه بنفسك مع فريقنا قبل ما تشتري.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'خطوات بسيطة',
      title: 'من الاختيار للمعاينة في 4 خطوات',
      steps: [
        {
          num: '01',
          title: 'اختار الكلب',
          body: 'شوف الكلاب المتاحة وقارن حسب السن والحجم والتوثيق.',
        },
        {
          num: '02',
          title: 'راجع التفاصيل والأوراق',
          body: 'اقرأ المواصفات وشوف المستندات الصحية المتوفرة فعلاً.',
        },
        {
          num: '03',
          title: 'اسألنا على واتساب',
          body: 'ابعتلنا رقم الكلب عشان تعرف السعر والتوفر الحالي بسرعة.',
        },
        {
          num: '04',
          title: 'احجز موعد وشوف الكلب',
          body: 'بنرتّب معاك موعد في الإسكندرية تشوف فيه الكلب وتطّمن قبل القرار.',
        },
      ],
    },
    accessoriesSection: {
      eyebrow: 'الإكسسوارات',
      title: 'كل اللي صاحبك محتاجه في مكان واحد',
      viewStore: 'تصفح الإكسسوارات',
      pricePending: 'السعر والتوفر بيتحددوا عند الطلب',
      demoCaption: 'منتج تجريبي — الصورة توضيحية',
      previewNote: 'مستلزمات العناية والأكل والتمشية لكلبك — صور تجريبية لمعاينة الشكل قبل إطلاق المتجر الكامل.',
    },
    careSection: {
      eyebrow: 'قبل ما تقرر',
      title: '3 حاجات مهم تجهزها قبل ما تاخد كلب',
      points: [
        'اتأكد إن يومك فيه وقت ثابت للتمشية والأكل والاهتمام بالكلب.',
        'اعمل كشف عند دكتور بيطري بعد الاستلام عشان تطمّن على صحته.',
        'تابع مع الدكتور البيطري جدول التطعيمات والتحصينات المناسب لعمره.',
      ],
      cta: 'شوف نصائح الرعاية',
    },
    whatsappCta: {
      eyebrow: 'التواصل والزيارة · الإسكندرية',
      title: 'محتار تختار؟ إحنا نساعدك',
      subtitle:
        'اسألنا عن الكلاب أو المنتجات أو مواعيد الزيارة في الإسكندرية، وهنساعدك تعرف كل التفاصيل بوضوح.',
      button: 'اسألنا على واتساب',
      notConfiguredTitle: 'رقم الواتساب لسه متضافش',
      notConfiguredBody:
        'لسه ما ضفناش رقم الواتساب الرسمي للمحل. أول ما يتضاف في إعدادات الموقع، الزر ده هيفتح محادثة واتساب مع المحل على طول.',
    },
    footer: {
      tagline: 'محل لبيع الكلاب والجراوي والإكسسوارات في الإسكندرية، مصر.',
      illustrativeNote:
        'ملحوظة: الصور والبيانات الموجودة دلوقتي للمعاينة والتجربة بس ومش كلاب حقيقية للبيع.',
      columns: {
        explore: 'الأقسام',
        trust: 'معلومات مهمة',
        contact: 'التواصل والمكان',
      },
      links: {
        home: 'الرئيسية',
        dogs: 'الكلاب المتاحة',
        accessories: 'الإكسسوارات',
        care: 'نصائح الرعاية',
        about: 'عن المحل والتواصل',
        privacy: 'الخصوصية',
        terms: 'الشروط',
      },
      city: 'الإسكندرية، مصر (العنوان التفصيلي بيتضاف قريباً)',
      whatsappPending: 'واتساب: لسه في انتظار الرقم الرسمي',
      rights: '© 2026 ALI PETS. جميع الحقوق محفوظة.',
    },
    card: {
      priceOnInquiry: 'اسأل على السعر على واتساب',
      details: 'اعرف تفاصيل الكلب',
      available: 'متاح (معاينة)',
      reserved: 'محجوز (معاينة)',
      sold: 'تم البيع',
      docShort: {
        vaccination: 'التطعيمات',
        deworming: 'الديدان',
        health_booklet: 'الكتيب الصحي',
        pedigree: 'شهادة النسب',
      },
      statusLabel: {
        verified: 'موثّق بورق',
        partially_documented: 'متوثّق جزئياً',
        not_documented: 'مفيش ورق',
        not_provided: 'لسه متضافش',
      },
      gender: {
        male: 'ذكر',
        female: 'أنثى',
      },
    },
    stub: {
      phase2Badge: 'هتتفتح في المرحلة الثانية',
      phase3Badge: 'هتتفتح في المرحلة الثالثة',
      backHome: 'ارجع للرئيسية',
      notFoundTitle: 'الصفحة دي مش موجودة',
      notFoundBody: 'الرابط اللي فتحته مش شغال أو مش موجود. تقدر ترجع للصفحة الرئيسية وتكمل تصفح.',
    },
    archive: {
      pageTitle: 'ALI PETS — الكلاب والجراوي المتاحة',
      eyebrow: 'أرشيف الكلاب والجراوي · الإسكندرية',
      title: 'شوف الكلاب والجراوي',
      subtitle:
        'ابحث بالاسم أو السلالة أو رقم الكلب، وقارن بين العمر والحجم والتوثيق. النماذج المعروضة حاليًا للتجربة فقط.',
      searchLabel: 'ابحث عن كلب',
      searchPlaceholder: 'ابحث بالسلالة أو رقم الكلب...',
      clearSearch: 'مسح البحث',
      sortLabel: 'ترتيب حسب',
      sortOptions: {
        newest: 'الأحدث إضافة',
        'price-asc': 'السعر: من الأقل للأعلى',
        'price-desc': 'السعر: من الأعلى للأقل',
      },
      resultsCount: (n: number) => {
        if (n === 0) return 'مفيش نتائج مطابقة دلوقتي';
        if (n === 1) return 'عرض نموذج واحد';
        if (n === 2) return 'عرض نموذجين';
        if (n <= 10) return `عرض ${n} نماذج`;
        return `عرض ${n} نموذج`;
      },
      filtersTitle: 'تصفية النتائج',
      filtersButton: 'الفلاتر',
      applyFilters: (n: number) => `عرض النتائج (${n})`,
      resetAll: 'مسح كل الفلاتر',
      activeFiltersLabel: 'الفلاتر المفعّلة',
      closeSheet: 'إغلاق الفلاتر',
      groups: {
        breed: 'السلالة',
        age: 'العمر',
        gender: 'الجنس',
        size: 'الحجم',
        price: 'السعر (ج.م)',
        vaccination: 'توثيق التطعيمات',
        availability: 'الحالة',
      },
      ages: {
        'under-6': 'جراوي (أقل من 6 شهور)',
        'under-3': 'أقل من 3 شهور',
        '3-6': 'من 3 لـ 6 شهور',
        '6-12': 'من 6 لـ 12 شهر',
        'over-12': 'أكتر من سنة',
      },
      genders: {
        all: 'الكل',
        male: 'ذكر',
        female: 'أنثى',
      },
      sizes: {
        small: 'صغير',
        medium: 'متوسط',
        large: 'كبير',
        giant: 'عملاق',
      },
      vaccinations: {
        verified: 'موثّق بمستند تطعيم',
        partially_documented: 'توثيق جزئي',
      },
      vaccinationDemoHint: 'مستندات النماذج التجريبية للعرض فقط وليست شهادات بيطرية حقيقية.',
      availabilities: {
        available: 'متاح',
        reserved: 'محجوز',
      },
      pricePendingNote:
        'الأسعار المؤكدة لسه مش مضافة على النماذج التجريبية. فلتر السعر بيتفعّل تلقائيًا أول ما تتضاف أسعار حقيقية.',
      minPriceLabel: 'من (ج.م)',
      maxPriceLabel: 'إلى (ج.م)',
      includePriceOnInquiry: 'اعرض كمان الكلاب اللي سعرها بالاستفسار',
      priceSortNote: 'الكلاب اللي لسه بدون سعر مؤكّد بتظهر بعد الكلاب المسعّرة.',
      emptyTitle: 'مفيش كلاب مطابقة لاختياراتك دلوقتي',
      emptyBody:
        'جرّب تخفّف شوية من الفلاتر أو امسح البحث عشان تشوف كل النماذج المتاحة حاليًا، أو اسألنا مباشرة على واتساب.',
      emptyAskWhatsapp: 'اسألنا على واتساب عن سلالة معينة',
      docCompact: {
        verified_demo: 'تطعيم: موثّق (عينة تجريبية)',
        verified_real: 'تطعيم: موثّق بمستند',
        partial: 'تطعيم: متوثّق جزئياً',
        none: 'تطعيم: بدون مستند',
      },
    },
    detail: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbArchive: 'الكلاب المتاحة',
      backToArchive: 'رجوع لكل الكلاب',
      referenceIdLabel: 'الرقم المرجعي',
      availabilityLabel: 'حالة التوفر',
      priceSectionLabel: 'السعر',
      priceOnInquiryDetail: 'السعر بالاستفسار عند التوفر الفعلي',
      notRecorded: 'غير مسجل',
      zoomImage: 'تكبير الصورة',
      previousMedia: 'الصورة السابقة',
      nextMedia: 'الصورة التالية',
      closeLightbox: 'إغلاق المعاينة',
      specsTitle: 'المواصفات الأساسية',
      specs: {
        breed: 'السلالة',
        age: 'العمر',
        gender: 'الجنس',
        coatColor: 'اللون',
        size: 'الحجم المتوقع',
        birthDate: 'تاريخ الميلاد',
      },
      aboutHeading: 'نبذة عن الكلب',
      docsTitle: 'الأوراق والتطعيمات',
      docsDemoDisclaimer:
        'تنويه: المستندات والصور المعروضة في هذا النموذج التجريبي للعرض فقط وليست سجلات بيطرية حقيقية.',
      docsProofCount: (verified: number, total: number) =>
        `${verified} من ${total} بنود لها إثبات مرفق`,
      docsPartialCount: (n: number) =>
        n === 1 ? 'بند واحد بتوثيق جزئي' : `${n} بنود بتوثيق جزئي`,
      docSourceLabel: 'الجهة / المصدر',
      docDateLabel: 'التاريخ',
      docViewSampleImage: 'عرض صورة المستند',
      docSamplePreviewNote: 'صورة مستند تجريبي للمعاينة فقط',
      inquiryCardTitle: 'الاستفسار والحجز',
      inquiryDemoOpenBtn: 'جرّب نموذج الاستفسار ومعاينة الرسالة (تجريبي)',
      inquiryBlockedDemoBtn: 'واتساب غير متاح للنماذج التجريبية',
      inquiryBlockedDemoHint:
        'تقدر تجرّب نموذج الاستفسار وتعاين شكل الرسالة وتنسخها، لكن فتح واتساب مقفول لأن الكلب ده نموذج تجريبي مش للبيع.',
      inquiryBlockedSoldBtn: 'تم البيع — الاستفسار غير متاح',
      inquiryBlockedSoldHint: 'الكلب ده مباع حالياً ومش متاح للاستفسار.',
      inquiryOpenRealBtn: 'استفسر عن الكلب على واتساب',
      inquiryRealHint:
        'هتكتب بياناتك وتراجع نص الرسالة كاملة بنفسك قبل ما تفتح واتساب.',
      similarTitle: 'كلاب مشابهة للمعاينة',
      similarViewAll: 'شوف كل الكلاب',
      notFoundTitle: 'الكلب ده مش موجود في الأرشيف',
      notFoundBody: (id: string) =>
        `ملقيناش ملف برقم "${id}". ممكن يكون الرقم مكتوب غلط أو الملف اتشال من العرض الحالي.`,
      notFoundBackHome: 'ارجع للرئيسية',
    },
    inquiryModal: {
      title: 'استفسار عن الكلب',
      step1Badge: 'الخطوة 1 من 2 · بياناتك',
      step2Badge: 'الخطوة 2 من 2 · معاينة الرسالة',
      step1Intro:
        'اكتب بياناتك وحدد نوع الاستفسار، وفي الخطوة الجاية هتشوف نص الرسالة كامل قبل أي إجراء.',
      demoBanner:
        'تحذير معاينة: الكلب ده نموذج تجريبي مش متاح للبيع. تقدر تعاين الرسالة وتنسخها، وممنوع فتح رابط واتساب.',
      soldBanner: 'الكلب ده حالته مباع — استفسار الشراء وفتح واتساب مقفولين.',
      notConfiguredBanner:
        'رقم واتساب المحل الرسمي لسه متضافش. تقدر تعاين الرسالة وتنسخها، وفتح واتساب هيتفعّل أول ما يتضاف الرقم.',
      fields: {
        nameLabel: 'الاسم',
        namePlaceholder: 'اكتب اسمك الكامل',
        phoneLabel: 'رقم الموبايل المصري',
        phonePlaceholder: 'مثال: 01012345678',
        areaLabel: 'المنطقة في الإسكندرية',
        areaPlaceholder: 'اختار منطقتك في الإسكندرية',
        inquiryTypeLabel: 'نوع الاستفسار',
        messageLabel: 'رسالة إضافية (اختياري)',
        messagePlaceholder: 'مثال: الوقت المناسب للمعاينة أو أي سؤال تحب تسأله...',
      },
      inquiryTypes: {
        more_info: 'معلومات أكتر عن الكلب',
        viewing: 'حجز موعد عشان أشوف الكلب',
        price: 'السؤال عن السعر',
        delivery: 'التوصيل أو الاستلام',
      },
      errors: {
        nameRequired: 'من فضلك اكتب اسمك.',
        nameMinLength: 'الاسم لازم يكون حرفين على الأقل.',
        phoneRequired: 'من فضلك اكتب رقم الموبايل.',
        phoneInvalid: 'اكتب رقم موبايل مصري صحيح بيبدأ بـ 010 أو 011 أو 012 أو 015.',
        areaRequired: 'اختار المنطقة داخل الإسكندرية.',
        messageMaxLength: 'الرسالة الإضافية بحد أقصى 300 حرف.',
      },
      charsCount: (len: number, max: number) => `${len} / ${max}`,
      previewLabel: 'معاينة رسالة واتساب النهائية',
      selectedAccessoriesLabel: 'إكسسوارات مضافة للاستفسار عن السعر والتوفر',
      selectedAccessoriesHint: 'توضيح: الإكسسوارات دي للسؤال بس ومش طلب شراء مؤكد ولا متضافة للسلة.',
      consentCheckbox: 'راجعت بيانات الرسالة وموافق على فتح واتساب للمتابعة.',
      actions: {
        previewMessage: 'معاينة الرسالة',
        editDetails: 'تعديل البيانات',
        copyMessage: 'نسخ الرسالة',
        copied: 'تم نسخ الرسالة',
        openWhatsApp: 'فتح واتساب بالرسالة',
        whatsappBlockedDemo: 'فتح واتساب مقفول (نموذج تجريبي)',
        whatsappBlockedSold: 'فتح واتساب مقفول (مباع)',
        whatsappNotConfigured: 'فتح واتساب غير متاح (الرقم غير مهيأ)',
        close: 'إغلاق',
      },
    },
    welcomeHome: {
      eyebrow: 'تجهيزات استقبال اختيارية',
      title: 'جهّز استقبال رفيقك الجديد',
      subtitles: {
        age_and_size:
          '3 ترشيحات مبدئية مناسبة للعمر والحجم المسجّلين — تقدر تختار اللي حابب تسأل عن سعره وتوفره أو تتخطى القسم.',
        age_only:
          '3 ترشيحات مبدئية بناءً على العمر المسجّل فقط (الحجم غير مسجل) — الاختيار للتوضيح والاستفسار فقط.',
        size_only:
          '3 ترشيحات مبدئية بناءً على الحجم المسجّل فقط (العمر غير مسجل) — الاختيار للتوضيح والاستفسار فقط.',
        general_starter:
          'اقتراحات تجهيز عامة للبداية لأن بيانات العمر والحجم غير مكتملة في الملف — مش توصيات مخصصة.',
      },
      demoCaption: 'منتج تجريبي — الصورة توضيحية',
      selectItem: 'اختيار للاستفسار',
      selectedItem: 'مختار للاستفسار',
      skipSection: 'تخطي قسم التجهيزات',
      skippedTitle: 'تم تخطي قسم التجهيزات',
      skippedBody: 'تقدر تكمل استفسارك عن الكلب بس، أو ترجع تشوف الاقتراحات لو حبيت.',
      restoreSection: 'عرض الاقتراحات تاني',
      reassuranceNote:
        'مفيش أي التزام أو إضافة للسلة — اختياراتك هنا بس عشان تسأل عن أسعارها وتوفرها مع استفسار الكلب.',
      askWithDogCta: (n: number) =>
        n > 0
          ? `استفسر عن الكلب + ${n} إكسسوارات مختارة`
          : 'استفسر عن الكلب',
      selectedSummary: (n: number) =>
        n === 1 ? 'مختار إكسسوار واحد للاستفسار' : `مختار ${n} إكسسوارات للاستفسار`,
    },
  },
  en: {
    seo: {
      homeTitle: 'ALI PETS — Dogs, Puppies & Accessories in Alexandria',
      homeDescription:
        'Browse dogs and puppies in Alexandria with upfront details and available paperwork, and message ALI PETS on WhatsApp for pricing and viewing.',
    },
    nav: {
      dogs: 'Dogs',
      accessories: 'Accessories',
      howItWorks: 'How It Works',
      about: 'About',
      whatsapp: 'WhatsApp',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      cart: 'Accessories cart',
      langSwitch: 'AR',
      langSwitchAria: 'التبديل إلى اللغة العربية',
    },
    demo: {
      bannerShort: 'Demo Preview — Not a real dog for sale',
      siteNotice:
        'Note: The portraits and profiles shown right now are sample placeholders to preview the site, not real dogs for sale.',
      inquiryBlockedTitle: 'Demonstration Listing',
      inquiryBlockedBody:
        'This profile is a sample preview ("Demo Preview — Not a real dog for sale"). Real WhatsApp inquiries unlock once verified shop dogs, photos, and records are published.',
      understandClose: 'Got it',
      demoInquiryBtn: 'View Demo Details',
    },
    hero: {
      eyebrow: 'Dogs, Puppies & Accessories · Alexandria',
      headline: 'Your next companion could be right here',
      subtitle:
        'Browse dogs and puppies in Alexandria, check each profile and available paperwork, and ask us about availability and pricing.',
      primaryCta: 'Browse Available Dogs',
      secondaryCta: 'Browse Accessories',
      quickAssurance: 'Meet the dog and review paperwork in person in Alexandria',
    },
    categories: {
      eyebrow: 'Quick Browse',
      title: 'What age or size fits best?',
      linkAll: 'See All Dogs',
      countLabel: (n: number) => {
        if (n === 0) return 'Not available right now';
        if (n === 1) return '1 demo preview';
        return `${n} demo previews`;
      },
    },
    recentDogs: {
      eyebrow: 'Dogs Showcase · Preview',
      title: 'Every dog has a story—start exploring',
      subtitle:
        'Check photos, basic facts, and documented health items on each card. Sample listings below are for preview only.',
      viewAll: 'View All Dogs',
    },
    breeds: {
      eyebrow: 'Breed Guide',
      title: 'Breeds for different homes',
      note: 'General temperament notes to help you compare—does not imply current in-store availability.',
      linkText: 'Check this breed',
    },
    why: {
      eyebrow: 'Trust & Paperwork',
      title: 'Choose with confidence, ask every detail',
      items: [
        {
          num: '01',
          title: 'Clear paperwork upfront',
          body: 'We show the records actually available for each dog—without hiding missing information.',
        },
        {
          num: '02',
          title: 'Specific profile details',
          body: 'Every dog has a clear reference ID, age, breed details, and set price whenever confirmed.',
        },
        {
          num: '03',
          title: 'Meet in person in Alexandria',
          body: 'Message us on WhatsApp to book a visit and see the dog and documents before deciding.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'Simple Steps',
      title: 'From browsing to meeting in 4 steps',
      steps: [
        {
          num: '01',
          title: 'Pick a dog',
          body: 'Compare listings by age, size, and available documentation.',
        },
        {
          num: '02',
          title: 'Check details & papers',
          body: 'Review photos, facts, and which health items are documented.',
        },
        {
          num: '03',
          title: 'Ask on WhatsApp',
          body: 'Send the dog ID to confirm pricing and current availability.',
        },
        {
          num: '04',
          title: 'Book a visit in Alexandria',
          body: 'Meet the dog in person and review paperwork before deciding.',
        },
      ],
    },
    accessoriesSection: {
      eyebrow: 'Accessories',
      title: 'Everything your dog needs in one place',
      viewStore: 'Browse Accessories',
      pricePending: 'Price & availability on inquiry',
      demoCaption: 'Demo Item — Illustrative Photo',
      previewNote: 'Everyday gear for feeding, walks, and care — sample product photography preview before the full catalog launches.',
    },
    careSection: {
      eyebrow: 'Before You Decide',
      title: '3 essentials before bringing a dog home',
      points: [
        'Make sure your daily routine fits regular walks, feeding, and care.',
        'Schedule a routine vet checkup shortly after bringing your dog home.',
        'Keep up with vaccinations and preventive care with your veterinarian.',
      ],
      cta: 'Read Care Guide',
    },
    whatsappCta: {
      eyebrow: 'Contact & Visits · Alexandria',
      title: 'Not sure which to choose? We can help',
      subtitle:
        'Ask us about any dog, accessory, or viewing time in Alexandria and get clear, helpful answers.',
      button: 'Ask Us on WhatsApp',
      notConfiguredTitle: 'WhatsApp number not added yet',
      notConfiguredBody:
        'An official business WhatsApp number has not been configured yet. Once added in site settings, this button will open WhatsApp directly.',
    },
    footer: {
      tagline: 'Dogs, puppies, and accessories in Alexandria, Egypt.',
      illustrativeNote:
        'Note: Current sample photos and listings are for preview testing only and are not real dogs for sale.',
      columns: {
        explore: 'Shop',
        trust: 'Helpful Info',
        contact: 'Contact & Location',
      },
      links: {
        home: 'Home',
        dogs: 'Available Dogs',
        accessories: 'Accessories',
        care: 'Care Guide',
        about: 'About & Contact',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      city: 'Alexandria, Egypt (Exact address coming soon)',
      whatsappPending: 'WhatsApp: Pending official number',
      rights: '© 2026 ALI PETS. All rights reserved.',
    },
    card: {
      priceOnInquiry: 'Ask for price on WhatsApp',
      details: 'View Dog Details',
      available: 'Available (Demo)',
      reserved: 'Reserved (Demo)',
      sold: 'Sold',
      docShort: {
        vaccination: 'Vaccination',
        deworming: 'Deworming',
        health_booklet: 'Health booklet',
        pedigree: 'Pedigree',
      },
      statusLabel: {
        verified: 'Verified',
        partially_documented: 'Partially documented',
        not_documented: 'No document',
        not_provided: 'Not listed',
      },
      gender: {
        male: 'Male',
        female: 'Female',
      },
    },
    stub: {
      phase2Badge: 'Coming in Phase 2',
      phase3Badge: 'Coming in Phase 3',
      backHome: 'Back to Home',
      notFoundTitle: 'Page Not Found',
      notFoundBody: 'The page you opened is not available. Head back home to continue browsing.',
    },
    archive: {
      pageTitle: 'ALI PETS — Dogs & Puppies Archive',
      eyebrow: 'Dogs & Puppies Archive · Alexandria',
      title: 'Browse Dogs & Puppies',
      subtitle:
        'Search by breed, title, or reference ID and filter by age, size, and vaccination records. Sample listings below are for preview testing only.',
      searchLabel: 'Search dogs',
      searchPlaceholder: 'Search breed or dog ID...',
      clearSearch: 'Clear search',
      sortLabel: 'Sort by',
      sortOptions: {
        newest: 'Newest listed',
        'price-asc': 'Price: Low to High',
        'price-desc': 'Price: High to Low',
      },
      resultsCount: (n: number) => {
        if (n === 0) return 'No matching listings';
        if (n === 1) return 'Showing 1 listing';
        return `Showing ${n} listings`;
      },
      filtersTitle: 'Filters',
      filtersButton: 'Filters',
      applyFilters: (n: number) => `Show results (${n})`,
      resetAll: 'Reset all filters',
      activeFiltersLabel: 'Active filters',
      closeSheet: 'Close filters',
      groups: {
        breed: 'Breed',
        age: 'Age',
        gender: 'Gender',
        size: 'Size',
        price: 'Price (EGP)',
        vaccination: 'Vaccination Records',
        availability: 'Availability',
      },
      ages: {
        'under-6': 'Puppies (under 6 months)',
        'under-3': 'Under 3 months',
        '3-6': '3–6 months',
        '6-12': '6–12 months',
        'over-12': 'Over 12 months',
      },
      genders: {
        all: 'All',
        male: 'Male',
        female: 'Female',
      },
      sizes: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        giant: 'Giant',
      },
      vaccinations: {
        verified: 'Documented vaccination record',
        partially_documented: 'Partial vaccination note',
      },
      vaccinationDemoHint: 'Sample demo records are for layout preview only, not real veterinary proof.',
      availabilities: {
        available: 'Available',
        reserved: 'Reserved',
      },
      pricePendingNote:
        'Confirmed prices are not set on demo previews yet. Numeric price filtering activates automatically once priced listings are added.',
      minPriceLabel: 'Min (EGP)',
      maxPriceLabel: 'Max (EGP)',
      includePriceOnInquiry: 'Include "Ask for price" listings',
      priceSortNote: 'Listings without confirmed prices appear after priced listings.',
      emptyTitle: 'No dogs match your current filters',
      emptyBody:
        'Try clearing a few filters or resetting your search to view all current preview listings, or ask us on WhatsApp.',
      emptyAskWhatsapp: 'Ask on WhatsApp about a breed',
      docCompact: {
        verified_demo: 'Vaccination: Documented (demo)',
        verified_real: 'Vaccination: Documented',
        partial: 'Vaccination: Partial note',
        none: 'Vaccination: No record',
      },
    },
    detail: {
      breadcrumbHome: 'Home',
      breadcrumbArchive: 'Dogs Archive',
      backToArchive: 'Back to all dogs',
      referenceIdLabel: 'Reference ID',
      availabilityLabel: 'Availability',
      priceSectionLabel: 'Price',
      priceOnInquiryDetail: 'Price on inquiry once listed live',
      notRecorded: 'Not listed',
      zoomImage: 'Enlarge photo',
      previousMedia: 'Previous photo',
      nextMedia: 'Next photo',
      closeLightbox: 'Close viewer',
      specsTitle: 'Key Details',
      specs: {
        breed: 'Breed',
        age: 'Age',
        gender: 'Gender',
        coatColor: 'Coat Color',
        size: 'Expected Size',
        birthDate: 'Birth Date',
      },
      aboutHeading: 'About This Listing',
      docsTitle: 'Paperwork & Vaccinations',
      docsDemoDisclaimer:
        'Note: Documents and images shown on this demo listing are sample placeholders for preview only, not real veterinary records.',
      docsProofCount: (verified: number, total: number) =>
        `${verified} of ${total} items with attached proof`,
      docsPartialCount: (n: number) =>
        n === 1 ? '1 partial note' : `${n} partial notes`,
      docSourceLabel: 'Source',
      docDateLabel: 'Date',
      docViewSampleImage: 'View document image',
      docSamplePreviewNote: 'Sample demo document preview only',
      inquiryCardTitle: 'Inquiries & Viewings',
      inquiryDemoOpenBtn: 'Preview Inquiry Form & Message (Demo)',
      inquiryBlockedDemoBtn: 'WhatsApp Disabled for Demo Listing',
      inquiryBlockedDemoHint:
        'You can test the inquiry form, preview the message, and copy it—opening WhatsApp stays disabled because this is a demo listing.',
      inquiryBlockedSoldBtn: 'Sold — Inquiries Closed',
      inquiryBlockedSoldHint: 'This dog has been sold and is no longer available.',
      inquiryOpenRealBtn: 'Inquire on WhatsApp',
      inquiryRealHint:
        'Enter your details and review the complete message before opening WhatsApp.',
      similarTitle: 'Similar Preview Listings',
      similarViewAll: 'Browse all dogs',
      notFoundTitle: 'Dog Listing Not Found',
      notFoundBody: (id: string) =>
        `We could not find a listing with ID "${id}". Check the reference code or return to the archive.`,
      notFoundBackHome: 'Back to Home',
    },
    inquiryModal: {
      title: 'Dog Inquiry',
      step1Badge: 'Step 1 of 2 · Your Details',
      step2Badge: 'Step 2 of 2 · Message Preview',
      step1Intro:
        'Fill in your details and inquiry type. You will review the exact message text on the next step before taking any action.',
      demoBanner:
        'Demo Warning: This is a sample listing not for sale. You may preview and copy the message, while opening WhatsApp is strictly disabled.',
      soldBanner: 'This dog is marked sold — purchase inquiries and WhatsApp links are disabled.',
      notConfiguredBanner:
        'The official shop WhatsApp number is not configured yet. You may preview and copy the message, while sending is disabled.',
      fields: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Enter your name',
        phoneLabel: 'Egyptian Mobile Number',
        phonePlaceholder: 'e.g., 01012345678',
        areaLabel: 'Alexandria Area',
        areaPlaceholder: 'Select your area in Alexandria',
        inquiryTypeLabel: 'Inquiry Type',
        messageLabel: 'Additional Note (Optional)',
        messagePlaceholder: 'e.g., Preferred viewing time or any question...',
      },
      inquiryTypes: {
        more_info: 'More information about the dog',
        viewing: 'Book an in-person viewing',
        price: 'Ask about price',
        delivery: 'Delivery or pickup',
      },
      errors: {
        nameRequired: 'Please enter your name.',
        nameMinLength: 'Name must be at least 2 characters.',
        phoneRequired: 'Please enter your mobile number.',
        phoneInvalid: 'Enter a valid Egyptian mobile number starting with 010, 011, 012, or 015.',
        areaRequired: 'Please select an area in Alexandria.',
        messageMaxLength: 'Additional note cannot exceed 300 characters.',
      },
      charsCount: (len: number, max: number) => `${len} / ${max}`,
      previewLabel: 'Final WhatsApp Message Preview',
      selectedAccessoriesLabel: 'Accessories included for price & availability inquiry',
      selectedAccessoriesHint: 'Note: These selections are inquiry questions only—not a confirmed purchase or cart order.',
      consentCheckbox: 'I reviewed this message and agree to open WhatsApp to send it.',
      actions: {
        previewMessage: 'Preview Message',
        editDetails: 'Edit Details',
        copyMessage: 'Copy Message',
        copied: 'Message Copied',
        openWhatsApp: 'Open WhatsApp',
        whatsappBlockedDemo: 'WhatsApp Disabled (Demo Listing)',
        whatsappBlockedSold: 'WhatsApp Disabled (Sold)',
        whatsappNotConfigured: 'WhatsApp Unavailable (Not Configured)',
        close: 'Close',
      },
    },
    welcomeHome: {
      eyebrow: 'Optional Setup',
      title: 'Prepare for Your New Companion',
      subtitles: {
        age_and_size:
          'Up to 3 starter suggestions based on recorded age and size—select any item to ask about pricing and availability, or skip this section.',
        age_only:
          'Up to 3 starter suggestions based on recorded age only (size not listed)—optional for inquiry only.',
        size_only:
          'Up to 3 starter suggestions based on recorded size only (age not listed)—optional for inquiry only.',
        general_starter:
          'General starter suggestions because age and size are incomplete on this listing—not personalized recommendations.',
      },
      demoCaption: 'Demo Item — Illustrative Photo',
      selectItem: 'Select for inquiry',
      selectedItem: 'Selected for inquiry',
      skipSection: 'Skip this section',
      skippedTitle: 'Welcome Home section skipped',
      skippedBody: 'You can inquire about the dog directly, or show these optional suggestions again anytime.',
      restoreSection: 'Show suggestions again',
      reassuranceNote:
        'No obligation and nothing is added to a cart—selections only help you ask about pricing and availability alongside your dog inquiry.',
      askWithDogCta: (n: number) =>
        n > 0
          ? `Inquire about dog + ${n} selected`
          : 'Inquire about dog',
      selectedSummary: (n: number) =>
        n === 1 ? '1 accessory selected for inquiry' : `${n} accessories selected for inquiry`,
    },
  },
} as const;
