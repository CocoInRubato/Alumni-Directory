/**
 * Xiamen University Alumni Association of Greater Seattle (XMUAA-GS)
 * Member Contact Directory — Intake Form Builder
 *
 * ── HOW TO USE ──────────────────────────────────────────────────────────────
 * 1. Sign in with the Google account that should OWN the form (a shared
 *    association account is ideal).
 * 2. Go to  https://script.google.com  and click "New project".
 * 3. Delete the sample code, then paste THIS ENTIRE FILE in.
 * 4. Click the Save icon, then click "Run" (the play button).
 *    - Choose the function "createAlumniDirectoryForm" if prompted.
 * 5. The first run asks you to authorize the script — review and Allow.
 *    (If you see an "unverified app" screen, click Advanced -> Go to project.
 *     This is normal for your own scripts.)
 * 6. When it finishes, open the log:  View -> Logs  (or press Ctrl+Enter).
 *    You'll see three links:
 *       - EDIT link    : open the form to tweak wording or order
 *       - SHARE link   : the public link you send to alumni
 *       - SHEET link   : the spreadsheet that collects responses = your directory
 *
 * You can re-run this anytime to generate a fresh copy.
 *
 * ── ABOUT THE DEGREE SECTIONS ────────────────────────────────────────────────
 * Google Forms can only show/hide a section based on a single-answer question,
 * not a checkbox. So each degree is gated by its own Yes/No question: answering
 * "Yes" reveals that degree's detail page; "No" skips it. An alum with multiple
 * degrees simply answers Yes more than once.
 * ─────────────────────────────────────────────────────────────────────────────
 */

function createAlumniDirectoryForm() {
  // ===== Create the form =====
  var form = FormApp.create('XMUAA-GS Member Directory Form');
  form.setTitle('Xiamen University Alumni Association of Greater Seattle — Member Directory');

  var privacyNotice =
    'Welcome, fellow XMU alumni! Please share your information below to join our ' +
    'members-only contact directory. It helps our community stay connected, support ' +
    'one another, and organize local events.\n\n' +
    '— PRIVACY NOTICE —\n' +
    'We collect this information for one purpose only: to build a members-only ' +
    'directory shared within our alumni association. Access is limited to verified ' +
    'members and the volunteers who maintain it.\n\n' +
    'We will NEVER sell, rent, trade, or share your information with advertisers, ' +
    'companies, or any outside third party. Participation is voluntary — you choose ' +
    'which fields to share, and you may update or remove your information at any ' +
    'time by contacting us at xmuaaofsea@gmail.com.';
  form.setDescription(privacyNotice);

  // Reusable email-format validation.
  var emailValidation = FormApp.createTextValidation()
    .setHelpText('Please enter a valid email address (e.g., name@example.com).')
    .requireTextIsEmail()
    .build();

  // ===== SECTION 1: Name (page 1) =====
  form.addSectionHeaderItem().setTitle('1. Your Name');
  form.addTextItem().setTitle('First Name').setRequired(true);
  form.addTextItem().setTitle('Last Name').setRequired(true);
  form.addTextItem().setTitle('中文名字 (Chinese Name)').setRequired(false);

  // ===== SECTION 2: Degrees (conditional pages) =====
  // Gate page: Bachelor's?
  form.addPageBreakItem()
    .setTitle('2. Your Xiamen University Background')
    .setHelpText('We will ask about each degree one at a time. Answer Yes to fill in '
      + 'the details for that degree, or No to skip it.');
  var bachQ = form.addMultipleChoiceItem()
    .setTitle("Did you earn a Bachelor's degree from Xiamen University?")
    .setRequired(true);

  // Detail page: Bachelor's
  var bachDetails = form.addPageBreakItem().setTitle("Bachelor's Degree — Details");
  form.addTextItem().setTitle("Bachelor's — Year Graduated").setHelpText('e.g., 2012').setRequired(false);
  form.addTextItem().setTitle("Bachelor's — Major").setRequired(false);
  form.addTextItem()
    .setTitle("Bachelor's — College / Department")
    .setHelpText('e.g., School of Economics, College of Chemistry')
    .setRequired(false);

  // Gate page: Master's?
  var masterQPage = form.addPageBreakItem().setTitle("Master's Degree");
  var masterQ = form.addMultipleChoiceItem()
    .setTitle("Did you earn a Master's degree from Xiamen University?")
    .setRequired(true);

  // Detail page: Master's
  var masterDetails = form.addPageBreakItem().setTitle("Master's Degree — Details");
  form.addTextItem().setTitle("Master's — Year Graduated").setHelpText('e.g., 2015').setRequired(false);
  form.addTextItem().setTitle("Master's — Major").setRequired(false);
  form.addTextItem()
    .setTitle("Master's — College / Department")
    .setHelpText('e.g., School of Management')
    .setRequired(false);

  // Gate page: PhD?
  var phdQPage = form.addPageBreakItem().setTitle('PhD');
  var phdQ = form.addMultipleChoiceItem()
    .setTitle('Did you earn a PhD from Xiamen University?')
    .setRequired(true);

  // Detail page: PhD
  var phdDetails = form.addPageBreakItem().setTitle('PhD — Details');
  form.addTextItem().setTitle('PhD — Year Graduated').setHelpText('e.g., 2020').setRequired(false);
  form.addTextItem().setTitle('PhD — Major / Field').setRequired(false);
  form.addTextItem()
    .setTitle('PhD — College / Department')
    .setHelpText('e.g., College of Chemistry and Chemical Engineering')
    .setRequired(false);

  // ===== SECTION 3: Contact information (everyone lands here) =====
  var contactPage = form.addPageBreakItem()
    .setTitle('3. Contact Information')
    .setHelpText('Share only what you are comfortable with — every field here is optional.');
  form.addTextItem().setTitle('Phone — Landline').setRequired(false);
  form.addTextItem().setTitle('Phone — Cell').setRequired(false);
  form.addTextItem().setTitle('Email').setValidation(emailValidation).setRequired(false);
  form.addTextItem().setTitle('WeChat ID').setRequired(false);
  form.addTextItem().setTitle('WeChat Name').setRequired(false);
  form.addTextItem()
    .setTitle('City / Neighborhood')
    .setHelpText('Helps us organize local meetups (e.g., Bellevue, Redmond, Seattle)')
    .setRequired(false);
  form.addMultipleChoiceItem()
    .setTitle('Preferred Method to Contact')
    .setChoiceValues(['Phone Call', 'Text Message', 'WeChat', 'Email'])
    .setRequired(false);

  // ===== SECTION 4: Professional information =====
  form.addSectionHeaderItem().setTitle('4. Professional Information');
  form.addTextItem().setTitle('Occupation').setRequired(false);
  form.addTextItem().setTitle('Company').setRequired(false);
  form.addTextItem().setTitle('Title').setRequired(false);
  form.addCheckboxItem()
    .setTitle('Industry')
    .setHelpText('Which industry (or industries) do you work in? Select all that apply.')
    .setChoiceValues([
      'Technology / Software',
      'Finance / Accounting',
      'Healthcare / Medicine',
      'Law',
      'Education',
      'Real Estate',
      'Marketing',
      'Entrepreneurship',
      'Engineering',
      'Arts / Design',
      'Consulting',
      'Translation / Interpretation'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // ===== SECTION 5: Community & interests (own page, so volunteering can branch) =====
  form.addPageBreakItem().setTitle('5. Community & Interests');
  form.addParagraphTextItem()
    .setTitle('Interests')
    .setHelpText('Hobbies and personal interests, e.g., hiking, photography, cooking, board games')
    .setRequired(false);
  var volunteerQ = form.addMultipleChoiceItem()
    .setTitle("Are you willing to volunteer with the association's activities?")
    .setRequired(true);

  // Detail page: volunteer specialties
  var volunteerDetails = form.addPageBreakItem().setTitle('Volunteering — Your Specialties');
  form.addCheckboxItem()
    .setTitle('Volunteer Specialties')
    .setHelpText('What kinds of volunteer work would you enjoy helping with? Select all that apply.')
    .setChoiceValues([
      'Event Planning',
      'Leadership Roles',
      'Administrative Support',
      'Technical Tasks',
      'Community Outreach',
      'Finance & Accounting',
      'Communications & Advocacy'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // ===== SECTION 6: Board & directory consent (everyone lands here) =====
  var finalPage = form.addPageBreakItem().setTitle('6. Board & Directory Consent');
  form.addMultipleChoiceItem()
    .setTitle('Willing to join the Board of the Association?')
    .setChoiceValues(['Yes', 'No', 'Not sure'])
    .setRequired(false);
  form.addCheckboxItem()
    .setTitle('Consent')
    .setHelpText('Required in order to be included in the directory.')
    .setChoiceValues([
      'I consent to having the information above included in the members-only ' +
      'directory shared within the association.'
    ])
    .setRequired(true);

  // ===== Wire up the conditional navigation (done after all pages exist) =====
  // Yes -> show that degree's detail page;  No -> skip to the next gate.
  bachQ.setChoices([
    bachQ.createChoice('Yes', bachDetails),
    bachQ.createChoice('No', masterQPage)
  ]);
  bachDetails.setGoToPage(masterQPage);   // after Bachelor's details, ask about Master's

  masterQ.setChoices([
    masterQ.createChoice('Yes', masterDetails),
    masterQ.createChoice('No', phdQPage)
  ]);
  masterDetails.setGoToPage(phdQPage);    // after Master's details, ask about PhD

  phdQ.setChoices([
    phdQ.createChoice('Yes', phdDetails),
    phdQ.createChoice('No', contactPage)
  ]);
  phdDetails.setGoToPage(contactPage);    // after PhD details, go to Contact

  volunteerQ.setChoices([
    volunteerQ.createChoice('Yes', volunteerDetails),
    volunteerQ.createChoice('No', finalPage)
  ]);
  volunteerDetails.setGoToPage(finalPage); // after specialties, go to Board & Consent

  // ===== Create a linked spreadsheet — this becomes your directory =====
  var ss = SpreadsheetApp.create('XMUAA-GS Member Directory (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ===== Output the links =====
  Logger.log('Form created successfully!');
  Logger.log('EDIT the form here:    ' + form.getEditUrl());
  Logger.log('SHARE with members:    ' + form.getPublishedUrl());
  Logger.log('DIRECTORY spreadsheet: ' + ss.getUrl());
}
