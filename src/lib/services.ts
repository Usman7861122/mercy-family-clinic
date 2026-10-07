// Service content (based on the current mercyfamilyclinic.com pages, in simpler words).
// Dr. Izzy should review the medical wording before launch.

export interface ServiceSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** paragraphs shown after the bullets */
  after?: string[];
}

export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  image: string; // unsplash id
  icon: string; // key from Icon.astro
  sections: ServiceSection[];
}

export const services: Service[] = [
  {
    slug: "medical-weight-loss",
    title: "Medical Weight Loss",
    icon: "scale",
    image: "1490645935967-10de6ba17061",
    excerpt:
      "Medically supervised programs with GLP-1 medications such as Wegovy and Mounjaro, B-12 and lipotropic injections, plus nutrition and lifestyle support.",
    intro:
      "About two-thirds of American adults carry extra weight. If past attempts to lose weight did not work for you, our medical weight loss program can help.",
    sections: [
      {
        heading: "Semaglutide (Wegovy)",
        paragraphs: [
          "The FDA approved semaglutide (Wegovy) in June 2021 for long-term weight management. It is a weekly injection that copies GLP-1, a hormone that helps control appetite and how much you eat. It also helps your body make insulin and lowers blood sugar.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Slows how fast your stomach empties, so you feel full",
          "Slows movement in the intestines",
          "Lowers the sugar your liver makes",
          "Helps the pancreas release insulin",
        ],
      },
      {
        heading: "Dosing and results",
        paragraphs: [
          "Treatment starts with a low dose. The dose goes up slowly over 16 to 20 weeks, up to 2.4 mg each week. Many patients do well at 0.25 to 1 mg a week. With a healthy diet and exercise, patients often lose an average of 2 to 4 pounds a week.",
        ],
      },
      {
        heading: "Possible side effects",
        paragraphs: ["Mild tiredness, nausea, constipation and diarrhea."],
      },
      {
        heading: "Who can take it?",
        paragraphs: [
          "We check your medical history, current medicines, vital signs and BMI. Some people are not good candidates, for example people with diabetic retinopathy, a history of medullary thyroid cancer, pancreatitis, or certain other conditions.",
        ],
      },
      {
        heading: "Other options",
        paragraphs: [
          "We also offer Mounjaro, B-12 and lipotropic injections, and the medicines Adipex, Qsymia and Contrave.",
        ],
      },
    ],
  },
  {
    slug: "family-medicine",
    title: "Family Medicine",
    icon: "users",
    image: "1584515933487-779824d29309",
    excerpt:
      "Complete primary care for every age, from a doctor who knows you and your whole family.",
    intro: "Complete care for people of all ages, from babies to seniors.",
    sections: [
      {
        heading: "What is family medicine?",
        paragraphs: [
          "Family medicine doctors finish at least three more years of training after medical school. Instead of seeing many different specialists, your whole family can get care in one place. We follow our patients through every stage of life to support good health.",
        ],
      },
      {
        heading: "What can a family doctor treat?",
        bullets: [
          "Yearly and sports physical exams",
          "Well-child checks",
          "Well-woman exams",
          "Upper respiratory infections and UTIs",
          "COPD, emphysema and asthma",
          "Diabetes (type 1 and type 2)",
          "High blood pressure and heart disease",
          "High cholesterol",
          "Vaccinations and allergy testing",
          "Minor injuries",
        ],
      },
      {
        heading: "Why see a family doctor?",
        paragraphs: [
          "You can get a quick appointment for minor illnesses and injuries, without a trip to the emergency room. Your doctor learns your medical and family history, so your care fits your needs and your lifestyle.",
        ],
      },
    ],
  },
  {
    slug: "pediatrics",
    title: "Pediatrics",
    icon: "baby",
    image: "1609220136736-443140cffec6",
    excerpt:
      "Gentle, caring checkups and treatment for children, from infancy through the teenage years.",
    intro:
      "Care for children from infancy through the teen years, including shots, sports physicals and sick visits.",
    sections: [
      {
        heading: "What is pediatric care?",
        paragraphs: [
          "Pediatric care looks after the physical, behavioral and developmental health of a growing child. At visits, Dr. Izzy does physical exams, gives vaccines, and tracks growth and development.",
        ],
      },
      {
        heading: "Checkup schedule",
        paragraphs: [
          "Recommended visits are at 2 weeks, and then at 2, 4, 6, 9, 12, 15, 18, 24 and 36 months. After age 3, a well-child visit is recommended every year.",
        ],
      },
      {
        heading: "What shots does my child need?",
        paragraphs: [
          "Dr. Izzy follows CDC guidelines for each age. Some vaccines need more than one dose. Please bring your child's health records to the first visit.",
        ],
      },
      {
        heading: "When should I see the pediatrician?",
        paragraphs: [
          "Regular checkups help track your child's milestones. Get medical help if a baby under 3 months has a rectal temperature of 100.4°F or higher, or if an older child's temperature is above 102.2°F. Also come in for changes in behavior, shots needed for daycare or school, and sports physicals.",
        ],
      },
    ],
  },
  {
    slug: "diabetes",
    title: "Diabetes Management",
    icon: "droplets",
    image: "1498837167922-ddd27525d352",
    excerpt:
      "Personal care plans and regular follow-up to help you keep your blood sugar under control.",
    intro:
      "About 10% of Americans have diabetes. Without good care it can cause serious problems, so we help you manage it for the long term.",
    sections: [
      {
        heading: "What is diabetes?",
        paragraphs: [
          "Your body uses glucose for energy. Your pancreas makes insulin to move glucose from the blood into your cells. With diabetes, your body either does not make enough insulin or cannot use it well, so blood sugar rises and can cause health problems.",
          "Type 1 diabetes is an autoimmune condition that often starts in childhood and needs insulin. Type 2 is the most common form. It usually develops later and is linked to genes and lifestyle.",
        ],
      },
      {
        heading: "Risk factors",
        bullets: [
          "Being overweight or obese",
          "An inactive lifestyle",
          "Being older than 45",
          "A family history of diabetes",
          "African-American, Asian-American or Hispanic descent",
        ],
        after: [
          "You cannot change your family history, but being more active and losing weight can lower your risk. Prediabetes comes before type 2 diabetes, and it can still be reversed. Diabetes itself is a life-long condition.",
        ],
      },
      {
        heading: "How can I manage diabetes?",
        paragraphs: [
          "Uncontrolled diabetes can lead to heart disease, nerve damage, kidney damage, eye damage and wounds that do not heal. We build a personal plan for your medicine, lifestyle and nutrition. Healthy eating and regular exercise help control symptoms and lower the risk of problems.",
        ],
      },
    ],
  },
  {
    slug: "womens-health",
    title: "Women's Health",
    icon: "flower",
    image: "1522337360788-8b13dee7a37e",
    excerpt:
      "Reproductive and preventive care in a comfortable, respectful setting.",
    intro:
      "Preventive care that focuses on reproductive health, matched to your needs.",
    sections: [
      {
        heading: "What is a women's health checkup?",
        paragraphs: [
          "It is preventive care that focuses on the health of your reproductive organs. The exam usually includes a pelvic exam and a clinical breast exam. It is also a good time to talk about any worries you have.",
        ],
      },
      {
        heading: "Who needs one?",
        paragraphs: [
          "All women should start these exams in their teen years and continue every year. Even after menopause, a yearly exam matters. It helps find problems such as sexually transmitted infections, cancers, urinary tract infections and urinary incontinence.",
        ],
      },
      {
        heading: "What happens during the exam?",
        paragraphs: ["Your provider reviews your medical history and listens to your concerns. The exam usually includes:"],
        bullets: [
          "Height, weight and BMI checks",
          "Pelvic exam",
          "Clinical breast exam",
          "Pap smear to screen for cervical cancer",
          "Blood and urine screening",
        ],
        after: [
          "Other tests, such as a bone density scan, may be advised based on your results and risk factors. Vaccines such as the HPV vaccine can be given at the visit.",
        ],
      },
      {
        heading: "When to call us right away",
        bullets: [
          "Severe period pain",
          "Unusual bleeding between periods",
          "Periods that last longer than usual",
          "Burning or painful urination",
          "Vaginal swelling, pain or discharge",
          "Bumps or lumps in vaginal tissue",
          "A feeling of pressure in the pelvis",
        ],
      },
    ],
  },
  {
    slug: "physical-exams",
    title: "Physical Exams",
    icon: "stethoscope",
    image: "1505751172876-fa1923c5c528",
    excerpt:
      "Thorough health checks for work, school or general wellness, so you know where you stand.",
    intro:
      "Complete physical exams for the whole family, for work, school or general wellness.",
    sections: [
      {
        heading: "What is a physical exam?",
        paragraphs: [
          "A physical exam is a series of checks to see how healthy you are overall. We offer physicals for children starting a new school and for adults in physically demanding jobs.",
        ],
      },
      {
        heading: "How often do I need one?",
        paragraphs: [
          "Most people should have a physical every year. Regular exams can catch early signs of problems such as high blood pressure and type 2 diabetes. Your health needs change as you age, so regular checkups matter. Children may also need school or sports physicals.",
        ],
      },
      {
        heading: "What can I expect?",
        paragraphs: [
          "Your exam is matched to your needs. It usually includes a review of your medical history and your vital signs. Be ready to talk about exercise, nutrition and substance use. Standard checks include:",
        ],
        bullets: [
          "Blood pressure, heart rate and temperature",
          "Heart and lung function",
          "Vision and hearing",
          "Mobility",
        ],
        after: [
          "Some exams also include checks for men (testicular, prostate or hernia) or for women (Pap test, pelvic exam or breast exam).",
        ],
      },
    ],
  },
  {
    slug: "hypertension",
    title: "Hypertension",
    icon: "heart-pulse",
    image: "1530026405186-ed1f139313f8",
    excerpt:
      "Blood pressure management and heart-healthy care, with a plan that fits your life.",
    intro:
      "Hypertension is the medical word for high blood pressure. We help men and women keep it under control.",
    sections: [
      {
        heading: "What is hypertension?",
        paragraphs: [
          "It happens when the force of blood against your artery walls stays high. Over time, uncontrolled high blood pressure can harm your blood vessels and organs. It may lead to aneurysm, heart attack, stroke, heart failure, kidney damage or eye damage.",
        ],
      },
      {
        heading: "How is blood pressure measured?",
        paragraphs: [
          "A reading has two numbers. The top number (systolic) is the pressure when your heart beats. The bottom number (diastolic) is the pressure between beats. An ideal reading is near or below 120/80. A reading that stays at 140/90 or higher raises your risk of heart and blood vessel damage.",
        ],
      },
      {
        heading: "Risk factors",
        bullets: [
          "Being older than 50",
          "Being overweight or obese",
          "An inactive lifestyle",
          "Tobacco use",
          "Drinking alcohol every day",
          "A family history of high blood pressure",
          "African descent",
        ],
        after: [
          "High blood pressure is also closely linked to high cholesterol, which can build up in your arteries and raise your risk of heart attack and stroke.",
        ],
      },
      {
        heading: "How can I manage it?",
        paragraphs: [
          "Treatment uses medicine and lifestyle changes. Eat a heart-healthy, low-sodium diet with whole grains, fruits and vegetables, and stay physically active to keep a healthy weight. We will help you find the right plan.",
        ],
      },
    ],
  },
  {
    slug: "in-office-diagnostic-testing",
    title: "In-Office Diagnostic Testing",
    icon: "flask",
    image: "1579684385127-1ef15d508118",
    excerpt:
      "Convenient tests done right here in the clinic, so you get answers faster.",
    intro:
      "Get many tests done right here at the clinic, with no trip to a separate lab.",
    sections: [
      {
        heading: "Tests we do in the office",
        bullets: [
          "Allergy testing",
          "Ankle-brachial index (ABI) test",
          "Flu test",
          "Routine blood work",
          "Strep throat test",
          "EKG",
          "Urinalysis",
          "Cholesterol screen",
          "Diabetes screen",
          "Diabetic eye exam (needed every year)",
        ],
      },
      {
        heading: "Why in-office testing helps",
        bullets: [
          "Fewer appointments for people with long-term conditions like diabetes and high cholesterol",
          "Quick results for tests like EKG and urinalysis, with no return visit",
          "Fast answers and treatment advice for sudden illnesses",
          "No need to stop at several places for tests",
          "Shorter waits for results than at a traditional lab",
        ],
      },
      {
        heading: "Who benefits?",
        paragraphs: [
          "People with sudden illnesses such as flu or strep throat, and people managing long-term conditions. We suggest allergy testing for breathing problems, and ABI testing for people at risk of peripheral artery disease.",
        ],
      },
    ],
  },
];

export const homeServices = services.slice(0, 6);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
